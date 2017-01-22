const Config = () => {
    const apiPath = '/api';

    function getApiEndpoint () {
        if (process.env.NODE_ENV === 'test') {
            return 'http://test' + apiPath
        } else if (window && window.location) {
            return (
                window.location.protocol + '//' +
                window.location.hostname +
                (window.location.port ? ':' + window.location.port : '') +
                apiPath
            );
        }
    }

    function buildApiUrl (apiUrl) {
        return getApiEndpoint() + apiUrl;
    }

    return {
        apiEndpoint: getApiEndpoint(),
        buildApiUrl: buildApiUrl
    }
};

export default Config;
