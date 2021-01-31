import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { signin } from '../../../store/actions';

import {
  update,
  createFormFields,
  createFormToSubmit,
} from '../../../utils/formActions';

export class Signin extends Component {
  state = {
    formError: false,
    formSuccess: '',
    formData: {
      email: {
        element: 'input',
        value: '',
        config: {
          name: 'email',
          type: 'email',
          placeholder: 'Enter your email',
        },
        validation: {
          required: true,
          email: true,
        },
        valid: false,
        validationMessage: '',
        touched: false,
      },
      password: {
        element: 'input',
        value: '',
        config: {
          name: 'password',
          type: 'password',
          placeholder: 'Enter your password',
        },
        validation: {
          required: true,
          minLength: 8,
        },
        valid: false,
        validationMessage: '',
        touched: false,
      },
    },
  };

  updateInput = (element) => {
    const newFormData = update(element, this.state.formData, 'signin');
    this.setState({ formError: false, formData: newFormData });
  };

  submitForm(event) {
    event.preventDefault();

    const [dataToSubmit, isValid] = createFormToSubmit(
      this.state.formData,
      'signin'
    );

    if (isValid) {
      setTimeout(() => {
        this.props.history.push('/user/dashboard');
      }, 5000);
      this.setState({
        formError: false,
        formSuccess: true,
      });
      this.props.onSingin(dataToSubmit);
    } else {
      this.setState({
        formError: true,
      });
    }
  }

  render() {
    return (
      <div className="signin_wrapper">
        <form onSubmit={(event) => this.submitForm(event)}>
          {createFormFields(this.state.formData, this.updateInput)}

          {this.state.formSuccess ? (
            <div className="form_success">Success...</div>
          ) : null}

          {this.state.formError ? (
            <div className="error_label">Please check your data</div>
          ) : null}
          <button type="submit" onClick={(event) => this.submitForm(event)}>
            Signin
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuth: state.user.loginSuccess,
});

const mapDispatchToProps = (dispatch) => ({
  onSingin: (credential) => dispatch(signin(credential)),
});

Signin.propTypes = {
  isAuth: PropTypes.bool,
  history: PropTypes.object,
  onSingin: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Signin));
