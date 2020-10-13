/** @format */

import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const TextAreaFieldGroup = ({name, placeholder, value, errors, info, handleChange}) => {
  return (
    <div>
      <div className="form-group">
        <textarea className={classnames('form-control form-control-lg', {'is-invalid': errors})} placeholder={placeholder} name={name} value={value} onChange={handleChange} />
        {info && <small className="form-text text-muted">{info}</small>}
        {errors && <div className="invalid-feedback">{errors}</div>}
      </div>
    </div>
  );
};

TextAreaFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  errors: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
};

export default TextAreaFieldGroup;
