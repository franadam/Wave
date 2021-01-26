import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import UserLayout from '../../../hoc/Layout/UserLayout'
import FileUpload from '../../UI/Form/FileUpload';

import {fetchBrands, fetchWoods, addGuitar, clearGuitar} from '../../../store/actions';
import { objectToArray } from '../../../utils/objectTransorm';

import {
  update,
  createFormFields,
  createFormToSubmit,
  populateOptionsField,
  resetFields
} from '../../../utils/formActions';

export class AddProduct extends Component {
  state= {
    formError: false,
    formSuccess: false,
    formData: {
      name: {
        element: 'input',
        value: '',
        config: {
          label: 'product name',
          name: 'name',
          type: 'text',
          placeholder: 'Enter your name',
        },
        valid: false,
        validationMessage: '',
        touched: false,
        showLabel: true,
        validation: {
          required: true,
        },
      },
      description: {
        element: 'textarea',
        value: '',
        config: {
          label: 'product description',
          name: 'description',
          type: 'text',
          placeholder: 'Enter your description',
          style: {'height':'5rem'}
        },
        valid: false,
        validationMessage: '',
        touched: false,
        showLabel: true,
        validation: {
          required: true,
        },
      },
      price: {
        element: 'input',
        value: '',
        config: {
          label: 'product price',
          name: 'price',
          type: 'number',
          placeholder: 'Enter your price',
        },
        valid: false,
        validationMessage: '',
        touched: false,
        showLabel: true,
        validation: {
          required: true,
        },
      },
      brand: {
        element: 'select',
        value: '',
        config: {
          label: 'product brand',
          name: 'brand',
          options: []
        },
        valid: false,
        validationMessage: '',
        touched: false,
        showLabel: true,
        validation: {
          required: true,
        },
      },
      shipping: {
        element: 'select',
        value: '',
        config: {
          label: 'shipping',
          name: 'shipping',
          options: [
            {key:true, value:'Yes'},
            {key:false, value:'No'},
          ]
        },
        valid: false,
        validationMessage: '',
        touched: false,
        showLabel: true,
        validation: {
          required: true,
        },
      },
      available: {
        element: 'select',
        value: '',
        config: {
          label: 'available in stock',
          name: 'available',
          options: [
            {key:true, value:'Yes'},
            {key:false, value:'No'},
          ]
        },
        valid: false,
        validationMessage: '',
        touched: false,
        showLabel: true,
        validation: {
          required: true,
        },
      },
      wood: {
        element: 'select',
        value: '',
        config: {
          label: 'wood material',
          name: 'wood',
          options: [
          ]
        },
        valid: false,
        validationMessage: '',
        touched: false,
        showLabel: true,
        validation: {
          required: true,
        },
      },
      frets: {
        element: 'select',
        value: '',
        config: {
          label: 'frets',
          name: 'frets',
          options: [
            {key:20, value:20},
            {key:21, value:21},
            {key:22, value:22},
            {key:24, value:24},
          ]
        },
        valid: false,
        validationMessage: '',
        touched: false,
        showLabel: true,
        validation: {
          required: true,
        },
      },
      publish: {
        element: 'select',
        value: '',
        config: {
          label: 'publish in stock',
          name: 'publish',
          options: [
            {key:true, value:'Public'},
            {key:false, value:'Hidden'},
          ]
        },
        valid: false,
        validationMessage: '',
        touched: false,
        showLabel: true,
        validation: {
          required: true,
        },
      },
      images: {
        value: [],
        valid: true,
        validationMessage: '',
        touched: false,
        showLabel: false,
        validation: {
          required: false,
        },
      }
    }
  }

  componentDidMount() {
    this.props.onFetchBrands();
    this.props.onFetchWoods();
    setTimeout(() => {
      const {formData} = this.state;
      const {brands, woods} = this.props.products
      let newFormData = populateOptionsField(formData, objectToArray(brands) , 'brand')
      newFormData = populateOptionsField(formData, objectToArray(woods) , 'wood')
      this.setState({ formData: newFormData });
  }, 1000);
  }

  updateInput = (element) => {
    const newFormData = update(element, this.state.formData, 'add_product');
    this.setState({ formError: false, formData: newFormData });
  };

  submitForm(event) {
    event.preventDefault();

    const [dataToSubmit, isValid] = createFormToSubmit(
      this.state.formData,
      'add_product'
    );
    console.log('add Product :>> ', dataToSubmit);

    if (isValid) {
      this.props.onAddGuitar(dataToSubmit);
      //this.props.history.push('/user/dashboard');
      console.log('add Product :>> ', dataToSubmit);
      const newFormData = resetFields(this.state.formData, 'product')
      this.setState({
        formData: newFormData,
        formSuccess: true,
      });
      setTimeout(() => {
        this.setState({
          formSuccess: false,
        });        
        this.props.onClearGuitar()
      },  2000);
    } else {
      this.setState({
        formError: true,
      });
    }
  }

  imageHandler = (images) => {
    console.log('images :>> ', images);
    const formData = {...this.state.formData}
    formData.images.value = images
    formData.images.valid = true
    this.setState({
      formData
    })
  }

  render() {
    const {images, ...formData} = this.state.formData 
    return (
      <UserLayout>
        <div>
          <h1>Add Product</h1>
          <form onSubmit={(event) => this.submitForm(event)}>
          
            <FileUpload 
              imageHandler={(images) => this.imageHandler(images)}
              reset={this.state.formSuccess}
            />
            {createFormFields(formData, this.updateInput)}

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
            Add Product
          </button>
            
          </form>
        </div>
      </UserLayout>
    )
  }
}

const mapStateToProps = ({product}) => ({
  products: product
})

const mapDispatchToProps = (dispatch) => ({
  onFetchBrands : () => dispatch(fetchBrands()), 
  onFetchWoods : () => dispatch(fetchWoods()),
  onClearGuitar : () => dispatch(clearGuitar()),
  onAddGuitar : (guitar) => dispatch(addGuitar(guitar)),
})

AddProduct.propTypes = {
  products: PropTypes.object,
  onFetchBrands: PropTypes.func,
  onFetchWoods: PropTypes.func,
  onAddGuitar: PropTypes.func,
  onClearGuitar: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct)
