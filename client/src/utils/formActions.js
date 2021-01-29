import React from 'react';
import validator from 'validator';
import FormField from '../components/UI/Form/FormField';

export const validate = (element, formData) => {
  let error = [true, ''];

  if (element.validation.email) {
    const valid = validator.isEmail(element.value),
      message = `${!valid ? 'Please enter a valid email' : ''}`;
    error = !valid ? [valid, message] : error;
  }

  if (element.validation.required) {
    const valid = element.value.trim() !== '',
      message = `${
        !valid
          ? `The ${element.config.name.split('_').join(' ')} field is required`
          : ''
      }`;
    error = !valid ? [valid, message] : error;
  }

  if (element.config.name === 'paassword') {
    let message, valid;

    const value = element.value.trim(),
      {
        minLength,
        hasUpperCase,
        hasLowerCase,
        hasSpecialChar,
        hasNumber,
      } = element.validation;
    if (minLength[0]) {
      valid = value.length >= minLength[1];
      console.log('minLength', valid);
      message = `${
        !valid
          ? `${element.config.name} must have at least ${minLength[1]} caracters`
          : ''
      }`;
      error = !valid ? [valid, message] : error;
    }
    if (hasUpperCase) {
      const upperCaseLetters = /[A-Z]/g;
      valid = upperCaseLetters.test(value);
      console.log('hasUpperCase :>> ', valid);
      message = `${
        !valid
          ? `${element.config.name} must contain at least 1 uppercase  caracters`
          : ''
      }`;
      error = !valid ? [valid, message] : error;
    }
    if (hasLowerCase) {
      const lowerCaseLetters = /[a-z]/g;
      valid = lowerCaseLetters.test(value);
      console.log('hasLowerCase :>> ', valid);
      message = `${
        !valid
          ? `${element.config.name} must contain at least 1 lowercase  caracters`
          : ''
      }`;
      error = !valid ? [valid, message] : error;
    }
    if (hasSpecialChar) {
      const specialCharacters = /\W/g;
      valid = specialCharacters.test(value);
      console.log('hasSpecialChar :>> ', valid);
      message = `${
        !valid
          ? `${element.config.name} must contain at least 1 special  caracters`
          : ''
      }`;
      error = !valid ? [valid, message] : error;
    }
    if (hasNumber) {
      const numbers = /[0-9]/g;
      valid = numbers.test(value);
      console.log('hasNumber', valid);
      message = `${
        !valid ? `${element.config.name} must contain at least 1 number` : ''
      }`;
      error = !valid ? [valid, message] : error;
    }
  }

  if (element.validation.confirm) {
    const valid =
      element.value.trim() === formData[element.validation.confirm].value;
    const message = `${!valid ? 'The passwords must be identical' : ''}`;
    error = !valid ? [valid, message] : error;
  }

  return error;
};

export const update = (element, formData, formName) => {
  const newFormData = { ...formData };
  const newElement = { ...newFormData[element.id] };

  newElement.value = element.event.currentTarget.value;

  if (element.blur) {
    const [valid, validationMessage] = validate(newElement, formData);
    newElement.valid = valid;
    newElement.validationMessage = validationMessage;
  }

  newElement.blur = element.blur;

  newFormData[element.id] = newElement;

  return newFormData;
};

export const createFormFields = (formData, change) => {
  const formElementsArray = [];
  for (const key in formData) {
    formElementsArray.push({
      id: key,
      field: formData[key],
    });
  }
  return formElementsArray.map((elem) => (
    <FormField
      key={elem.id}
      change={(event) => change(event)}
      field={elem.field}
      id={elem.id}
    />
  ));
};

export const createFormToSubmit = (formData, formName) => {
  const dataToSubmit = {};
  let isValid = true;

  for (const key in formData) {
    if (key !== 'password_confirmation') {
      dataToSubmit[key] = formData[key].value;
      isValid = isValid && formData[key].valid;
    }
  }
  return [dataToSubmit, isValid];
};

export const showPassword = () => {
  const x = document.getElementById('password');
  if (x.type === 'password') {
    x.type = 'text';
  } else {
    x.type = 'password';
  }
};

export const populateOptionsField = (formData, array=[], field) => {
  const newFormData = {...formData};
  const newArray = array.map(item => ({key:item._id, value:item.name}));
  newFormData[field].config.options = newArray;
  return newFormData;
}

export const populateFields = (formData, fieldsValue) => {
  const newFormData = {...formData};

  for (let key in newFormData) {
    newFormData[key].value = fieldsValue[key];
    newFormData[key].valid = true;
    newFormData[key].touched = true;
    newFormData[key].validationMessage = '';
  }

  return newFormData;
}

export const resetFields = (formData, formName) => {
  const newFormData = {...formData};

  for (let key in newFormData) {
    if (key === 'images') {
      newFormData[key].value = [];
    }
    else {
      newFormData[key].value = '';
    }
    newFormData[key].valid = false;
    newFormData[key].touched = false;
    newFormData[key].validationMessage = '';
  }

  return newFormData;
}