"use strict";

module.exports = function (router) {
    router.use(function (req, res, next) {
        console.log('Setting Headers');
        res.setHeader("Access-Control-Allow-Origin", "*");
        //res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.setHeader('Access-Control-Allow-Headers', 'Authorization,content-type');

        next(); // make sure we go to the next routes and don't stop here
    });

    // Filter 
    router.all('*', function (req, res) {
        if (!req.session && req.path !== '/login' && req.path !== '/users')
            res.redirect('/login');
    });

    require('./login.js')(router);
    require('./users.js')(router);
    require('./drawings.js')(router);

};