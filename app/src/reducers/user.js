import * as actionTypes from '../constants/ActionTypes';
import initState from './initState';

function user (state = initState.user, action = {}) {

    switch (action.type) {

        default : {
            return state;
        }

    }
}

export default user;
