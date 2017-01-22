import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux'
import { browserHistory } from 'react-router';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

import ErrorsMiddleware from '../middlewares/ErrorsMiddleware';

const enhancer = applyMiddleware(
    thunk,
    ErrorsMiddleware,
    routerMiddleware(browserHistory)
);

function configureStore (initialState) {
    return createStore(rootReducer, initialState, enhancer);
}

export default configureStore;
