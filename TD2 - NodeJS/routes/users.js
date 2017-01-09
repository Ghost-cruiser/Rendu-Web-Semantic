"use strict";


module.exports = function (router) {
    
    var models = require('../models');
    
    router
    
        .route('/users')

        // GET /api/users 
        // Send the profile to a connected user or
        // all profiles to a connected admin. If no session,
        // return the view empty.
        .get(function (error) {
            if (req.session) {

                if (req.session.role === "admin") {
                    // ADMIN
                    models.User.findAll().then(function (users) {
                        res.status(200).render('userlist', users);
                    }).catch(function (error) {

                        res.status(404).render('error', {
                            message: "Aucun utilisateur ne semble correspondre",
                            error: error,
                        });
                    });
                }
                else
                    // USER
                    models.User.findOne({ where: { username: req.body.username } }).then(function (user) {
                        res.status(200).render('profile', user);

                    }).catch(function (error) {

                        res.status(404).render('error', {
                            message: "Aucun utilisateur ne semble correspondre",
                            error: error,
                        });
                    });

            }

            else
                // VISITOR
                res.render('profile');
        })

        // POST /api/users 
        // Subscribe a user if not connected.
        // Updates the profile if reqquester is connected
        .post(function (req, res) {
            if (!req.session) {
                // INSCRIPTION
                models.User.create(req.body).then(function () {
                    res.status(200).json({
                        message: 'User Created'
                    });

                }).catch(function (error) {

                    res.status(500).json({
                        message: "L'utilisateur n'a pas pu être ajouté",
                        error: error,
                    });
                });
            }

            else {
                if (req.session.role === "admin" || req.session.username === req.body.username) {
                    // UPDATE 
                    models.User.update(req.body, { where: { username: req.body.username } }).then(function () {
                        res.status(200).json({
                            message: 'User Created'
                        });

                    }).catch(function (error) {

                        res.status(500).render('error', {
                            message: "L'utilisateur n'a pas pu être ajouté",
                            error: error,
                        });
                    });
                }
            }
        })

        // DELETE /api/users
        // Delete a user using its username
        .delete(function (req, res) {
            if (req.session.role === "admin" || req.session.username === req.body.username) {
               
                models.User.destroy({ where: { username: req.body.username } }).then(function () {
                    req.session.destroy();

                    res.status(204).json({
                        message: 'User deleted'
                    });

                }).catch(function (error) {

                    res.status(500).json({
                        message: "L'utilisateur n'a pas pu être ajouté",
                        error: error,
                    });
                });
            }
            else {
                //TODO
            }
        })

}