import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Button = (props) => {
  const buttons = () => {
    let template = '';
    switch (props.type) {
      case 'default':
        template = (
          <Link className="link_default" to={props.linkTo} {...props.addStyles}>
            {props.title}
          </Link>
        );
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
  addStyles: PropTypes.objectOf(PropTypes.string),
};

export default Button;
