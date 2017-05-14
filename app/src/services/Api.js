import fetch from 'isomorphic-fetch';
import Config from '../config';

const ApiService = () => {
    const config = Config();
    let service = {};

    function sendRequest (
        requestConf,
        success = () => null,
        error = () => null,
        notAuthorized = null
    ) {
        return fetch(
            config.buildApiUrl(requestConf.url),
            {
                method: requestConf.method,
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'same-origin',
                body: requestConf.data
            }
        )
            .then(res => {
                if (res.status === 200) {
                    return res.json().then(success);
                } else {
                    if (res.status === 403 && typeof notAuthorized === 'function') {
                        return res.json().then(json => {
                            notAuthorized();
                            error(json);
                        });
                    } else {
                        return res.json().then(error);
                    }
                }
            })
            .catch(data => {
                throw new Error(data);
            });
    }

    service.sendRequest = sendRequest;

    return service;
};

export default ApiService;
