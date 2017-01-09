var express = require('express'),
    morgan = require('morgan'), // Charge le middleware de logging
    logger = require('log4js').getLogger('Server'),
    bodyParser = require('body-parser'),
    app = express(),
    routes = require('./routes'),
    router = express.Router();


// config
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('combined')); // Active le middleware de logging

app.use(express.static(__dirname + '/public')); // Indique que le dossier /public contient des fichiers statiques (middleware chargé de base)

logger.info('server start');
routes(router);
app.use('/api', router);

app.listen(1313);



