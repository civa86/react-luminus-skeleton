import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as fooActions from '../actions/FooActions';

class Home extends Component {

    componentDidMount () {
        const { dispatch } = this.props;
        dispatch(fooActions.getVersion());
    }

    render () {
        return (
            <section id="home">
                asd
            </section>
        );
    }
}

function mapStateToProps () {
    return {};
}

export default connect(mapStateToProps)(Home);
