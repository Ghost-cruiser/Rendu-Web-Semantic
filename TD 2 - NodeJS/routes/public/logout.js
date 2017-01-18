"use strict";

module.exports = function (app, config, router, pagehelper) {
    
    router

        .route('/logout')

        .get(function (req, res) {
            if (req.session)
                req.session.destroy(function (err) {

                    if (err)
                        console.log(err);

                    delete res.locals.user;

                    pagehelper.redirect(res, 'public', 'login', null, 302);
                });

        });
}