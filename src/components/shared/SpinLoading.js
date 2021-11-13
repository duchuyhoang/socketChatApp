import React from 'react';

const SpinLoading = ({ size = '50px', ...rest }) => {
  const style = {
    width: size,
    height: size,
  };
  return <div className='dashed-loading' style={style}></div>;
};

export default SpinLoading;
