import * as actionTypes from '../constants/ActionTypes';
import ApiService from '../services/ApiService';

const api = ApiService();

function loginRequest () {
    return {
        type: actionTypes.USER_LOGIN_REQUEST
    }
}

function loginSuccess (data) {
    return {
        type: actionTypes.USER_LOGIN_SUCCESS,
        ...data
    }
}

function loginError (error) {
    return {
        type: actionTypes.USER_LOGIN_ERROR,
        error
    }
}

function login (username, password) {
    const requestConf = {
        method: "POST",
        url: "/api/auth",
        data: JSON.stringify({ username, password })
    };
    return dispatch => {
        dispatch(loginRequest());

        return api.sendRequest(
            requestConf,
            data => {
                if (data && data.result && data.result.accessToken) {
                    dispatch(loginSuccess(data.result));
                } else {
                    dispatch(loginError({ error: 'Errore' }));
                }

            },
            data => dispatch(loginError(data)),
            () => dispatch(notAuthorizedError())
        );
    }
}

function logoutRequest () {
    return {
        type: actionTypes.USER_LOGOUT_REQUEST
    }
}

function logoutSuccess () {
    return {
        type: actionTypes.USER_LOGOUT_SUCCESS
    }
}

function logout () {
    const requestConf = {
        method: "DELETE",
        url: "/api/auth"
    };
    return dispatch => {
        dispatch(logoutRequest());

        return api.sendRequest(
            requestConf,
            () => dispatch(logoutSuccess()),
            () => dispatch(logoutSuccess())
        );
    }
}
//
// function userGetRequest () {
//     return {
//         type: actionTypes.USER_GET_REQUEST
//     }
// }
//
// function userGetSuccess (data) {
//     return {
//         type: actionTypes.USER_GET_SUCCESS,
//         user: data
//     }
// }
//
// function userGetError (error) {
//     return {
//         type: actionTypes.USER_GET_ERROR,
//         error
//     }
// }
//
// function getUserData () {
//     const requestConf = {
//         method: "GET",
//         url: "/api/user"
//     };
//     return dispatch => {
//         dispatch(userGetRequest());
//
//         return api.sendRequest(
//             requestConf,
//             data => dispatch(userGetSuccess(data.result)),
//             data => dispatch(userGetError(data)),
//             () => dispatch(notAuthorizedError())
//         );
//     }
// }
//
// function setAccessToken (token) {
//     return {
//         type: actionTypes.USER_SET_ACCESS_TOKEN,
//         token
//     }
// }
//
// function notAuthorizedError () {
//     return {
//         type: actionTypes.USER_NOT_AUTHORIZED_ERROR
//     }
// }

export {
    login,
    logout
    // ,
    // getUserData,
    // setAccessToken,
    // notAuthorizedError
};
