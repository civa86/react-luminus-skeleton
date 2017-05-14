import { createStore, applyMiddleware, compose } from 'redux';
import { persistState } from 'redux-devtools';
import { routerMiddleware } from 'react-router-redux'
import { browserHistory } from 'react-router';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import DevTools from '../containers/DevTools';

import ErrorMiddleware from '../middlewares/Error';

const enhancer = compose(
    applyMiddleware(
        thunk,
        ErrorMiddleware,
        routerMiddleware(browserHistory)
    ),
    DevTools.instrument(),
    persistState(
        window.location.href.match(
            /[?&]debug_session=([^&]+)\b/
        )
    )
);

function configureStore (initialState) {
    const store = createStore(rootReducer, initialState, enhancer);

    if (module.hot) {
        module.hot.accept('../reducers', () =>
            store.replaceReducer(require('../reducers').default)
        );
    }

    return store;
}

export default configureStore;
