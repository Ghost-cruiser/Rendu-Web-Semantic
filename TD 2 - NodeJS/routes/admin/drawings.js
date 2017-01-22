"use strict";

module.exports = function (app, config, router, pagehelper) {

    const models = app.get("models");

    router
        .route('/admin/drawings/:userId')

        // Return the list of all drawings for a user
        .get(function (req, res) {
            var userId = req.params.userId;

            models.Drawing.findAll({ where: { UserId: userId } }).then(function (drawings) {
                pagehelper
                    .render(res, 'admin', 'drawings', { drawings: drawings, userId: userId }, 'Liste des dessins');

            }).catch(function (error) {
                pagehelper
                    .sendError(res, 500, error, "Une erreur est survenue durant la récupération des dessins");
            });
        });

    // New drawing
    router
        .route('/admin/drawings/:userId/paint')

        .get(function (req, res) {
            pagehelper
                .render(res, 'admin', 'paint', null, 'Paint');
        })
        .post(function (req, res) {

            req.body.UserId = req.params.userId;

            models.Drawing.create(req.body).then(function () {
                pagehelper
                    .redirect(res, 'admin', ['drawings', req.params.userId], {
                        status: 204,
                        message: 'Dessin créé'
                    });

            }).catch(function (error) {
                pagehelper
                    .sendError(res, 500, error);

            });
        });

    router
        .route('/admin/drawings/:userId/:id')

        // Return one user's drawing
        .get(function (req, res) {
            var userId = req.params.userId,
                id = req.params.id;

            models.Drawing.findOne({ where: { id: id, UserId: userId } }).then(function (drawing) {
                pagehelper
                    .render(res, 'admin', 'guess', drawing, 'Formulaire guess');

            }).catch(function (error) {
                pagehelper
                    .sendError(res, 500, error, "Une erreur est survenue durant la récupération du dessin");
            });
        })

        .post(function (req, res) {
            var userId = req.params.userId,
                id = req.params.id;

            // UPDATE
            models.Drawing.update(req.body, { where: { id: id, UserId: userId } }).then(function () {
                pagehelper
                    .redirect(res, 'admin', ['drawings', userId], {
                        status: 204,
                        message: 'Dessin mis à jour'
                    });
            
            }).catch(function (error) {
                pagehelper
                    .sendError(res, 500, error);
            });
        });

    router
        .route('/admin/drawings/:userId/delete/:id')

        .get(function (req, res, id) {
            
            var userId = req.params.userId,
                id = req.params.id;

            models.Drawing.destroy({ where: { id: id, UserId: userId } }).then(function () {
                pagehelper
                    .redirect(res, 'admin', ['drawings', userId], {
                        status: 204,
                        message: 'Dessin effacé'
                    });

            }).catch(function (error) {
                pagehelper
                    .sendError(res, error, 'Une erreur est survenue lors de la délétion');
            });
        });

}