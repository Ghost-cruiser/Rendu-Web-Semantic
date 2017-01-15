"use strict";


module.exports = function (app, router) {

    var models = app.get("models");

    router

        .route('/profile')

        // GET /api/profile 
        // Get the user's profile
        .get(function (req, res) {
            // USER
            models.User.findOne({ where: { id: req.session.id } }).then(function (user) {
                res.status(200).render('user/profile', user);

            }).catch(function (error) {

                res.status(404).render('public/error', {
                    message: "Aucun utilisateur ne semble correspondre",
                    error: error,
                });
            });

        })

        // POST /api/profile 
        // Updates the profile 
        .post(function (req, res) {
            var user = req.body;

            if (user.couleur)
                user.couleur = user.couleur.replace('#', '');

            // UPDATE 
            models.User.update(req.body, { where: { id: req.session.id } }).then(function () {
                res.status(200).render('user/index');

            }).catch(function (error) {

                res.status(500).render('public/error', {
                    message: "Une erreur est survenue",
                    error: error,
                });
            });

        })

        // DELETE /api/profile
        // Delete a user using its username
        .delete(function (req, res) {
            models.User.destroy({ where: { id: req.session.id } }).then(function () {
                req.session.destroy();

                res.status(204).render('public/login', {
                    message: 'User deleted'
                });

            }).catch(function (error) {

                res.status(500).render('public/error', {
                    message: "Une erreur est survenue",
                    error: error,
                });
            });

        })

}