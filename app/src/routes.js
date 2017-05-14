import React from 'react'
import { Route, IndexRoute } from 'react-router'

import AuthenticationService from './services/Authentication';

import App from './containers/App';

import NoMatch from './sections/Error/NoMatch';
import Home from './sections/Home';
import Profile from './sections/Profile';

const auth = AuthenticationService();

export default (
    <Route>
        <Route path="/" component={App}>
            <IndexRoute component={Home}/>
            <Route path="profile" component={Profile} onEnter={auth.checkRouteAccess}/>
            <Route path="*" component={NoMatch}/>
        </Route>
    </Route>
);
