import * as actionTypes from '../constants/ActionTypes';
import ApiService from '../services/ApiService';

const api = ApiService();

function applicationRequest () {
    return {
        type: actionTypes.APP_REQUEST
    }
}

function infoSuccess (data) {
    return {
        type: actionTypes.APP_GET_INFO_SUCCESS,
        data
    }
}

function infoError (error) {
    return {
        type: actionTypes.APP_GET_INFO_ERROR,
        error
    }
}

function getInfo () {
    const requestConf = {
        method: "GET",
        url: "/info"
    };
    return dispatch => {
        dispatch(applicationRequest());

        return api.sendRequest(
            requestConf,
            data => dispatch(infoSuccess(data)),
            data => dispatch(infoError(data))
        );
    }
}

export {
    getInfo
};
