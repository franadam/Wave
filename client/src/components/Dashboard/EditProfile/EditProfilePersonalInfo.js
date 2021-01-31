import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { editUser } from '../../../store/actions';

import { update, createFormToSubmit, populateFields } from '../../../utils/formActions';

import { withRouter } from 'react-router-dom';
import FormField from '../../UI/Form/FormField';

export class EditProfilePersonalInfo extends Component {
  state ={
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
    }
  } 

  componentDidMount() {
    const formData = populateFields(this.state.formData, this.props.user.info);
    this.setState({formData})
  }

  updateInput = (element) => {
    const newFormData = update(element, this.state.formData, 'edit_profile');
    this.setState({ formError: false, formData: newFormData });
  };

  submitForm(event) {
    event.preventDefault();

    const [dataToSubmit, isValid] = createFormToSubmit(
      this.state.formData,
      'edit_profile'
    );

    if (isValid) {
      setTimeout(() => {
        this.props.history.push('/user/dashboard');
      }, 3000);
      this.setState({
        formError: false,
        formSuccess: true,
      });
      this.props.onEditUser(dataToSubmit)
    } else {
      this.setState({
        formSuccess: false,
        formError: true,
      });
    }
  }
  render() {
    return (
      <div>
        <form onSubmit={(event) => this.submitForm(event)}>
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
                

          {this.state.formSuccess ? (
            <div className="form_success">Success...</div>
          ) : null}

          {this.state.formError ? (
            <div className="error_label">Please check your data</div>
          ) : null}
          <button type="submit" onClick={(event) => this.submitForm(event)}>
            Edit
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({user}) => ({
  user
})

const mapDispatchToProps = (dispatch) => ({
  onEditUser: (credential) => dispatch(editUser(credential)),
});

EditProfilePersonalInfo.propTypes = {
  isAuth: PropTypes.bool,
  user: PropTypes.object,
  history: PropTypes.object,
  onEditUser: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditProfilePersonalInfo))
