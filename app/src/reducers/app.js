import * as actionTypes from '../constants/ActionTypes';
import initState from './initState';

function app (state = initState.app, action = {}) {

    switch (action.type) {

        case actionTypes.APP_REQUEST : {
            return {
                ...state,
                isFetching: true,
                error: null
            }
        }

        case actionTypes.APP_GET_INFO_SUCCESS : {
            return {
                ...state,
                isFetching: false,
                info: action.data,
                error: null
            }
        }

        case actionTypes.APP_GET_INFO_ERROR : {
            return {
                ...state,
                isFetching: false,
                error: action.error,
                info: null
            }
        }

        default : {
            return state;
        }

    }
}

export default app;
