
module.exports = function (app, config, passport) {
    const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
        models = app.get("models");
    // TODO


        // used to serialize the user for the session
        passport.serializeUser(function (user, done) {
            done(null, user.id);
        });

        // used to deserialize the user
        passport.deserializeUser(function (id, done) {
            User.findById(id, function (err, user) {
                done(err, user);
            });
        });

        // =========================================================================
        // GOOGLE ==================================================================
        // =========================================================================
        passport.use(new GoogleStrategy({

            clientID: config.google_api_key,
            clientSecret: config.google_api_secret,
            callbackURL: config.google_callback_url,

        },
            function (token, refreshToken, profile, done) {

                // make the code asynchronous
                // User.findOne won't fire until we have all our data back from Google
                process.nextTick(function () {
                    var search = profile.emails && profile.emails[0] && profile.emails[0].value ?

                        { $or: [{ 'googleId': profile.id }, { 'email': profile.emails[0].value }] } :

                        { 'googleId': profile.id };

                    // try to find the user based on their google id
                    models.User.findOne({ where: search }).then(function (user, err) {
                        if (err)
                            return done(err);

                        if (user) {

                            // if a user is found, log them in
                            return done(null, user);
                        } else {
                            // if the user isnt in our database, create a new user
                            var newUser = {};

                            // set all of the relevant information
                            newUser.googleId = profile.id;
                            newUser.firstname = profile.displayName;
                            newUser.email = profile.emails ? profile.emails[0].value : 'default@google.com'; // pull the first email

                            // save the user
                            models.User.create(newUser).then(function (user, err) {
                                if (err)
                                    throw err;
                                return done(null, user.session);
                            });
                        }
                    });
                });

            }));
}