"use strict";

module.exports = function (app, config, router) {
    
    router

        .route('/logout')

        .get(function (req, res) {
            if (req.session)
                req.session.destroy(function (err) {
                    
                    delete app.locals.user;

                    if (err)
                        console.log(err);

                    res.status(302).redirect(config.baseURL + '/login');
                });

        });
}