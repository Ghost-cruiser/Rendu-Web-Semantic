"use strict";

module.exports = function (router) {

    var models = require('../models');

    router

        .route('/drawings')

            .get(function (req, res) {
                res.render('login');
            })

            .post(function (req, res) {
                if (req.body.id) {
                    // UPDATE
                    models.User.update(req.body, { where: { id: req.body.id } }).then(function () {
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
                else {
                    //ADD
                    models.User.create(req.body).then(function () {
                        if (req.session.role !== "admin")
                            res.status(200).render('home');

                    }).catch(function (error) {

                        res.status(500).render('error', {
                            message: "L'utilisateur n'a pas pu être ajouté",
                            error: error,
                        });
                    });

                }
            });
}