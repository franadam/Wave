import React from 'react';
import PropTypes from 'prop-types';
import UserLayout from '../../hoc/Layout/UserLayout';
import Button from '../UI/Button/Button';

const Dashboard = ({ user }) => {
  return (
    <UserLayout>
      <div>
        <div className="user_nfo_panel">
          <h1>User Information</h1>
          <div>
            <span>{user.info.firstname}</span>
            <span>{user.info.lastname}</span>
            <span>{user.info.email}</span>
          </div>
          <Button type="default" title="Edit profile" linkTo="/user/profile" />
        </div>
        <div className="user_nfo_panel">
          <h1>History purchases</h1>
          <div className="user_product_block_wrapper">history</div>
        </div>
      </div>
    </UserLayout>
  );
};

Dashboard.propTypes = {
  user: PropTypes.object,
};

export default Dashboard;
