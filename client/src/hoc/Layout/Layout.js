import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/UI/Header/Header';
import Footer from '../../components/UI/Footer/Footer';

import { connect } from 'react-redux'
import { fetchSiteInfo } from '../../store/actions';

export class Layout extends Component {

  componentDidMount() {
    if(!Object.keys(this.props.site).length) {
      this.props.onFetchSiteInfo()
      console.log('Layout props', this.props.site.info)
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div className="page_container">{this.props.children}</div>
        <Footer 
          data={this.props.site}
        />
      </div>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.node,
  site: PropTypes.object,
  onFetchSiteInfo: PropTypes.func,
};

const mapStateToProps = ({site}) => ({
  site
})

const mapDispatchToProps = (dispatch) => ({
  onFetchSiteInfo: () => dispatch(fetchSiteInfo()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
