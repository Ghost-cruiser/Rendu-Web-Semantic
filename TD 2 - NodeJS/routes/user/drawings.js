"use strict";

module.exports = function (app, config, router) {

    var models = app.get("models");

    router
        .route('/api/drawings')

        // return the list of all drawings for a user
        .get(function (req, res) {
            // GET ALL
            models.Drawing.findAll({ where: { userId: req.session.userId } }).then(function (drawings) {
                res.status(200).render('user/drawings', { drawings: drawings });

            }).catch(function (error) {

                res.status(500).render('public/error', {
                    message: "Une erreur est survenue",
                    error: error,
                });
            });
        });

    router
        .route('/api/drawings/:id')

        .get(function (req, res) {
            var id = req.params.id;

            // GET OR START ONE
            if (id) {

                models.Drawing.findOne({ where: { id: id, userId: req.session.userId } }).then(function (result) {
                    res.status(200).render('user/guess', result.get());

                }).catch(function (error) {

                    res.status(500).render('public/error', {
                        message: "Une erreur est survenue",
                        error: error,
                    });
                });
            }
            else {
                res.render('user/paint');
            }
        })

        .post(function (req, res) {
            //ADD
            var draw = req.body;
            draw.userId = req.session.userId;

            models.Drawing.create(draw).then(function () {
                res.status(200).redirect(config.baseURL + '/api/drawings?message="Dessin créé!"');

            }).catch(function (error) {

                res.status(500).render('public/error', {
                    message: "Une erreur est survenue",
                    error: error,
                });
            });
        })

        .delete(function (req, res) {
            var id = req.params.id;

            models.Drawing.destroy({ where: { id: id, userId: req.session.userId } }).then(function () {
                res.status(200).redirect(config.baseURL + '/api/drawings?message="Dessin supprimé"');

            }).catch(function (error) {

                res.status(500).render('public/error', {
                    message: "Une erreur est survenue",
                    error: error,
                });
            });
    });
}