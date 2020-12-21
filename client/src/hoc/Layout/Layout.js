import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

export class Layout extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="page_container">{this.props.children}</div>
        <Footer />
      </div>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
