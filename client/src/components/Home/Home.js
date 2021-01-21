import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import HomeSlider from './HomeSlider';
import HomePromotion from './HomePromotion';
import CradsBlock from '../UI/CradsBlock/CradsBlock';


import {getGuitarsByArrival, getGuitarsBySell} from '../../store/actions'

export class Home extends Component {

  componentDidMount() {
    this.props.onGetGuitarsByArrival()
    this.props.onGetGuitarsBySell()
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
  onGetGuitarsByArrival : () => dispatch(getGuitarsByArrival()),
  onGetGuitarsBySell : () => dispatch(getGuitarsBySell())
})


Home.propTypes = {
  products: PropTypes.object,
  onGetGuitarsByArrival : PropTypes.func,
  onGetGuitarsBySell : PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
