"use strict";

module.exports = function (app, router) {

    var models = app.get("models");

    router

        .route('/drawings')

        // return the list of all drawings for a user
        .get(function (req, res) {
            // GET ALL
            models.Drawings.findAll({ where: { userId: req.session.id } }).then(function (drawings) {
                res.status(200).render('user/drawings', drawings);

            }).catch(function (error) {

                res.status(500).render('public/error', {
                    message: "Une erreur est survenue",
                    error: error,
                });
            });
        });

    router

        .route('/drawings/:id')

        .get(function (req, res, id) {
            // GET ONE
            models.Drawings.findOne({ where: { id: id, userId: req.session.id} }).then(function (drawing) {
                res.status(200).render('user/guess', drawing);

            }).catch(function (error) {

                res.status(500).render('public/error', {
                    message: "Une erreur est survenue",
                    error: error,
                });
            });
        })

        .post(function (req, res) {
            //ADD
            var draw = req.body;
            draw.userId = req.session.id;

            models.Drawings.create(draw).then(function () {
                res.status(200).redirect('api/drawings?message="Dessin créé!"');

            }).catch(function (error) {

                res.status(500).render('public/error', {
                    message: "Une erreur est survenue",
                    error: error,
                });
            });
        })

        .delete(function (req, res) {
            var id = req.params.id;

            models.Drawings.destroy({ where: { id: id, userId: req.session.id } }).then(function () {
                res.status(200).redirect('api/drawings?message="Dessin supprimé"');

            }).catch(function (error) {

                res.status(500).render('public/error', {
                    message: "Une erreur est survenue",
                    error: error,
                });
            });
    });
}