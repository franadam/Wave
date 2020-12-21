import React from 'react';
import { FaCompass, FaPhone, FaEnvelope, FaClock } from 'react-icons/all';

const Footer = () => {
  return (
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
                  <div>Adress</div>
                  <div>NY</div>
                </div>
              </div>
              <div className="tag">
                <FaPhone className="icon" />
                <div className="nfo">
                  <div>Adress</div>
                  <div>NY</div>
                </div>
              </div>
              <div className="tag">
                <FaClock className="icon" />
                <div className="nfo">
                  <div>Working Hours</div>
                  <div>Mon-Sun/ 9am-8pm</div>
                </div>
              </div>
              <div className="tag">
                <FaEnvelope className="icon" />
                <div className="nfo">
                  <div>Email</div>
                  <div>info@waves.com</div>
                </div>
              </div>
            </div>
          </div>
          <div className="left">
            <h2>Be the first to know</h2>
            <div>
              <div>
                azertyuiop azertyuiop azertyuiop azertyuiop azertyuiop
                azertyuiop azertyuiop azertyuiop
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
