import React, { memo } from "react";
import PropTypes from "prop-types";
import { SvgIcon } from "@material-ui/core";

const GoogleIcon = (props) => {
  const { width, height, fill, style } = props;
  return (
    <SvgIcon
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      style={style}
    >
      <path d="M15.625 8.188c0-.5-.063-.876-.125-1.282H8.125v2.657H12.5c-.156 1.156-1.313 3.343-4.375 3.343-2.656 0-4.813-2.187-4.813-4.906 0-4.344 5.126-6.344 7.876-3.688l2.124-2.03C11.97 1.031 10.188.25 8.125.25 3.812.25.375 3.719.375 8c0 4.313 3.438 7.75 7.75 7.75 4.469 0 7.5-3.125 7.5-7.563z" />
    </SvgIcon>
  );
};

GoogleIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  style: PropTypes.object,
};
GoogleIcon.defaultProps = {
  width: 16,
  height: 18,
  style: { fontSize: "inherit", color: "inherit" },
};

export default memo(GoogleIcon);
