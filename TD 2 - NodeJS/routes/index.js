"use strict";

module.exports = function (app, config, router) {

    const
        fs = require("fs"),
        path = require("path");

    // ROUTES INDEX
    router.use(function (req, res, next) {
        console.log('Setting Headers');
        res.setHeader("Access-Control-Allow-Origin", "*");
        //res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.setHeader('Access-Control-Allow-Headers', 'Authorization,content-type');

        next(); // make sure we go to the next routes and don't stop here
    });

    // catch 404 and forward to error handler



    // Load all models
    fs.readdirSync(__dirname).filter(
        function (file) {
            return fs.statSync(path.join(__dirname, file)).isDirectory();
        })

        .forEach(
        function (dir) {
            require('./' + dir)(app, router);
        });

    router
        .route('/')
        .get(function (req, res, next) {
            res.redirect('/pictio/login');
        })

    //app.use(function (req, res, next) {
    //    var err = new Error('Not Found');
    //    err.status = 404;
    //    console.log("in 404");
    //    next(err);
    //});
    //require('./public/index.js')(app, router);
    //require('./user/index.js')(app, router);
    //require('./admin/index.js')(app, router);

};