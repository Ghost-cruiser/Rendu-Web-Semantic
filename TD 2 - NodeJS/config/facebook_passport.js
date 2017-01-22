
module.exports = function (app, config, passport) {
    const FacebookStrategy = require('passport-facebook').Strategy,
        models = app.get("models");

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

                console.log("TIIIIIIIIIICK   " + profile.id);
                //Check whether the User exists or not using profile.id
                //Further DB code.
                // find the user in the database based on their facebook id
                try {
                    models.User.findOne({ where: { 'facebookId': profile.id } }).then(function (user, err) {

                        // if there is an error, stop everything and return that
                        // ie an error connecting to the database

                        if (err) {
                            console.log('ERROR ==> ' + err)
                            return done(err);
                        }
                        // if the user is found, then log them in
                        if (user) {
                            return done(null, user); // user found, return that user
                        } else {

                            console.log('PROFILE ==> ' + profile)
                            // if there is no user found with that facebook id, create them
                            var newUser = {};

                            // set all of the facebook information in our user model
                            newUser.facebookId = profile.id; // set the users facebook id                   
                            //newUser.facebook.token = token; // we will save the token that facebook provides to the user                    
                            newUser.firstname = profile.name.givenName || profile.displayName;
                            newUser.name = profile.name.familyName; // look at the passport user profile to see how names are returned
                            newUser.email = profile.emails ? profile.emails[0].value : profile.email ? profile.email : "default@facebook.com"; // facebook can return multiple emails so we'll take the first

                            // save our user to the database
                            models.User.create(newUser).then(function (user, err) {
                                if (err)
                                    console.log('ERROR ==> ' + err);

                                // if successful, return the new user
                                return done(null, user.session);
                            });
                        }
                    });
                } catch (err) {
                    console.log(err);
                }
            })
        }));
}