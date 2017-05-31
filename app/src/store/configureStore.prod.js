import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux'
import { browserHistory } from 'react-router';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

import ErrorMiddleware from '../middlewares/Error';
import ApiMiddleware from '../middlewares/Api';

const enhancer = applyMiddleware(
    thunk,
    ErrorMiddleware,
    ApiMiddleware,
    routerMiddleware(browserHistory)
);

function configureStore (initialState) {
    return createStore(rootReducer, initialState, enhancer);
}

export default configureStore;
