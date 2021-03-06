﻿"use strict";

module.exports = function (app, config, router, pagehelper, passport) {
    // ADMIN INDEX

    const
        fs = require("fs"),
        path = require("path");

    // Filter 
    router.all('/admin/*', function (req, res, next) {
        if (!req.session.passport || !req.session.passport.user || req.session.passport.user.role !== "admin")
            pagehelper
                .sendError(res, 'Accès restreint', 'Vous devez être authentifier en tant qu\'administrateur.');

        next();
    });

    router
        .route('/admin/index')
        .get(function (req, res, next) {
            pagehelper
                .render(res, 'admin', 'index', {}, 'Dashboard');
        });

    // Require routes
    fs.readdirSync(__dirname).filter(
        function (file) {
            return (file.indexOf(".") !== 0) && (file !== "index.js");
        })

        .forEach(
        function (file) {
            console.log(file);
            require('./' + file)(app, config, router, pagehelper, passport);
        });
    //require('./drawings.js')(app, router);
    //require('./users.js')(app, router);
};