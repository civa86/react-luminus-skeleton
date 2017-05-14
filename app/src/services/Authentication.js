import Cookies from 'js-cookie';

const AuthenticationService = () => {
    let service = {};

    function isAuthenticated () {
        const accessToken = Cookies.get('access_token');
        return !!accessToken;
    }

    function checkRouteAccess (nextState, replace) {
        if (!isAuthenticated()) {
            replace({
                pathname: '/'
            });
        }
    }

    service.checkRouteAccess = checkRouteAccess;

    return service;
};

export default AuthenticationService;
