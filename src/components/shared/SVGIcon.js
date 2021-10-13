import React from 'react';
import PropTypes from 'prop-types';

import { ReactComponent as Google } from '../../assets/icons/google.svg';
import { ReactComponent as Eye } from '../../assets/icons/eye.svg';
import { ReactComponent as EyeHidden } from '../../assets/icons/eye-hidden.svg';

const mapIcon = {
  google: Google,
  eye: Eye,
  eyeHidden: EyeHidden,
};

const SVGIcon = ({ name, width = '16px', height = width, ...rest }) => {
  const MatchIcon = mapIcon[name] || null;
  if (!MatchIcon) return null;
  return <MatchIcon width={width} height={height} {...rest} />;
};

SVGIcon.propTypes = {
  name: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
};

export default SVGIcon;
