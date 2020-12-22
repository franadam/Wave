import React from 'react';
import PropTypes from 'prop-types';

const FormField = ({ field, id, change }) => {
  const renderTemplate = () => {
    let formTemplate = null;

    const showError = () => {
      const errorMessage = (
        <div className="error_label">
          {field.validation && !field.valid ? field.validationMessage : null}
        </div>
      );
      return errorMessage;
    };

    switch (field.element) {
      case 'input':
        formTemplate = (
          <div className="formBlock">
            <input
              {...field.config}
              value={field.value}
              onBlur={(event) => change({ event, id, blur: true })}
              onChange={(event) => change({ event, id })}
            />
            {showError()}
          </div>
        );
        break;

      default:
        formTemplate = null;
        break;
    }

    return formTemplate;
  };

  return <div>{renderTemplate()}</div>;
};

FormField.propTypes = {
  id: PropTypes.string,
  field: PropTypes.object,
  change: PropTypes.func,
};

export default FormField;
