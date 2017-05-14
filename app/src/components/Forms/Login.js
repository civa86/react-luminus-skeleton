import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';

const validate = values => {
    const errors = {};

    if (!values.username) {
        errors.username = 'Email non presente';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.username)) {
        errors.username = 'Email non valida';
    }
    if (!values.password) {
        errors.password = 'Password non presente';
    }

    return errors;
};

const renderField = ({ input, placeholder, type, meta: { touched, error } }) => (
    <div className={'form-group ' + ((touched && error) ? 'has-error' : '')}>
        <div className="row">
            <div className="col-xs-12">
                <input className="form-control"
                       type={type}
                       placeholder={placeholder}
                       {...input}/>
            </div>
        </div>
    </div>
);

class LoginForm extends Component {
    render () {
        const {
            handleSubmit,
            submitAction,
            submitting,
            state
        } = this.props;

        return (
            <form onSubmit={handleSubmit(submitAction)} noValidate>
                <Field
                    name="username"
                    type="email"
                    placeholder="Email"
                    component={renderField}
                />
                <Field
                    name="password"
                    type="password"
                    placeholder="Password"
                    component={renderField}
                />
                <div className="row">
                    <div className="col-xs-12">
                        {
                            state.error && !submitting &&
                            <div className="text-danger login-failed-error pull-left">
                                <i className="ion-alert"/> Email o password non validi
                            </div>
                        }
                        <button type="submit"
                                className="btn btn-primary pull-right"
                                disabled={submitting || state.isFetching}>
                            {
                                (submitting || state.isFetching) &&
                                <i className="login-btn-icon ion-load-c animation-spin"/>
                            }
                            {
                                !submitting && !state.isFetching &&
                                <i className="login-btn-icon ion-log-in"/>
                            }
                        </button>
                    </div>
                </div>
            </form>
        );
    }
}

export default reduxForm({
    form: 'login',
    validate
})(LoginForm);
