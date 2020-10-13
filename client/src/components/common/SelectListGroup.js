/** @format */

import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const SelectListGroup = ({name, value, errors, info, handleChange, options}) => {
  const selectOptions = options.map(option => (
    <option key={option.label} value={option.value}>
      {option.label}
    </option>
  ));
  return (
    <div>
      <div className="form-group">
        <select className={classnames('form-control form-control-lg', {'is-invalid': errors})} name={name} value={value} onChange={handleChange}>
          {selectOptions}
        </select>

        {info && <small className="form-text text-muted">{info}</small>}
        {errors && <div className="invalid-feedback">{errors}</div>}
      </div>
    </div>
  );
};

SelectListGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  errors: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
};

export default SelectListGroup;
