"use strict";


module.exports = function (app, config, router, pagehelper) {
    
    const models = app.get("models");
    
    router

        .route('/inscription')

        // GET /inscription
        .get(function (req, res) {
            pagehelper
                .render(res, 'public', 'inscription', {}, 'Formulaire d\'inscription');
        })

        // POST /user/users 
        // Subscribe a user.
        .post(function (req, res) {
            var id = req.params.id,
                user = req.body;

            // INSCRIPTION
            models.User.create(user).then(function () {
                pagehelper
                    .render(res, 'public', 'login', {}, 'Formulaire de connexion');

            }).catch(function (error) {
                pagehelper
                    .sendError(res, 500, error, "Inscription échouée");
            });
        });
}