"use strict";

module.exports = function (app, config, router, pagehelper, passport) {
    
    const models = app.get("models");
    
    router
        .route('/public/login')

        .get(function (req, res) {
            if (req.session.passport && req.session.passport.user !== undefined)
                pagehelper.redirect(res, req.session.passport.user.role, 'index');
            else
                pagehelper.render(res, 'public', 'login', {}, 'Connexion');
        })

        .post(passport.authenticate('local', {
            failureRedirect: config.baseURL + '/public/login',
            successRedirect: config.baseURL + '/',
            }

        ));


    if (app.locals.params && app.locals.params.facebook) {
        //router
        //    .route('/public/login/callback')
        //    .get(passport.authenticate('facebook', {
        //        failureRedirect: config.baseURL + '/public/login'
        //    }));
        router
            .route('/public/login/facebook')
            //Passport Router
            .get(passport.authenticate('facebook', { scope: 'email' }));

        router
            .route('/public/login/facebook/callback')
            .get(passport.authenticate('facebook', {
                failureRedirect: config.baseURL + '/public/login'
            }),

            // on succes
            function (req, res) {
                // return the token or you would wish otherwise give eg. a succes message
                pagehelper
                    .redirect(res, req.session.passport.user.role, 'index');
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
    if (app.locals.params && app.locals.params.google) {
        router
            .route('/public/login/google')
            //Passport Router
            .get(passport.authenticate('google', { scope: ['email'] }));

        router
            .route('/public/login/google/callback')
            .get(passport.authenticate('google', {
                failureRedirect: config.baseURL + '/public/login'
            }),

            // on succes
            function (req, res) {
                // return the token or you would wish otherwise give eg. a succes message
                pagehelper
                    .redirect(res, req.session.passport.user.role, 'index');
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
}