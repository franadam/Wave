import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {fetchBrands, addBrand} from '../../../store/actions';
import { objectToArray } from '../../../utils/objectTransorm';

import {
  update,
  createFormFields,
  createFormToSubmit,
  resetFields
} from '../../../utils/formActions';

export class ManageBrands extends Component {

  state= {
    formError: false,
    formSuccess: false,
    formData: {
      name: {
        element: 'input',
        value: '',
        config: {
          name: 'name',
          type: 'text',
          placeholder: 'Enter the wood',
        },
        valid: false,
        validationMessage: '',
        touched: false,
        validation: {
          required: true,
        },
      },}
  }
  
  componentDidMount() {
    this.props.onFetchBrands();
  }

  showCategoryItems = () => {
    const {brands} = this.props.products;
    return( 
      brands 
      ? objectToArray(brands).map(brand => <div key={brand._id} className="category_item" >
        {brand.name}
      </div>)
      : null
    )
  }
  
  updateInput = (element) => {
    const newFormData = update(element, this.state.formData, 'manage_brand');
    this.setState({ formError: false, formData: newFormData });
  };

  submitForm(event) {
    event.preventDefault();

    const [dataToSubmit, isValid] = createFormToSubmit(
      this.state.formData,
      'manage_brand'
    );

    if (isValid) {
      this.props.onAddBrand(dataToSubmit);
      //this.props.history.push('/user/dashboard');
      console.log('manage Brand :>> ', dataToSubmit);
      const newFormData = resetFields(this.state.formData, 'brand')
      this.setState({
        formData: newFormData,
        formSuccess: true,
      });
      setTimeout(() => {
        this.setState({
          formSuccess: false,
        });        
      },  2000);
    } else {
      this.setState({
        formError: true,
      });
    }
  }

  render() {
    return (
      <div className="admin_category_wrapper" >
        <h1>Brands</h1>
        <div className="admin_two_column">
          <div className="left">
            <div className="brands_container">
              {this.showCategoryItems()}
            </div>
          </div>
          <div className="right">
          <form onSubmit={(event) => this.submitForm(event)}>
            {createFormFields(this.state.formData, this.updateInput)}

            {
              this.state.formSuccess
              ? <div className="form_success">
                Success...
              </div>
              : null
            }

          {this.state.formError ? (
            <div className="error_label">Please check your data</div>
          ) : null}
          <button type="submit" onClick={(event) => this.submitForm(event)}>
            Add Brand
          </button>
            
          </form>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({product}) => ({
  products: product
})

const mapDispatchToProps = (dispatch) => ({
  onFetchBrands : () => dispatch(fetchBrands()), 
  onAddBrand : (brand) => dispatch(addBrand(brand)),
})

ManageBrands.propTypes = {
  products: PropTypes.object,
  onFetchBrands: PropTypes.func,
  onAddBrand: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageBrands)
