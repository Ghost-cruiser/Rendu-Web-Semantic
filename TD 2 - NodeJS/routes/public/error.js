"use strict";

module.exports = function (app, config, router, pagehelper) {
    
    router

        .route('/public/error')

        .get(function (req, res) {
            pagehelper
                .render(res, 'public', 'error');
        });
}