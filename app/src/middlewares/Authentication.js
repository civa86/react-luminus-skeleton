import { push } from 'react-router-redux'
import Cookies from 'js-cookie';

import * as actionTypes from '../constants/ActionTypes';
import * as userActions from '../actions/UserActions';

const clearSession = (dispatch) => {
    Cookies.remove('logged_in');
    return dispatch(push('/login'));
};

const AuthenticationMiddleware = store => next => action => {
    let result = next(action);
    const currentState = store.getState();

    if (action && action.type) {
        switch (action.type) {
            case actionTypes.USER_LOGIN_SUCCESS : {
                let user = currentState.user;
                if (user.isAuthenticated === true) {
                    Cookies.set('logged_in', user.accessToken);
                    return store.dispatch(push('/'));
                }
                break;
            }

            case actionTypes.USER_LOGOUT_SUCCESS : {
                return clearSession(store.dispatch);
            }

            case actionTypes.USER_NOT_AUTHORIZED_ERROR : {
                return clearSession(store.dispatch);
            }

                //TODO decorate routes with onEnter....
            // case '@@router/LOCATION_CHANGE' : {
            //     const
            //         token = Cookies.get('logged_in'),
            //         isAuth = !!token;
            //
            //     if (action.payload.pathname === '/login' && isAuth) {
            //         return store.dispatch(push('/'));
            //     } else if (action.payload.pathname !== '/login' && !isAuth) {
            //         return store.dispatch(push('/login'));
            //
            //     } else if (isAuth) {
            //         return store.dispatch(userActions.setAccessToken(token));
            //     }
            // }
        }

    }

    return result;
};

export default AuthenticationMiddleware;
