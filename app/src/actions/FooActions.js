import * as actionTypes from '../constants/ActionTypes';
import api from '../services/Api';

function getVersionSuccess (data) {
    console.log('success', data);
    return {
        type: 'OK'
    }
}

function getVersionError (data) {
    console.log('error', data);
    return {
        type: 'E'
    }
}

function getVersionForbidden (data) {
    console.log('forbidden', data);
    return {
        type: 'F'
    }
}

function getVersion () {
    return dispatch => {
        return api(dispatch).fetch({
            method: 'GET',
            resource: '/',
            type: 'json',
            success: getVersionSuccess,
            error: getVersionError,
            forbidden: getVersionForbidden
        });
    }
}

export {
    getVersion
};
