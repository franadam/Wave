import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

import { logout } from '../../store/actions';

export class Header extends Component {
  state = {
    page: [
      {
        name: 'Home',
        linkTo: '/home',
        public: true,
      },
      {
        name: 'Guitars',
        linkTo: '/shop',
        public: true,
      },
    ],
    user: [
      {
        name: 'My Basket',
        linkTo: '/user/basket',
        public: false,
      },
      {
        name: 'My Dashboard',
        linkTo: '/user/dashboard',
        public: false,
      },
      {
        name: 'Signin',
        linkTo: '/auth',
        public: true,
      },
      {
        name: 'Logout',
        linkTo: '/user/logout',
        public: false,
      },
    ],
  };

  logoutHandler = () => {
    const { onLogout, logout, history } = this.props;
    onLogout();
    console.log('this.props :>> ', this.props);
    if (logout) {
      history.push('/');
    }
  };

  defaultLink = (link) =>
    link.name === 'Logout' ? (
      <div
        className="log_out_link"
        key={link.linkTo}
        onClick={this.logoutHandler}
      >
        {link.name}
      </div>
    ) : (
      <Link key={link.linkTo} to={link.linkTo}>
        {link.name}
      </Link>
    );

  basketLink(link) {
    const info = this.props.user.info;
    return (
      <div className="cart_link" key={link.linkTo}>
        <span>{info.basket ? info.basket.length : 0}</span>
        <Link to={link.linkTo}>{link.name}</Link>
      </div>
    );
  }

  showLinks(type) {
    const links = [];
    if (this.props.user.info) {
      type.forEach((link) => {
        if (!this.props.user.info.isAuth) {
          if (link.public) {
            links.push(link);
          }
        } else {
          if (link.name !== 'Signin') {
            links.push(link);
          }
        }
      });
    }
    return links.map((a) => {
      if (a.name !== 'My Basket') {
        return this.defaultLink(a);
      } else {
        return this.basketLink(a);
      }
    });
  }

  render() {
    const { user, page } = this.state;
    return (
      <header className="bck_b_light">
        <div className="container">
          <div className="left">
            <div className="logo">Waves</div>
          </div>
          <div className="right">
            <div className="top">{this.showLinks(user)}</div>
            <div className="bottom">{this.showLinks(page)}</div>
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  user,
});

const mapDispatchToProps = (dispatch) => ({
  onLogout: () => dispatch(logout()),
});

Header.propTypes = {
  user: PropTypes.object,
  logout: PropTypes.bool,
  history: PropTypes.object,
  onLogout: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
