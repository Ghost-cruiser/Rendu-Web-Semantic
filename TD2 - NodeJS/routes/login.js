"use strict";

module.exports = function (router) {
    
    var models = require('../models');
    
    router
    
        .route('/login')

            .get(function (req, res) {
                res.render('login');
            })

            .post(function (req, res) {
                models.User.findOne({ where: { username: req.body.username } })
                        .then(function (user) {
                            if (user.password === req.body.password) {
                                req.session.username = user.username;
                                req.session.role = user.role ? "admin" : "user";
                                res.render('home');
                            }
                            else {
                                res.json({ message: 'Le nom d\'utilisateur ou le mot de passe est incorrect' });
                            }
                        })

                    .catch(function (error) {
                        console.log('erreur');
                        res.json({ message: "Une erreur est survenue", error: error });
                    })
            });
}