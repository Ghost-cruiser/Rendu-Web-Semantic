"use strict";

module.exports = function (app, config, router, pagehelper) {

    const models = app.get("models");
    // New drawing
    router
        .route('/admin/parameters')

        .get(function (req, res) {
                pagehelper
                    .render(res, 'admin', 'parameters', { parameters: app.locals.params }, 'Paramètres');
        })
        .post(function (req, res) {
            var params = req.body;

            for (var key in app.locals.params) {
                params[key] = params[key] || 0;
            }

            models.Parameter.update(params, { where: { id: 1 } }).then(function () {
                pagehelper
                    .redirect(res, 'admin', 'index', {
                        status: 204,
                        message: 'Paramètres mis à jour. Veuillez redémarrer le serveur.'
                    });

            }).catch(function (error) {
                pagehelper
                    .sendError(res, 500, error, 'Les paramètres n\'ont pas pu être mis à jour.');

            });
        });

}