"use strict";


module.exports = function (app, router) {
    
    var models = app.get("models");
    
    router

        .route('/users')

        // GET /admin/users 
        // Send the profile to a connected user or
        // all profiles to a connected admin. If no session,
        // return the view empty.
        .get(function (req, res) {
            // ADMIN
            models.User.findAll().then(function (users) {
                res.status(200).render('userlist', users);
            }).catch(function (error) {

                res.status(500).render('public/error', {
                    message: "Une erreur est survenue",
                    error: error,
                });
            });
        });

    router

        .route('/users/:id')


        // GET /admin/users/:id
        // Send the profile of a specified user
        .get(function (req, res) {
            var id = req.params.id;

            if (id) {
                // ADMIN
                models.User.findOne({ where: { id: req.body.id } }).then(function (user) {
                    res.status(200).render('admin/userprofile', user);

                }).catch(function (error) {

                    res.status(500).render('public/error', {
                        message: "Une erreur est survenue",
                        error: error,
                    });
                });
            }
            else {
                res.status(200).render('admin/userprofile');
            }
        })

        // POST /api/users
        // Subscribe a user if not connected.
        // Updates the profile if reqquester is connected
        .post(function (req, res) {
            var id = req.params.id,
                user = req.body;
            
            if (user.couleur)
                user.couleur = user.couleur.replace('#', '');

            if (!id) {
                // INSCRIPTION
                models.User.create(user).then(function () {
                    res.status(200).render('admin/userlist', {
                        message: 'User Created'
                    });

                }).catch(function (error) {

                    res.status(500).render('public/error', {
                        message: "Une erreur est survenue",
                        error: error,
                    });
                });
            }

            else {
                    // UPDATE 
                    models.User.update(req.body, { where: { id: id } }).then(function () {
                        res.status(200).render('admin/userlist',{
                            message: 'User updated'
                        });

                    }).catch(function (error) {

                        res.status(500).render('public/error', {
                            message: "L'utilisateur n'a pas pu être ajouté",
                            error: error,
                        });
                    });
                
            }
        })

        // DELETE /api/users
        // Delete a user using its username
        .delete(function (req, res) {
            models.User.destroy({ where: { id: req.body.id } }).then(function () {
                res.status(204).render('admin/userlist', {
                    message: 'User deleted'
                });

            }).catch(function (error) {

                res.status(500).render('public/error',{
                    message: "L'utilisateur n'a pas pu être effacé",
                    error: error,
                });
            });
        })

}