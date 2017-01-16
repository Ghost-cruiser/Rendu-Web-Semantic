"use strict";


module.exports = function (app, config, router) {

    var models = app.get("models");

    router

        .route('/api/profile')

        // GET /api/profile 
        // Get the user's profile
        .get(function (req, res) {
            // USER
            models.User.findOne({ where: { id: req.session.userId } }).then(function (result) {

                res.status(200).render('user/profile', result.get());

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

            // UPDATE 
            models.User.update(req.body, { where: { id: req.session.userId } }).then(function () {
                res.status(200).redirect('/api/index?message="Profile mis à jour!');

            }).catch(function (error) {
                console.log(error);
                res.status(500).render('public/error', {
                    message: "Une erreur est survenue",
                    error: error,
                });
            });

        })

        // DELETE /api/profile
        // Delete a user using its username
        .delete(function (req, res) {
            models.User.destroy({ where: { id: req.session.userId } }).then(function () {
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