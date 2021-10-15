import React from 'react';
import PropTypes from 'prop-types';

const Avatar = (props) => {
  const size = props.size ? 'avatar--' + props.size : '';
  return (
    <div className={`avatar ${props.isOnline ? 'online' : ''} ${size} `}>
      <img src={props.img} alt='' />
    </div>
  );
};

Avatar.propTypes = {
  img: PropTypes.string,
  isOnline: PropTypes.bool,
  size: PropTypes.string,
};

export default Avatar;
