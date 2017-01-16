"use strict";

module.exports = function (app, config, router) {
    // PUBLIC INDEX

    const
        fs = require("fs"),
        path = require("path");

    // Require routes
    fs.readdirSync(__dirname).filter(
        function (file) {
            // Filter : all files != index.js
            return (file.indexOf(".") !== 0) && (file !== "index.js");
        })

        .forEach(
        function (file) {
            // Action : require file
            require('./' + file)(app, config, router);
        });
};