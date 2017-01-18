"use strict";


module.exports = function (app, config, router, pagehelper) {

    var models = app.get("models");

    router

        .route('/user/profile')

        // GET /user/profile 
        // Get the user's profile
        .get(function (req, res) {
            // USER
            models.User.findOne({ where: { id: req.session.user.id } }).then(function (result) {
                pagehelper
                    .render(res, 'user', 'profile', result.get(), 'Profile');

            }).catch(function (error) {
                pagehelper
                    .sendError(res, error);
            });

        })

        // POST /user/profile 
        // Updates the profile 
        .post(function (req, res) {
            var user = req.body;

            // UPDATE 
            models.User.update(req.body, { where: { id: req.session.user.id } }).then(function () {
                pagehelper
                    .redirect(res, 'user', 'index', '', {
                        message: 'Profile mis à jour!'
                    });

            }).catch(function (error) {
                pagehelper
                    .sendError(res, error);
            });

        })

        // DELETE /user/profile
        // Delete a user using its username
        .delete(function (req, res) {
            models.User.destroy({ where: { id: req.session.user.id } }).then(function () {
                req.session.destroy();

                pagehelper
                    .redirect(res, 'public', 'login', '', {
                        message: 'Utilisateur supprimé'
                    }, 204);

            }).catch(function (error) {
                pagehelper
                    .sendError(res, error);
            });

        })

}