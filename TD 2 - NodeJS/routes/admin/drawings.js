"use strict";

module.exports = function (app, router) {

    var models = app.get("models");

    router
        .route('/drawings/:userId')

        // return the list of all drawings for a user
        .get(function (req, res) {
            // GET ALL
            var userId = req.params.userId;

            models.Drawings.findAll({ where: { userId: req.session.userId } }).then(function (drawings) {
                res.status(200).render('drawings', drawings);

            }).catch(function (error) {

                res.status(500).render('public/error', {
                    message: "Une erreur est survenue",
                    error: error,
                });
            });
        });

    router
        .route('/drawings/:userId/:id')

        .get(function (req, res) {
            var userId = req.params.userId,
                id = req.params.id;

            // GET ONE
            models.Drawings.findOne({ where: { id: id, userId: req.session.userId} }).then(function (drawing) {
                res.status(200).render('user/guess', drawing);

            }).catch(function (error) {

                res.status(500).render('public/error', {
                    message: "Une erreur est survenue",
                    error: error,
                });
            });
        })

        .post(function (req, res) {

            var userId = req.params.userId,
                id = req.params.id;

            if (id) {
                // UPDATE
                models.Drawings.update(req.body, { where: { id: id, userId: req.session.userId } }).then(function () {
                    res.status(200).redirect("/admin/drawings/" + userId + '?message="Dessin mis à jour"');

                }).catch(function (error) {
                    sendError(res, 500, error);
                });
            }
            else {
                //ADD
                req.body.userId = userId;

                models.Drawings.create(req.body).then(function () {
                    res.status(200).redirect("/admin/drawings/" + userId + '?message="Dessin créé"');

                }).catch(function (error) {
                    sendError(res, 500, error);
                });

            }
        })

        .delete(function (req, res, id) {
            
            models.Drawings.destroy({ where: { id: id, userId: req.session.userId } }).then(function () {
                res.status(200).redirect("/admin/drawings/" + userId + '?message="Dessin effacé"');

            }).catch(function (error) {
                sendError(res, 500, error);
            });
        });

    function sendError(res, status, error, message) {
        res.status(status).render('public/error', {
            message: message || "Une erreur est survenue",
            error: error,
        });
    }
}