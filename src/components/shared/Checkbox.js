import React from 'react';
import PropTypes from 'prop-types';

const Checkbox = ({ type = 'checkbox', children, ...rest }) => {
  return (
    <label className='custom-checkbox'>
      <input type={type} {...rest} />
      <span className='custom-checkbox__checkmark'></span>
      {children}
    </label>
  );
};

Checkbox.propTypes = {
  type: PropTypes.string,
};

export default Checkbox;
