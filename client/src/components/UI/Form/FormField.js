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
            {
              field.showLabel
              ? <div className="label_inputs">{field.config.label.toUpperCase()}</div>
              : null
            }
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

        case 'textarea':
          formTemplate = (
            <div className="formBlock">
              {
                field.showLabel
                ? <div className="label_inputs">{field.config.label.toUpperCase()}</div>
                : null
              }
              <textarea
                {...field.config}
                value={field.value}
                onBlur={(event) => change({ event, id, blur: true })}
                onChange={(event) => change({ event, id })}
              />
              {showError()}
            </div>
          );
          break

          case 'select':
            formTemplate = (
              <div className="formBlock">
                {
                  field.showLabel
                  ? <div className="label_inputs">{field.config.label.toUpperCase()}</div>
                  : null
                }
                <select
                  value={field.value}
                  onBlur={(event) => change({ event, id, blur: true })}
                  onChange={(event) => change({ event, id })}
                >
                  <option value="">Select One</option>
                  {
                    field.config.options.map(option => (
                      <option key={option.key} value={option.key}>
                        {option.value}
                      </option>
                    ))
                  }
                </select>
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
