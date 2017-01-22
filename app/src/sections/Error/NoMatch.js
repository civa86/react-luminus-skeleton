import React, { Component } from 'react';
import { connect } from 'react-redux';

class NoMatch extends Component {
    render () {
        return (
            <section id="no-match" className="error-page">
                <h1>404</h1>
                <div className="error-txt">
                    Page Not Found
                </div>
            </section>
        );
    }
}

function mapStateToProps () {
    return {};
}

export default connect(mapStateToProps)(NoMatch);
