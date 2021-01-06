import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HomeSlider from './HomeSlider';
import HomePromotion from './HomePromotion';

export class Home extends Component {
  render() {
    return (
      <div>
        <HomeSlider />
        <HomePromotion />
      </div>
    );
  }
}

Home.propTypes = {};

export default Home;
