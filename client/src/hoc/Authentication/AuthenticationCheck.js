import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CircularProgress from '@material-ui/core/CircularProgress';

import { fetchCurrentUser } from '../../store/actions';

export default function (Cpt, reload, adminRoute) {
  class AuthenticationCheck extends Component {
    state = {
      loading: true,
    };

    componentDidMount() {
      if (!Object.keys(this.props.user.info).length)
      this.props.fetchCurrentUser();
      if (!this.props.user.info.isAuth) {
        console.log('!this.props.user.info.isAuth');
        if (reload) {
          this.props.history.push('/auth');
        }
      } else {
        if (adminRoute && this.props.user.info.isAdmin) {
          console.log('adminRoute && this.props.user.info.isAdmin');
          this.props.history.push('/user/dashboard');
        } else {
          if (reload === false) {
            this.props.history.push('/');
          }
        }
      }
      this.setState({ loading: false });
    }

    render() {
      if (this.state.loading) {
        return (
          <div className="main_loader">
            <CircularProgress style={{ color: '#2196F3' }} thickness={7} />
          </div>
        );
      }
      return <Cpt {...this.props} user={this.props.user} />;
    }
  }

  const mapStateToProps = ({ user }) => ({
    user,
  });

  AuthenticationCheck.propTypes = {
    user: PropTypes.object,
    history: PropTypes.object,
    fetchCurrentUser: PropTypes.func,
  };

  return connect(mapStateToProps, { fetchCurrentUser })(AuthenticationCheck);
}
