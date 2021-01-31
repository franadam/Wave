import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Dialog from '@material-ui/core/Dialog';

import { signup } from '../../../store/actions';

import { update, createFormToSubmit } from '../../../utils/formActions';

import { withRouter } from 'react-router-dom';
import FormField from '../../UI/Form/FormField';

export class Signup extends Component {
  state = {
    formError: false,
    formSuccess: false,
    formData: {
      firstname: {
        element: 'input',
        value: '',
        config: {
          name: 'firstname',
          type: 'text',
          placeholder: 'Enter your firstname',
        },
        valid: false,
        validationMessage: '',
        touched: false,
        validation: {
          required: true,
        },
      },
      lastname: {
        element: 'input',
        value: '',
        config: {
          name: 'lastname',
          type: 'text',
          placeholder: 'Enter your lastname',
        },
        valid: false,
        validationMessage: '',
        touched: false,
        validation: {
          required: true,
        },
      },
      email: {
        element: 'input',
        value: '',
        config: {
          name: 'email',
          type: 'email',
          placeholder: 'Enter your email',
        },
        valid: false,
        validationMessage: '',
        touched: false,
        validation: {
          required: true,
          email: true,
        },
      },
      password: {
        element: 'input',
        value: '',
        config: {
          name: 'password',
          type: 'password',
          placeholder: 'Enter your password',
        },
        valid: false,
        validationMessage: '',
        touched: false,
        validation: {
          required: true,
          minLength: [true, 8],
          hasUpperCase: true,
          hasLowerCase: true,
          hasSpecialChar: true,
          hasNumber: true,
        },
        score: 0,
      },
      password_confirmation: {
        element: 'input',
        value: '',
        config: {
          name: 'password_confirmation',
          type: 'password',
          placeholder: 'Confirm your password',
        },
        valid: false,
        validationMessage: '',
        touched: false,
        validation: {
          required: true,
          confirm: 'password',
        },
      },
    },
  };

  updateInput = (element) => {
    const newFormData = update(element, this.state.formData, 'signup');
    this.setState({ formError: false, formData: newFormData });
  };

  submitForm(event) {
    event.preventDefault();

    const [dataToSubmit, isValid] = createFormToSubmit(
      this.state.formData,
      'signup'
    );

    if (isValid) {
      setTimeout(() => {
        this.props.history.push('/signin');
      }, 3000);
      this.setState({
        formError: false,
        formSuccess: true,
      });
      this.props.onSingup(dataToSubmit);
    } else {
      this.setState({
        formSuccess: false,
        formError: true,
      });
    }
  }

  render() {
    return (
      <div className="page_wrapper">
        <div className="container">
          <div className="register_login_container">
            <div className="left">
              <form onSubmit={(event) => this.submitForm(event)}>
                <h2>Personal Information</h2>
                <div className="form_block_two">
                  <div className="block">
                    <FormField
                      change={(event) => this.updateInput(event)}
                      field={this.state.formData.firstname}
                      id={'firstname'}
                    />
                  </div>
                  <div className="block">
                    <FormField
                      change={(event) => this.updateInput(event)}
                      field={this.state.formData.lastname}
                      id={'lastname'}
                    />
                  </div>
                </div>
                <div className="block">
                  <FormField
                    change={(event) => this.updateInput(event)}
                    field={this.state.formData.email}
                    id={'email'}
                  />
                </div>
                <h2>Verify password</h2>
                <div className="form_block_two">
                  <div className="block">
                    <FormField
                      change={(event) => this.updateInput(event)}
                      field={this.state.formData.password}
                      id={'password'}
                    />
                  </div>
                  <div className="block">
                    <FormField
                      change={(event) => this.updateInput(event)}
                      field={this.state.formData.password_confirmation}
                      id={'password_confirmation'}
                    />
                  </div>
                </div>
                <div>
                  {this.state.formError ? (
                    <div className="error_label">Please check your data</div>
                  ) : null}
                  <button
                    type="submit"
                    onClick={(event) => this.submitForm(event)}
                  >
                    Signup
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <Dialog open={this.state.formSuccess}>
          <div className="dialog_alert">
            <div>Congratulation !!</div>
            <div>You will be redirected to SIGNIN in a couple of seconds</div>
          </div>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuth: state.user.loginSuccess,
});

const mapDispatchToProps = (dispatch) => ({
  onSingup: (credential) => dispatch(signup(credential)),
});

Signup.propTypes = {
  isAuth: PropTypes.bool,
  history: PropTypes.object,
  onSingup: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Signup));
