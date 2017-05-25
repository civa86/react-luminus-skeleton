import React, { Component } from 'react';
import { connect } from 'react-redux';

import FileUploadForm from '../components/Forms/FileUpload';

const submit = (values) => {
    console.log(values);
};

class Home extends Component {

    render () {
        return (
            <section id="home">
                <h1>Home Page</h1>
                <FileUploadForm submitAction={submit}
                                acceptedTypes="zip,less"
                                fieldName="testfile"/>
            </section>
        );
    }
}

function mapStateToProps () {
    return {};
}

export default connect(mapStateToProps)(Home);
