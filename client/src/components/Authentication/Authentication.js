import React from 'react';
import Signin from './Signin/Signin';
import Button from '../UI/Button/Button';

const Authentication = () => {
  return (
    <div className="page_wrapper">
      <div className="container">
        <div className="register_login_container">
          <div className="left">
            <h1>New Customer</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <Button
              type="default"
              title="create an account"
              linkTo="/signup"
              addStyles={{
                margin: '10px 0 0 0',
              }}
            />
          </div>
          <div className="right">
            <h2>registered Customer</h2>
            <p>If you have a account please login</p>
            <Signin />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authentication;
