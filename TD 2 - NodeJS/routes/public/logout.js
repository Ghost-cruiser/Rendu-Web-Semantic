"use strict";

module.exports = function (app, config, router, pagehelper) {
    
    router

        .route('/public/logout')

        .get(function (req, res) {
            req.logout();
            if (req.session)
                req.session.destroy(function (err) {

                    if (err)
                        console.log(err);

                    delete res.locals.user;

                    pagehelper.redirect(res, 'public', 'login', null, 302);
                });

        });
}