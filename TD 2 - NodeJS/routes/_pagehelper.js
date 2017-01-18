"use strict";

module.exports = function (app, config) {
    const defaultPage = {
        title: '',
        data: {},
        page: '',

    }

    function sendError(res, error, message, status) {
        if (app.get("env") === 'development') console.log(error);

        status = status || 500;
        message = message || 'Une erreur est survenue';

        redirect(res, 'public', null, {
            message: message,
            status: status
        }, status);
    }

    function redirect(res, basepath, path, query, status) {
        var builtpath = path ?
                            '/' + path.join ?
                                path.join('/') : path
                        : '',

            builtstring = '';

        if (query) {
            var strings = [];
            for (var key in query) {
                strings.push(key + '=' + query[key]);
            }

            builtstring = '?' + strings.join('&amp;');
        }

        res.status(status || 200)
            .redirect(config.baseURL + '/error' + builtpath + builtstring);
    }

    function render(res, basepath, page, data, title, status) {
        res.status(status || 200)
            .render('_layout', {
                page: basepath + '/pages/' + page,
                data: data || {},
                title: title || '',
                directory: basepath,
            });
    }

    return {
        render: render,
        sendError: sendError,
        redirect: redirect,
    }
};