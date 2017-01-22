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

        redirect(res, 'public', 'error', {
            message: message,
            status: status
        }, status);
    }

    function redirect(res, basepath, path, query, status) {
        
        var builtpath = '/',
            builtstring = '';

        if (path && path.join)
            builtpath += path.join('/');
        else
            builtpath += path || '';

        if (query) {
            var strings = [];
            for (var key in query) {
                strings.push(key + '=' + encodeURIComponent(query[key]));
            }

            builtstring = '?' + strings.join('&');
        }

        console.log(basepath);

        res.status(status || 200)
            .redirect(config.baseURL + '/' + basepath  + builtpath + builtstring);
    }

    function render(res, basepath, page, data, title, status) {
        res.setHeader('content-type', 'text/html; charset=UTF-8');
        res.status(status || 200);
        res.render('_layout', {
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