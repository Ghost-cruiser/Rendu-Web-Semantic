"use strict";

module.exports = function (app, config, router, passport) {

    const
        fs = require("fs"),
        path = require("path");

    // ROUTES INDEX
    router.use(function (req, res, next) {
        console.log('Setting params');

        console.log('Setting Headers');
        res.setHeader("Access-Control-Allow-Origin", "*");
        //res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.setHeader('Access-Control-Allow-Headers', 'Authorization,content-type');
        
        next(); // make sure we go to the next routes and don't stop here
    });

    var pagehelper = require('./_pagehelper')(app, config);

    // Load all models
    fs.readdirSync(__dirname).filter(
        function (file) {
            return fs.statSync(path.join(__dirname, file)).isDirectory();
        })

        .forEach(
        function (dir) {
            require('./' + dir)(app, config, router, pagehelper, passport);
        });

    // init redirect
    router
        .route('/')
        .get(function (req, res, next) {
            if (req.session.user)
                pagehelper
                    .redirect(res, req.session.user.role, 'index');
            else
                pagehelper
                    .redirect(res, 'public', 'login');
        })


    // error handlers

    // development error handler
    // will print stacktrace
    if (app.get('env') === 'development') {
        app.use(function (err, req, res, next) {
            pagehelper
                .sendError(res, err, 'Error intercepted by the application.', err.status || 500);
        });
    }

    // production error handler
    // no stacktraces leaked to user
    app.use(function (err, req, res, next) {
        pagehelper
            .sendError(res, err, '', err.status || 500);
    });

};