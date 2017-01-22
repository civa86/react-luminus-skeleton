import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './containers/App';

import NoMatch from './sections/Error/NoMatch';

import Home from './sections/Home';
import Info from './sections/Info';

export default (
    <Route>
        <Route path="/" component={App}>
            <IndexRoute component={Home}/>
            <Route path="/info" component={Info}/>
        </Route>
        <Route path="*" component={NoMatch}/>
    </Route>
);
