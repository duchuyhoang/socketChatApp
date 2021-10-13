import PropTypes from 'prop-types';
import React, { useState } from 'react';
import SVGIcon from './SVGIcon';

const TextField = ({ label, type = 'text', inputChange, error, ...rest }) => {
  const [typeInput, setTypeInput] = useState(type);

  return (
    <label className={`text-field ${error ? 'error' : ''}`}>
      {label && <span>{label}</span>}
      <input type={typeInput} onChange={inputChange} {...rest} />
      {type === 'password' && (
        <SVGIcon
          name={typeInput === 'password' ? 'eye' : 'eyeHidden'}
          onClick={() =>
            setTypeInput((prev) => (prev === 'password' ? 'text' : 'password'))
          }
        />
      )}
    </label>
  );
};

TextField.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string,
  error: PropTypes.bool,
};

export default TextField;
