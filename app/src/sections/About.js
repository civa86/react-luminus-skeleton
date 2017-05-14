import React, { Component } from 'react';
import { connect } from 'react-redux';

class About extends Component {

    render () {
        return (
            <section id="home">
                <h1>About</h1>
                <p>
                    just a public section
                </p>
            </section>
        );
    }
}

function mapStateToProps () {
    return {};
}

export default connect(mapStateToProps)(About);
