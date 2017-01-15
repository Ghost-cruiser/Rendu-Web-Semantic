"use strict";

module.exports = function (app, router) {
    // API INDEX
    const
        fs = require("fs"),
        path = require("path");

    // Filter 
    router.all('/api/*', function (req, res, next) {
        if (!req.session || !req.session.role)
            res.status(403).redirect('/login');
        next();
    });

    // Require routes
    fs.readdirSync(__dirname).filter(
    function (file) {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })

        .forEach(
        function (file) {
            console.log(file);
            require('./' + file)(app, router);
        });
    
};