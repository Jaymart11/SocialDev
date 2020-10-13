/** @format */

import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const TextFieldGroup = ({name, placeholder, value, errors, info, type, handleChange, disabled, autocomplete}) => {
  return (
    <div>
      <div className="form-group">
        <input
          type={type}
          className={classnames('form-control form-control-lg', {'is-invalid': errors})}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={handleChange}
          disabled={disabled}
          autoComplete={autocomplete}
        />
        {info && <small className="form-text text-muted">{info}</small>}
        {errors === 'These credentials do not match our records.' ? '' : errors && <div className="invalid-feedback">{errors}</div>}
      </div>
    </div>
  );
};

TextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  errors: PropTypes.string,
  autocomplete: PropTypes.string,
  type: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  disabled: PropTypes.string,
};

TextFieldGroup.defaultProps = {
  type: 'text',
  autocomplete: 'on',
};

export default TextFieldGroup;
