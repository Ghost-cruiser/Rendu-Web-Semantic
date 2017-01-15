"use strict";

module.exports = function (app, router) {
    
    router

        .route('/logout')

        .get(function (req, res) {
            if (req.session)
                req.session.destroy();

            res.status(302).redirect('/login');
        });
}