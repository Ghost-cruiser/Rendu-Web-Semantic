"use strict";

module.exports = function (app, config, router, pagehelper) {

    var models = app.get("models");

    router
        .route('/user/drawings')

        // return the list of all drawings for a user
        .get(function (req, res) {
            // GET ALL
            models.Drawing.findAll({ where: { userId: req.session.user.id } })
                .then(function (drawings) {
                    pagehelper
                        .render(res, 'user', 'drawings', { drawings: drawings }, 'Mes dessins');

                }).catch(function (error) {
                    pagehelper
                        .sendError(res, error);
                });
        });

    // New drawing
    router
        .route('/user/drawings/paint')

        .get(function (req, res) {
            pagehelper
                .render(res, 'user', 'paint', null, 'Paint');
        });

    router
        .route('/user/drawings/:id')

        .get(function (req, res) {
            var id = req.params.id;

            models.Drawing.findOne({ where: { id: id, userId: req.session.user.id } }).then(function (result) {

                var draw = result.get();

                pagehelper
                    .render(res, 'user', 'guess', { draw: draw }, 'Guess');

            }).catch(function (error) {

                pagehelper
                    .sendError(res, error);
            });
        })

        .post(function (req, res) {
            //ADD
            var draw = req.body;

            draw.UserId = req.session.user.id;

            models.Drawing.create(draw).then(function () {
                pagehelper.redirect(res, 'user', 'drawings', {
                    status: 204,
                    message: 'Dessin créé!'
                });

            }).catch(function (error) {
                pagehelper
                    .sendError(res, error);
            });
        })

        .delete(function (req, res) {
            var id = req.params.id;

            models.Drawing.destroy({ where: { id: id, userId: req.session.user.id } }).then(function () {
                pagehelper.redirect(res, 'user', 'drawings', {
                    status: 204,
                    message: 'Dessin supprimé!'
                });

            }).catch(function (error) {

                pagehelper
                    .sendError(res, error);
            });
    });
}