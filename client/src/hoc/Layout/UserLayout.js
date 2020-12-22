import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const links = [
  { name: 'My Dashboar', linkTo: '/user/dashboar' },
  { name: 'My Profile', linkTo: '/user/profile' },
  { name: 'My Basket', linkTo: '/user/basket' },
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
        </div>
        <div className="user_right">{props.children}</div>
      </div>
    </div>
  );
};

UserLayout.propTypes = {
  children: PropTypes.node,
};

export default UserLayout;
