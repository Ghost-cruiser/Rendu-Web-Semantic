﻿const express = require('express'),
    session = require('express-session'),
    passport = require('passport'),
      // logs
      morgan = require('morgan'),
      logger = require('log4js').getLogger('Server'),
      
      // parsers
      bodyParser = require('body-parser'),
      cookieParser = require('cookie-parser'),
      
      
      // server
      setDao = require('./models'),
      setRoutes = require('./routes'),
      
      // express
      app = express(),
      router = express.Router(),
      
      // config
      env = app.get('env') || process.env.NODE_ENV || "development",
      config = require(__dirname + '/config/config.json')[env],
      fb = require('./config/facebook_passport.js')(app, config, passport);


// configure app
app.locals.baseURL = config.baseURL;
app.locals.siteURL = config.siteURL;
app.set('env', env);
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('combined')); // Active le middleware de logging


app.use(passport.initialize());
app.use(passport.session());


app.use(express.static(__dirname + '/public')); // Indique que le dossier /public contient des fichiers statiques (middleware chargé de base)


app.use(cookieParser());

// setting server
setDao(app, config, session);
setRoutes(app, config, router, passport);

// use session and query strings in templates
app.use(function (req, res, next) {

    res.locals.query = req.query || {};

    res.locals.user = req.session.user;

    next();
});

// base URI
app.use(config.baseURL, router);

logger.info('server start');

app.listen(1313);


module.exports = app;
