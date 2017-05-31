// import { push } from 'react-router-redux'

// import * as actionTypes from '../constants/ActionTypes';

const ApiMiddleware = (store) => next => action => {

    if (action.$api && typeof action.$api === 'object') {
        console.log('action', action);
    }


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

export default ApiMiddleware;
