"use strict";

module.exports = function (app, router) {
    
    router

        .route('/error')

        .get(function (req, res) {
            res.render('public/error');
        });
}