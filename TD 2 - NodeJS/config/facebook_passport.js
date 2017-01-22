
module.exports = function (app, config, passport) {
    const FacebookStrategy = require('passport-facebook').Strategy;

    // Passport session setup.
    passport.serializeUser(function (user, done) {
        done(null, user);
    });
    passport.deserializeUser(function (obj, done) {
        done(null, obj);
    });

    // Use the FacebookStrategy within Passport.
    passport.use(new FacebookStrategy({
        clientID: config.facebook_api_key,
        clientSecret: config.facebook_api_secret,
        callbackURL: config.callback_url
    },
        function (accessToken, refreshToken, profile, done) {
            process.nextTick(function () {
                //Check whether the User exists or not using profile.id
                //Further DB code.
                return done(null, profile);
            });
        }
    ));
}