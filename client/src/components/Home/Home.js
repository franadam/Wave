import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import HomeSlider from './HomeSlider';
import HomePromotion from './HomePromotion';
import CradsBlock from '../UI/CradsBlock/CradsBlock';


import {fetchGuitars} from '../../store/actions'
import { objectToArray } from '../../utils/objectTransorm';

export class Home extends Component {

  componentDidMount() {
    this.props.onFetchGuitars()
  }

  getGuitarsByArrival = (guitars) => {
    const sortedGuitars = objectToArray(guitars);
    sortedGuitars.sort((a,b) => new Date(a.createdAt) > new Date(b.createdAt));
    return sortedGuitars;
  }

  getGuitarsBySell = (guitars) => {
    const sortedGuitars = objectToArray(guitars);
    sortedGuitars.sort((a,b) => a.sold < b.sold);
    return sortedGuitars;
  }
  
  render() {
    const {guitars} = this.props.products;
    return (
      <div>
        <HomeSlider />
        <CradsBlock 
          list={this.getGuitarsBySell(guitars)}
          title='Best Selling Guitars'
        />
        <HomePromotion />
        <CradsBlock 
          list={this.getGuitarsByArrival(guitars)}
          title='New Arrivals'
        />
      </div>
    );
  }
}

const mapStateToProps = ({product}) => ({
  products : product
})

const mapDispatchToProps = dispatch => ({
  onFetchGuitars: () => dispatch(fetchGuitars())
})

Home.propTypes = {
  products: PropTypes.object,
  onFetchGuitars : PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
