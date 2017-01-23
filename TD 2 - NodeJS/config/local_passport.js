
module.exports = function (app, config, passport) {
    const LocalStrategy = require('passport-local').Strategy,
        models = app.get("models");

    // Passport session setup.
    passport.serializeUser(function (user, done) {
        done(null, user);
    });
    passport.deserializeUser(function (obj, done) {
        done(null, obj);
    });

    passport.use(new LocalStrategy(
        function (email, password, done) {
            models.User.findOne({ where: { email: email } }).then(function (result, err) {

                if (err) { return done(err); }

                if (!result) {
                    return done(null, false, { message: 'Incorrect username.' });
                }

                if (result.getDataValue('password') !== password) {
                    return done(null, false, { message: 'Incorrect password.' });
                }
                return done(null, result.session);
            });
        }
    ));
}