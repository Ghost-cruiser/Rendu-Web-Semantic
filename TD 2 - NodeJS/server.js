const express = require('express'),
      session = require('express-session'),
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
      config = require(__dirname + '/config/config.json')[env];


// configure app
app.locals.baseURL = config.baseURL;
app.set('env', env);
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('combined')); // Active le middleware de logging

app.use(express.static(__dirname + '/public')); // Indique que le dossier /public contient des fichiers statiques (middleware chargé de base)


app.use(cookieParser());
// setting server
setDao(app, config, session);
setRoutes(app, config, router);

// base URI
app.use(config.baseURL, router);

logger.info('server start');

app.listen(1313);

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        console.log('error intercepted by the app', err);
        res.status(err.status || 500);
        res.render('public/error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    console.log('error intercepted by the app', err);
    res.status(err.status || 500);
    res.render('public/error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
