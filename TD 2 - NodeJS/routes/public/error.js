"use strict";

module.exports = function (app, config, router, pagehelper) {
    
    router

        .route('/error')

        .get(function (req, res) {
            pagehelper
                .render(res, 'public', 'error');
        });
}