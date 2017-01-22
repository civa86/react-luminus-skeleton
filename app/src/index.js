import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { AppContainer } from 'react-hot-loader';
import configureStore from './store/configureStore';
import Root from './containers/Root';

/* STYLES */

// Bootstrap
import 'bootstrap/dist/css/bootstrap.css';
import 'imports?jQuery=jquery!bootstrap/dist/js/bootstrap';

// Ionicons
import 'ionicons/css/ionicons.css';

// Application Style
import '../less/screen.less';

/* ASSETS */

// Text Files: humans, robot
import '../humans.txt';
import '../robots.txt';

// favicon

const
    store = configureStore(),
    history = syncHistoryWithStore(browserHistory, store);

render(
    <AppContainer>
        <Root store={store} history={history}/>
    </AppContainer>,
    document.getElementById('root')
);

if (module.hot) {
    module.hot.accept('./containers/Root', () => {
        const RootContainer = require('./containers/Root').default;
        render(
            <AppContainer key={Math.random()}>
                <RootContainer store={store} history={history}/>
            </AppContainer>,
            document.getElementById('root')
        );
    });
}
