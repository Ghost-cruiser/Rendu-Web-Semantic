"use strict";

module.exports = function (app, config, session) {
    const fs = require("fs"),
          path = require("path"),
          
          Sequelize = require("sequelize"),
          SessionStore = require('express-session-sequelize')(session.Store),
          
          database = new Sequelize(config.database, config.username, config.password, {
              host: config.host,
              dialect: config.dialect,
          }),

          sequelizeSessionStore = new SessionStore({ db: database });

    var dao = {};

    // Load all models
    fs.readdirSync(__dirname).filter(
        function (file) {
            return (file.indexOf(".") !== 0) && (file !== "index.js");
        })

        .forEach(
        function (file) {
            var model = database.import(path.join(__dirname, file));
            dao[model.name] = model;
        });

    Object.keys(dao).forEach(
        function (modelName) {
            if ("associate" in dao[modelName]) {
                dao[modelName].associate(dao);
            }
        });

    // Synchronise
    database.sync({ force: true });

    // Setup session
    app.use(session({
        secret: 'keep it secret, keep it safe.',
        store: sequelizeSessionStore,
        resave: false,
        saveUninitialized: false,
    }));

    // expose dao
    app.set('models', dao);
};