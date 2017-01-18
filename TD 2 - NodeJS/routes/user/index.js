"use strict";

module.exports = function (app, config, router, pagehelper) {
    // API INDEX
    const
        fs = require("fs"),
        path = require("path");

    // Filter 
    router.all('/user/*', function (req, res, next) {
        if (!req.session || !req.session.role)
            pagehelper.redirect(res, 'public', 'login', null, 403);

        next();
    });

    router
        .route('/user/index')
        .get(function (req, res, next) {
            pagehelper.render(res, 'user', 'index');
    });

    // Require routes
    fs.readdirSync(__dirname).filter(
    function (file) {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })

        .forEach(
        function (file) {
            console.log(file);
            require('./' + file)(app, config, router, pagehelper);
        });
    
};