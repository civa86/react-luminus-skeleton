import React, { Component } from 'react';
import { connect } from 'react-redux';

class Profile extends Component {

    render () {
        return (
            <section id="profile">
                <h1>Profile</h1>
            </section>
        );
    }
}

function mapStateToProps (state) {
    return {
        user: state.user
    };
}

export default connect(mapStateToProps)(Profile);
