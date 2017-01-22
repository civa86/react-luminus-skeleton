import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as appActions from '../../actions/AppActions';

import Loader from '../../components/Loader';

class Info extends Component {

    componentDidMount () {
        const { dispatch } = this.props;
        dispatch(appActions.getInfo());
    }

    render () {
        const { app } = this.props;
        return (
            <section id="info">
                <h1>Application Info</h1>
                {
                    app.isFetching &&
                    <Loader/>
                }
                {
                    !app.isFetching &&
                    <pre>{JSON.stringify(app.info)}</pre>
                }
            </section>
        );
    }
}

function mapStateToProps (state) {
    return {
        app: state.app
    };
}

export default connect(mapStateToProps)(Info);
