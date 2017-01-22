import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from '../components/Header';
import Footer from '../components/Footer';

class App extends Component {

    render () {
        return (
            <div id="wrapper" className="container-fluid">
                <Header/>
                <div className="row">
                    <div className="col-xs-12">
                        <div className="container">
                            <div className="row">
                                <div className="col-xs-12">
                                    {this.props.children}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}

function mapStateToProps (state) {
    return {
        app: state.app
    };
}
export default connect(mapStateToProps)(App);
