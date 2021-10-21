import PropTypes from 'prop-types';
import { useEffect } from 'react';

const Helmet = ({ title, children, ...rest }) => {
  document.title = title;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return children;
};

Helmet.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Helmet;
