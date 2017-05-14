import React, { Component } from 'react';
import { connect } from 'react-redux';

class Home extends Component {

    render () {
        return (
            <section id="home">
                <h1>Home Page</h1>
                <p>
                    static home page text
                </p>
            </section>
        );
    }
}

function mapStateToProps () {
    return {};
}

export default connect(mapStateToProps)(Home);
