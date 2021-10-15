import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const Helmet = ({ title, children, ...rest }) => {
  document.title = title;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <div {...rest}>{children}</div>;
};

Helmet.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Helmet;
