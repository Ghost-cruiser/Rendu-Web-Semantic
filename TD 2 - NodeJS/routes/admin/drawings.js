"use strict";

module.exports = function (app, config, router, pagehelper) {

    const models = app.get("models");

    router
        .route('/admin/drawings/:userId')

        // Return the list of all drawings for a user
        .get(function (req, res) {
            var userId = req.params.userId;

            models.Drawing.findAll({ where: { userId: userId } }).then(function (drawings) {
                pagehelper 
                    .render(res, 'user', 'drawings', drawings, 'Liste des dessins');

            }).catch(function (error) {
                pagehelper
                    .sendError(res, 500, error, "Une erreur est survenue durant la récupération des dessins");
            });
        });

    router
        .route('/admin/drawings/:userId/:id')

        // Return one user's drawing
        .get(function (req, res) {
            var userId = req.params.userId,
                id = req.params.id;

            models.Drawing.findOne({ where: { id: id, userId: userId } }).then(function (drawing) {
                pagehelper
                    .render(res, 'user', 'guess', drawing, 'Formulaire guess');

            }).catch(function (error) {
                pagehelper
                    .sendError(res, 500, error, "Une erreur est survenue durant la récupération du dessin");
            });
        })

        .post(function (req, res) {
            var userId = req.params.userId,
                id = req.params.id;

            if (id != 0) { 
                // UPDATE
                models.Drawing.update(req.body, { where: { id: id, userId: userId } }).then(function () {
                    pagehelper
                        .redirect(res, 'admin', ['drawings', userId], {
                            message: 'Dessin mis à jour'
                        });

                }).catch(function (error) {
                    pagehelper
                        .sendError(res, 500, error);
                });
            }
            else {
                //ADD
                req.body.userId = userId;

                models.Drawing.create(req.body).then(function () {
                    pagehelper
                        .redirect(res, 'admin', ['drawings', userId], {
                            message: 'Dessin créé'
                        });

                }).catch(function (error) {
                    pagehelper
                        .sendError(res, 500, error);

                });

            }
        })

        .delete(function (req, res, id) {

            var userId = req.session.user.id;

            models.Drawing.destroy({ where: { id: id, userId: userId } }).then(function () {
                pagehelper
                    .redirect(res, 'admin', ['drawings', userId], {
                        message: 'Dessin effacé'
                    });

            }).catch(function (error) {
                pagehelper
                    .sendError(res, error, 'Une erreur est survenue lors de la délétion');
            });
        });

}