"use strict";


module.exports = function (app, config, router, pagehelper) {

    var models = app.get("models");

    router

        .route('/admin/profile')

        // GET /user/profile 
        // Get the user's profile
        .get(function (req, res) {
            // USER
            models.User.findOne({ where: { id: req.session.passport.user.id } }).then(function (result) {
                pagehelper
                    .render(res, 'admin', 'user', result.get(), 'Profile');

            }).catch(function (error) {
                pagehelper
                    .sendError(res, error);
            });

        })

        // POST /user/profile 
        // Updates the profile 
        .post(function (req, res) {
            var user = req.body;

            // UPDATE 
            models.User.update(req.body, { where: { id: req.session.passport.user.id } }).then(function () {
                pagehelper
                    .redirect(res, 'admin', 'index', '', {
                        message: 'Profile mis à jour!'
                    });

            }).catch(function (error) {
                pagehelper
                    .sendError(res, error);
            });

        });

}