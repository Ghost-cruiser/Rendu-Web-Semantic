"use strict";

module.exports = function (app, config, router, pagehelper) {

    var models = app.get("models");

    router
        .route('/user/drawings')

        // return the list of all drawings for a user
        .get(function (req, res) {
            // GET ALL
            models.Drawing.findAll({ where: { userId: req.session.userId } })
                .then(function (drawings) {
                    pagehelper
                        .render(res, 'user', 'drawings', drawings, 'Mes dessins');

                }).catch(function (error) {
                    pagehelper
                        .sendError(res, error);
            });
        });

    router
        .route('/user/drawings/:id')

        .get(function (req, res) {
            var id = req.params.id;
            
            if (id != 0) {
                // TODO : load User.couleur
                models.Drawing.findOne({ where: { id: id, userId: req.session.userId } }).then(function (result) {

                    var draw = result.get();

                    pagehelper
                        .render(res, 'user', 'guess', draw, 'Guess');

                }).catch(function (error) {

                    pagehelper
                        .sendError(res, error);
                });
            }
            else {
                // New drawing
                pagehelper
                    .render(res, 'user', 'paint', draw, 'Paint');
            }
        })

        .post(function (req, res) {
            //ADD
            var draw = req.body;

            draw.userId = req.session.userId;

            models.Drawing.create(draw).then(function () {
                pagehelper.redirect(res, 'user', 'drawings', {
                    message: 'Dessin créé!'
                });

            }).catch(function (error) {
                pagehelper
                    .sendError(res, error);
            });
        })

        .delete(function (req, res) {
            var id = req.params.id;

            models.Drawing.destroy({ where: { id: id, userId: req.session.userId } }).then(function () {
                pagehelper.redirect(res, 'user', 'drawings', {
                    message: 'Dessin supprimé!'
                });

            }).catch(function (error) {

                pagehelper
                    .sendError(res, error);
            });
    });
}