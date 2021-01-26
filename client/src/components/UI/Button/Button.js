import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {FaShoppingCart} from 'react-icons/all';

const Button = (props) => {
  const buttons = () => {
    let template = '';
    switch (props.type) {
      case 'default':
        template = (
          <Link className={!props.altClass ? "link_default" : props.altClass} to={props.linkTo} {...props.addStyles}>
            {props.title}
          </Link>
        );
        break;
      case 'bag_link':
        template = <div className="bag_link"
        onClick={() => props.runAction()}
        >
              <FaShoppingCart />

        </div>
        break;
      case 'add_to_cart_link':
        template = (
          <div 
            className="add_to_cart_link"
            onClick={() => props.runAction()}
          >
            <FaShoppingCart />
            Add to Basket
          </div>
        )
        break;
      default:
        template = '';
        break;
    }
    return template;
  };

  return <div className="my_link">{buttons()}</div>;
};

Button.propTypes = {
  type: PropTypes.string,
  linkTo: PropTypes.string,
  title: PropTypes.string,
  altClass: PropTypes.string,
  addStyles: PropTypes.objectOf(PropTypes.string),
  runAction: PropTypes.func
};

export default Button;
