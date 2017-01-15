"use strict";

module.exports = function (app, router) {
    // PUBLIC INDEX

    const
        fs = require("fs"),
        path = require("path");

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
    //require('./login.js')(app, router);
    //require('./inscription.js')(app, router);
    //require('./logout.js')(app, router);

};