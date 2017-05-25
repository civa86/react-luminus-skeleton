import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';

const validate = (value, accepted) => {
    if (!value || value.length !== 1) {
        return 'File not attached';
    }

    if (
        value.length === 1 &&
        value[0].length === 1 &&
        value[0][0].name &&
        accepted.split(',')
                .map(e => e.trim())
                .indexOf(value[0][0].name.split('.').pop()) === -1
    ) {
        return 'Type not Accepted. Upload only: ' + accepted.split(',').map(e => e.trim()).join(', ');
    }
};

const setValue = (e, input) => {
    const files = [ ...e.target.files ];
    e.preventDefault();
    input.onChange(files);
};

const renderField = ({ input, placeholder, type, meta: { touched, error } }) => (
    <div className={'form-group ' + ((touched && error) ? 'has-error' : '')}>
        <div className="row">
            <div className="col-xs-12">
                <input className="form-control"
                       type={type}
                       onChange={e => setValue(e, input)}
                />
                {error}
            </div>
        </div>
    </div>
);

class FileUploadForm extends Component {
    render () {
        const {
            acceptedTypes,
            handleSubmit,
            submitAction,
            submitting,
        } = this.props;

        return (
            <form onSubmit={handleSubmit(submitAction)} noValidate>
                <Field
                    name="file"
                    type="file"
                    component={renderField}
                    validate={value => validate(value, acceptedTypes)}
                />
                <div className="row">
                    <div className="col-xs-12">
                        <button type="submit" className="btn btn-primary" disabled={submitting}>
                            Upload
                        </button>
                    </div>
                </div>
            </form>
        );
    }
}

FileUploadForm.propTypes = {
    acceptedTypes: PropTypes.string.isRequired
};

export default reduxForm({
    form: 'file-upload'
})(FileUploadForm);
