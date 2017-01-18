"use strict";

module.exports = function (app, config, router, pagehelper) {
    
    var models = app.get("models");
    
    router
        .route('/login')

        .get(function (req, res) {
            if (req.session.user !== undefined)
                pagehelper.redirect(res, req.session.user.role, 'index');
            else
                pagehelper.render(res, 'public', 'login', {}, 'Connexion');
        })

        .post(function (req, res) {
            models.User.findOne({ where: { email: req.body.email } }).then(function (result) {
                if (result) {
                    if (user.password === req.body.password) {
                        var user = result.get();

                        req.session.user = user;

                        pagehelper.redirect(res, req.session.user.role, 'index');
                    }
                    else {
                        pagehelper.redirect(res, 'public', 'login', {
                            message: 'Mot de passe incorrect.'
                        });
                    }
                }
                else {
                    pagehelper.redirect(res, 'public', 'login', {
                        message: 'Nom d\'utilisateur non reconnu.'
                    });
                }
            })
                .catch(function (error) {
                    pagehelper
                        .sendError(res, error);
                })
        });
}