// import { push } from 'react-router-redux'

// import * as actionTypes from '../constants/ActionTypes';

const ErrorMiddleware = (/*store*/) => next => action => {
    let result = next(action);

    // if (action && action.type) {
    //     switch (action.type) {
    //         case actionTypes.USER_GET_ERROR : {
    //             return store.dispatch(push('/error'));
    //         }
    //
    //         case actionTypes.PLACE_ERROR : {
    //             return store.dispatch(push('/error'));
    //         }
    //
    //         case actionTypes.TRAVEL_ERROR : {
    //             return store.dispatch(push('/error'));
    //         }
    //     }
    //
    // }

    return result;
};

export default ErrorMiddleware;
