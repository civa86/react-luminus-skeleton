import fetch from 'isomorphic-fetch';

//TODO check for middleware

const ApiService = (dispatch = null, path = '/api') => {
    if (typeof dispatch !== 'function') {
        throw new Error('dispatch handler is missing.');
    }

    function checkConfiguration (conf) {

        if (!conf) {
            throw new Error('configuration settings are missing.');
        }

        if (!conf.method || typeof conf.method !== 'string') {
            throw new Error('request method is missing.');
        }

        if (!conf.resource || typeof conf.resource !== 'string') {
            throw new Error('rest resource is missing.');
        }

        if (typeof conf.success !== 'function') {
            throw new Error('success handler is missing.');
        }

        if (typeof conf.error !== 'function') {
            throw new Error('error handler is missing.');
        }
    }

    function getEndpoint () {
        if (window && window.location) {
            return (
                window.location.protocol + '//' +
                window.location.hostname +
                (window.location.port ? ':' + window.location.port : '') +
                path
            );
        } else {
            return 'http://domain.ext' + path
        }
    }

    function setHeaders (conf) {
        const headers = {};

        if (conf && conf.type) {
            if (conf.type === 'json') {
                headers['Content-Type'] = 'application/json';
            }
        }

        return headers;
    }

    function setConfiguration (conf) {
        return {
            method: conf.method,
            headers: setHeaders(conf),
            credentials: 'same-origin',
            body: conf.data
        };
    }

    function slugify (path) {
        return path.toLowerCase()
                   .split('/')
                   .filter(e => !!e)
                   .join('-') || 'index'
    }

    function getAction (type, conf) {
        return {
            type,
            api: slugify(conf.resource),
            fingerPrint: conf.method.toLowerCase() + '-' + slugify(conf.resource)
        };
    }

    function fetchingStart (conf) {
        return getAction('@@API/FETCHING', conf);
    }

    function fetchingStop (conf) {
        return getAction('@@API/FINISH', conf);
    }

    return {
        fetch: (conf) => {
            checkConfiguration(conf);

            dispatch(fetchingStart(conf));

            fetch(
                getEndpoint() + conf.resource,
                setConfiguration(conf)
            )
                .then(res => {
                    if (res.status === 200) {
                        dispatch(fetchingStop(conf));
                        return res.json().then(data => dispatch(conf.success(data)));
                    } else if (res.status === 403 && typeof conf.forbidden === 'function') {
                        dispatch(fetchingStop(conf));
                        return res.json().then(data => dispatch(conf.forbidden(data)));
                    } else {
                        dispatch(fetchingStop(conf));
                        return res.json().then(data => dispatch(conf.error(data)));
                    }
                })
                .catch(data => {
                    throw new Error(data);
                });
        }
    };
};

export default ApiService;
