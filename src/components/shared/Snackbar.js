import PropTypes from 'prop-types';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import SVGIcon from './SVGIcon';

const Snackbar = forwardRef(({ message = '', type = 'info', ...rest }, ref) => {
  const bg =
    type === 'success'
      ? '#4E9A51'
      : type === 'error'
      ? '#D84646'
      : type === 'info'
      ? '#1E95D6'
      : type === 'warning'
      ? '#F68A1C'
      : '#000';

  const [showSnackbar, setShowSnackbar] = useState(false);

  useImperativeHandle(ref, () => ({
    showSnackbar() {
      setShowSnackbar(true);
      setTimeout(() => {
        setShowSnackbar(false);
      }, 4000);
    },
  }));

  return (
    <div
      className={`snackbar ${showSnackbar ? 'show' : ''}`}
      {...rest}
      style={{ backgroundColor: `${bg}` }}
      ref={ref}
    >
      <SVGIcon name={type} width='22px' />
      <p>{message}</p>
    </div>
  );
});

Snackbar.propTypes = {
  type: PropTypes.string,
  message: PropTypes.string,
};

export default Snackbar;
