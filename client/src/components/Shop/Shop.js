import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import ShopHeader from './ShopHeader'
import CollapseCheckbox from '../UI/CollapseCheckbox/CollapseCheckbox'

import {fetchBrands, fetchWoods} from '../../store/actions'
import { frests, prices } from '../../utils/filterCategories'
import CollapseRadio from '../UI/CollapseRadio/CollapseRadio'

export class Shop extends Component {
  state = {
    grid: '',
    limit: 10,
    skip: 0,
    filters : {
      brands : [],
      woods: [],
      prices: [],
      frets: []
    }
  } 

  componentDidMount() {
    this.props.onFetchBrands()
    this.props.onFetchWoods()
  }

  priceHandler = (value) => {
    const data = [...prices]
    let array = []
    for(let key in data) {
      if (data[key]._id === parseInt(value, 10)) {
        array = data[key].array
      }
    }
    return array
  }

  handleFilter = (filters, category) => {
    const newFilters = {...this.state.filters}
    newFilters[category] = filters;

    if (category === 'prices') {
      let priceValues = this.priceHandler(filters)
      newFilters[category] = priceValues;
  }

    this.setState({
      filters: newFilters
    })
  }

  render() {
    console.log('this.state.filters :>> ', this.state.filters);
    const products = this.props.products
    return (
      <div>
        <ShopHeader 
          title="Browse Product"
        />
        <div className="container">
          <div className="shop_wrapper">
            <div className="left">
            <CollapseCheckbox 
              initState={true}
              title='Brands'
              list={products.brands}
              handleFilter= {(filter) => this.handleFilter(filter, 'brands')}
            />
            <CollapseCheckbox 
              initState={false}
              title='Frets'
              list={frests}
              handleFilter= {(filter) => this.handleFilter(filter, 'frets')}
            />
            <CollapseCheckbox 
              initState={false}
              title='Woods'
              list={products.woods}
              handleFilter= {(filter) => this.handleFilter(filter, 'woods')}
            />
            <CollapseRadio 
              initState={false}
              title='Prices'
              list={prices}
              handleFilter= {(filter) => this.handleFilter(filter, 'prices')}
              />
            </div>
            <div className="right">R</div>
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
  onFetchWoods : () => dispatch(fetchWoods())
})

Shop.propTypes = {
  products: PropTypes.object,
  onFetchBrands: PropTypes.func,
  onFetchWoods: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(Shop)
