"use strict";

module.exports = function (app, router) {
    
    var models = app.get("models");
    
    router
        .route('/login')

            .get(function (req, res) {
                res.render('public/login');
            })

        .post(function (req, res) {
            models.User.findOne({ where: { email: req.body.email } })
                        .then(function (user) {
                            if (user.password === req.body.password) {
                                var role = user.role ? "admin" : "user";

                                req.session.userId = user.id;
                                req.session.role = role;


                                app.locals.user = { 
                                    id: user.id,
                                    firstname: user.firstname,
                                    userpic: user.profilepic,
                                }

                                res.render(role + '/' + 'index');
                            }
                            else {
                                res.render('public/login', { message: 'Le nom d\'utilisateur ou le mot de passe est incorrect' });
                            }
                        })

                    .catch(function (error) {
                        console.log(error);
                        res.render('public/error', { message: "Une erreur est survenue", error: error });
                    })
            });
}