import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'

const links = [
  { name: 'My Dashboar', linkTo: '/user/dashboar' },
  { name: 'My Profile', linkTo: '/user/profile' },
  { name: 'My Basket', linkTo: '/user/basket' },
];

const admin = [
  { name: 'Site Info', linkTo: '/admin/site_info' },
  { name: 'Add Products', linkTo: '/admin/add_product' },
  { name: 'Manage categories', linkTo: '/admin/manage_categories' },
];

const UserLayout = (props) => {
  const generateLinks = (links) =>
    links.map((link) => (
      <Link key={link.linkTo} to={link.linkTo}>
        {link.name}
      </Link>
    ));

  return (
    <div className="container">
      <div className="user_container">
        <div className="user_left_nav">
          <h2>My Account</h2>
          <div className="links">{generateLinks(links)}</div>
          {
            props.user.info.isAdmin
            ? (
              <div>
          <h2>Admin</h2>
          <div className="links">{generateLinks(admin)}</div>
          </div>
            )
            : null
          }
        </div>
        <div className="user_right">{props.children}</div>
      </div>
    </div>
  );
};

UserLayout.propTypes = {
  children: PropTypes.node,
  user: PropTypes.object
};

const mapStateToProps = ({user}) => ({
  user
})

const mapDispatchToProps = ({
  
})

export default connect(mapStateToProps)(UserLayout);
