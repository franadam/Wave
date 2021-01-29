import React from 'react';
import PropTypes from 'prop-types';
import { FaCompass, FaPhone, FaEnvelope, FaClock } from 'react-icons/all';

const Footer = ({data}) => {
  return (
    Object.keys(data).length ?
    <footer className="bck_b_dark">
      <div className="container">
        <div className="logo">Waves</div>
        <div className="wrapper">
          <div className="left">
            <h2>Contact Information</h2>
            <div className="business_nfo">
              <div className="tag">
                <FaCompass className="icon" />
                <div className="nfo">
                  <div>Address</div>
                  <div>{data.info.address}</div>
                </div>
              </div>
              <div className="tag">
                <FaPhone className="icon" />
                <div className="nfo">
                  <div>Phone</div>
                  <div>{data.info.phone}</div>
                </div>
              </div>
              <div className="tag">
                <FaClock className="icon" />
                <div className="nfo">
                  <div>Working Hours</div>
                  <div>{data.info.hours}</div>
                </div>
              </div>
              <div className="tag">
                <FaEnvelope className="icon" />
                <div className="nfo">
                  <div>Email</div>
                  <div>{data.info.email}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="left">
            <h2>Be the first to know</h2>
            <div>
              <div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
    : null
  );
};

Footer.propTypes = {
  data : PropTypes.object
}

export default Footer;
