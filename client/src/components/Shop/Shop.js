import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import ShopHeader from './ShopHeader'
import CollapseCheckbox from '../UI/CollapseCheckbox/CollapseCheckbox'

import {fetchBrands, fetchWoods, purchaseGuitars} from '../../store/actions'
import { frests, price } from '../../utils/filterCategories'
import CollapseRadio from '../UI/CollapseRadio/CollapseRadio'
import LoadMoreCards from './LoadMoreCards';
import { FaBars, FaTh } from 'react-icons/fa'

export class Shop extends Component {
  state = {
    grid: '',
    limit: 6,
    skip: 0,
    filters : {
      brand : [],
      wood: [],
      price: [],
      frets: []
    }
  } 

  componentDidMount() {
    this.props.onFetchBrands()
    this.props.onFetchWoods()
    const {skip, limit, filters} = this.state;
    this.props.onPurchaseGuitars(skip, limit, filters)
  }

  priceHandler = (value) => {
    const data = [...price]
    let array = []
    for(let key in data) {
      if (data[key]._id === parseInt(value, 10)) {
        array = data[key].array
      }
    }
    return array
  }

  showFilteredResults = (filters) => {
    this.props.onPurchaseGuitars(0, this.state.limit, filters)
  }

  handleFilter = (filters, category) => {
    const newFilters = {...this.state.filters}
    newFilters[category] = filters;

    if (category === 'price') {
      let priceValues = this.priceHandler(filters)
      newFilters[category] = priceValues;
    }
  
    this.showFilteredResults(newFilters);

    this.setState({
      filters: newFilters
    })
  }

  loadMoreCards = () => {
    let {skip, limit, filters} = this.state;
    skip += limit ;
    this.props.onPurchaseGuitars(skip, limit, filters, this.props.products.toShop)

    this.setState({skip})
  }

  gridHandler = () => {
    this.setState(prevState => ({
      grid: !prevState.grid ? 'grid_bars' : ''
  }));
  }

  render() {
    const products = this.props.products;
    const {grid, skip, limit} = this.state;
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
              handleFilter= {(filter) => this.handleFilter(filter, 'brand')}
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
              handleFilter= {(filter) => this.handleFilter(filter, 'wood')}
            />
            <CollapseRadio 
              initState={false}
              title='Prices'
              list={price}
              handleFilter= {(filter) => this.handleFilter(filter, 'price')}
              />
            </div>
            <div className="right">
              <div className="shop_options">
                <div className="shop_grids clear">
                  <div className={`grid_btn ${grid? '': 'active'}`}
                  onClick={() => this.gridHandler()}>
                    <FaTh />
                  </div>
                  <div className={`grid_btn ${!grid? '': 'active'}`}
                  onClick={() => this.gridHandler()}>
                    <FaBars />
                  </div>
                </div>
              </div>
              <div>
                <LoadMoreCards
                  grid={grid}
                  skip= {skip}
                  limit={limit}
                  list={products.toShop || []}
                  size={products.toShopSize || 0}
                  loadMore={() => this.loadMoreCards()}
                />
              </div>
            </div>
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
  onFetchWoods : () => dispatch(fetchWoods()),
  onPurchaseGuitars : (skip, limit, filters, prevState) => dispatch(purchaseGuitars(skip, limit, filters, prevState))
})

Shop.propTypes = {
  products: PropTypes.object,
  onFetchBrands: PropTypes.func,
  onFetchWoods: PropTypes.func,
  onPurchaseGuitars: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(Shop)
