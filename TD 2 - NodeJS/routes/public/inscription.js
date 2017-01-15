"use strict";


module.exports = function (app, router) {
    
    var models = app.get("models");
    
    router

        .route('/inscription')

        // GET /inscription
        .get(function (req, res) {
            res.render('public/inscription');
        })

        // POST /api/users 
        // Subscribe a user.
        .post(function (req, res) {
            var id = req.params.id,
                user = req.body;

            if (user.couleur)
                user.couleur = user.couleur.replace('#', '');

            // INSCRIPTION
            models.User.create(user).then(function () {
                res.status(200).render('public/login', {
                    message: 'User Created'
                });

            }).catch(function (error) {

                console.log(error);
                res.status(500).render('public/error', {
                    message: "L'utilisateur n'a pas pu être ajouté",
                    error: error,
                });
            });
        });
}