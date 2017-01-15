"use strict";

module.exports = function (app, router) {
    // ADMIN INDEX

    const
        fs = require("fs"),
        path = require("path");

    // Filter 
    router.all('/admin/*', function (req, res, next) {
        if (!req.session || req.session.role !== "admin")
            res.status(403)
                .redirect('/error?status=403&amp;reason=Vous devez être authentifier en tant qu\'administrateur.');
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
    //require('./drawings.js')(app, router);
    //require('./users.js')(app, router);
};