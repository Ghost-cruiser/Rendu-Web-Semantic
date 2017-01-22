"use strict";

module.exports = function (app, config, router, pagehelper, passport) {
    
    var models = app.get("models");
    
    router
        .route('/public/login')

        .get(function (req, res) {
            if (req.session.passport && req.session.passport.user !== undefined)
                pagehelper.redirect(res, req.session.passport.user.role, 'index');
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
                            req.session.passport.user = user;
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
        .get(passport.authenticate('facebook', { scope: 'email' }));

    router
        .route('/public/login/facebook/callback')
        .get(passport.authenticate('facebook', {
                successRedirect: config.baseURL + '/',
                failureRedirect: config.baseURL + '/public/login'
        }),

             // on succes
        function (req, res) {
            // return the token or you would wish otherwise give eg. a succes message
            res.render('json', JSON.stringify(req.user.access_token));
        },
    function (err, req, res, next) {
            // You could put your own behavior in here, fx: you could force auth again...
        // res.redirect('/auth/facebook/');
        if (err) {
            pagehelper
                .sendError(res, err, err, 500);
            }
        });
}