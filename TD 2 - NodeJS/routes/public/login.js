"use strict";

module.exports = function (app, config, router, pagehelper, passport) {
    
    var models = app.get("models");
    
    router
        .route('/public/login')

        .get(function (req, res) {
            if (req.session.user !== undefined)
                pagehelper.redirect(res, req.session.user.role, 'index');
            else
                pagehelper.render(res, 'public', 'login', {}, 'Connexion');
        })

        .post(function (req, res) {
            if (!req.body.fbDatas) {
                models.User.findOne({ where: { email: req.body.email } }).then(function (result) {
                    if (result) {
                        console.log(result.session);
                        if (result.getDataValue('password') === req.body.password) {
                            var user = result.session;
                            console.log(user);
                            req.session.user = user;
                            res.locals.user = result;

                            pagehelper.redirect(res, user.role, 'index');
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
            }
            else {

            }
        });


    router
        .route('/public/login/facebook')
        //Passport Router
        .get(function () { passport.authenticate('facebook') });

    router
        .route('/public/login/facebook/callback')
        .get(function () {
            passport.authenticate('facebook', {
                successRedirect: '/',
                failureRedirect: '/public/login'
            })
        },
        function (req, res) {
            res.redirect('/');
        });
}