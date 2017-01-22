"use strict";


module.exports = function (app, config, router, pagehelper) {
    
    const models = app.get("models");
    
    router

        .route('/admin/users')

        // GET /admin/users 
        // Send the profile to a connected user or
        // all profiles to a connected admin. If no session,
        // return the view empty.
        .get(function (req, res) {
            // ADMIN
            models.User.findAll().then(function (users) {
                pagehelper
                    .render(res, 'admin', 'users', { users: users }, 'Liste des utilisateurs');

            }).catch(function (error) {
                pagehelper
                    .sendError(res, 500, error, "Une erreur est survenue durant la récupération des utilisateurs");
            });
        });

    router

        .route('/admin/users/:id')


        // GET /admin/users/:id
        // Send the profile of a specified user
        .get(function (req, res) {
            var id = req.params.id;

            if (id != 0) {
                models.User.findOne({ where: { id: id } }).then(function (result) {
                    pagehelper
                        .render(res, 'admin', 'user', result.get(), 'Fiche utilisateur');

                }).catch(function (error) {
                    pagehelper
                        .sendError(res, 500, error, "Une erreur est survenue durant la récupération des utilisateurs");
                });
            }
            else {
                pagehelper
                    .render(res, 'admin', 'user', {}, 'Inscription');
            }
        })

        // POST /user/users
        // Subscribe a user if not connected.
        // Updates the profile if reqquester is connected
        .post(function (req, res) {
            var id = req.params.id,
                user = req.body;

            if (id == 0) {
                // INSCRIPTION
                models.User.create(user).then(function () {
                    pagehelper
                        .redirect(res, 'admin', 'users', null, {
                            message: 'User Created'
                        });

                }).catch(function (error) {
                    pagehelper
                        .sendError(res, 500, error, "Une erreur est survenue durant l'inscription.");
                });
            }

            else {
                // UPDATE 
                models.User.update(req.body, { where: { id: id } }).then(function () {
                    pagehelper
                        .redirect(res, 'admin', 'users', null, {
                            message: 'User Updated'
                        });

                }).catch(function (error) {
                    pagehelper
                        .sendError(res, 500, error, "Une erreur est survenue durant la mise à jour");
                });

            }
        });

        // Get /users/delete/:userId
        // Delete a user using its username

    router

        .route('/admin/users/delete/:id')

        .get(function (req, res) {
            models.User.destroy({ where: { id: req.params.id } }).then(function () {
                pagehelper
                    .redirect(res, 'admin', 'users', null, {
                        status: 204,
                        message: 'User deleted'
                    });

            }).catch(function (error) {
                pagehelper
                    .sendError(res, 500, error, "L'utilisateur n'a pas pu être effacé");
            });
        })

}