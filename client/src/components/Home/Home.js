import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import HomeSlider from './HomeSlider';
import HomePromotion from './HomePromotion';
import CradsBlock from '../UI/CradsBlock/CradsBlock';


import {fetchProducts, getProductByArrival, getProductBySell} from '../../store/actions'

export class Home extends Component {

  componentDidMount() {
    this.props.onGetProductByArrival()
    this.props.onGetProductBySell()
  }

  render() {
    return (
      <div>
        <HomeSlider />
        <CradsBlock 
          list={this.props.products.bySell || []}
          title='Best Selling Guitars'
        />
        <HomePromotion />
        <CradsBlock 
          list={this.props.products.byArrival || []}
          title='New Arrivals'
        />
      </div>
    );
  }
}

const mapStateToProps = ({product}) => ({
  products : product
})

const mapDispatchToProps = (dispatch) => ({
  onGetProductByArrival : () => dispatch(getProductByArrival()),
  onGetProductBySell : () => dispatch(getProductBySell())
})


Home.propTypes = {
  products: PropTypes.object,
  onGetProductByArrival : PropTypes.func,
  onGetProductBySell : PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
