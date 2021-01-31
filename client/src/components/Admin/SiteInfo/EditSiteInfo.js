import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { fetchSiteInfo, editSiteInfo } from '../../../store/actions';

import { update, createFormToSubmit, createFormFields, populateFields } from '../../../utils/formActions';

import { withRouter } from 'react-router-dom';

export class EditSiteInfo extends Component {
  state = {
    formError: false,
    formSuccess: false,
    formData: {
      address: {
        element: 'input',
        value: '',
        config: {
          label: 'address',
          name: 'address',
          type: 'text',
          placeholder: 'Enter your address',
        },
        valid: false,
        validationMessage: '',
        touched: false,
        validation: {
          required: true,
        },
        showLabel: true,
      },
      hours: {
        element: 'input',
        value: '',
        config: {
          label: 'working hours',
          name: 'hours',
          type: 'text',
          placeholder: 'Enter your woking hours',
        },
        valid: false,
        validationMessage: '',
        touched: false,
        validation: {
          required: true,
        },
        showLabel: true,
      },
      phone: {
        element: 'input',
        value: '',
        config: {
          label: 'phone number',
          name: 'phone_number',
          type: 'text',
          placeholder: 'Enter your phone number',
        },
        valid: false,
        validationMessage: '',
        touched: false,
        validation: {
          required: true,
        },
        showLabel: true,
      },
      email: {
        element: 'input',
        value: '',
        config: {
          label: 'email',
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
        showLabel: true,
      },
    },
  };

  componentDidMount() {
    this.props.onFetchSiteInfo();
    const formData = populateFields(this.state.formData, this.props.site.info);
    this.setState({formData})
  }

  updateInput = (element) => {
    const newFormData = update(element, this.state.formData, 'edit_site_info');
    this.setState({ formError: false, formData: newFormData });
  };

  submitForm(event) {
    event.preventDefault();

    const [dataToSubmit, isValid] = createFormToSubmit(
      this.state.formData,
      'edit_site_info'
    );

    if (isValid) {
      setTimeout(() => {
        this.props.history.push('/user/dashboard');
      }, 3000);
      this.setState({
        formError: false,
        formSuccess: true,
      });
      this.props.onEditSiteInfo(dataToSubmit)
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
          {createFormFields(this.state.formData, this.updateInput)}

          {this.state.formSuccess ? (
            <div className="form_success">Success...</div>
          ) : null}

          {this.state.formError ? (
            <div className="error_label">Please check your data</div>
          ) : null}
          <button type="submit" onClick={(event) => this.submitForm(event)}>
            Update
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({site}) => ({
  site
})

const mapDispatchToProps = (dispatch) => ({
  onFetchSiteInfo: () => dispatch(fetchSiteInfo()),
  onEditSiteInfo: (credential) => dispatch(editSiteInfo(credential)),
});

EditSiteInfo.propTypes = {
  site: PropTypes.object,
  history: PropTypes.object,
  onFetchSiteInfo: PropTypes.func,
  onEditSiteInfo: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditSiteInfo))
