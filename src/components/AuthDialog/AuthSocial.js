import React from "react";
import PropTypes from "prop-types";
import { Button, Typography, Link, Box, makeStyles } from "@material-ui/core/";
import clsx from "clsx";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { APP_FACEBOOK, APP_GOOGLE } from "../utils";
import { FacebookIcon, GoogleIcon } from "../Icon";

const AuthSocial = ({ isLogin, onChangeForm }) => {
  const classes = useStyles();

  const onFacebookResponse = response => {
    //1. Success 2. Failure
  };

  const onGoogleResponse = response => {
    //1. Success 2. Failure
  };

  return (
    <Box className={classes.bottom}>
      <Typography className={classes.sclText} variant="body1">
        Đăng nhập bằng mạng xã hội
      </Typography>
      <Box className={classes.sclBtnContainer}>
        <FacebookLogin
          appId={APP_FACEBOOK}
          autoLoad={false}
          fields="name,email"
          callback={onFacebookResponse}
          render={renderProps => (
            <Button
              className={clsx(classes.sclBtn, classes.fbBtn)}
              variant="contained"
              color="primary"
              startIcon={<FacebookIcon />}
              onClick={renderProps.onClick}
            >
              <Typography className={classes.sclBtnText} variant="h6">
                Facebook
              </Typography>
            </Button>
          )}
        />
        <GoogleLogin
          clientId={APP_GOOGLE}
          onSuccess={onGoogleResponse}
          onFailure={onGoogleResponse}
          cookiePolicy={"single_host_origin"}
          render={renderProps => (
            <Button
              className={clsx(classes.sclBtn, classes.ggBtn)}
              onClick={renderProps.onClick}
              variant="contained"
              color="primary"
              startIcon={<GoogleIcon />}
            >
              <Typography className={classes.sclBtnText} variant="h6">
                Google
              </Typography>
            </Button>
          )}
        />
      </Box>
      <Typography className={classes.footText} variant="body1">
        {isLogin ? "Bạn chưa có tài khoản?" : "Bạn đã có tài khoản?"}
        <Link className={classes.resLink} onClick={onChangeForm}>
          {isLogin ? "Đăng ký" : "Đăng nhập"}
        </Link>
      </Typography>
    </Box>
  );
};

AuthSocial.propTypes = {
  onChangeForm: PropTypes.func,
  isLogin: PropTypes.bool,
};

const useStyles = makeStyles(theme => ({
  bottom: {
    margin: "24px",
    width: "100%",
    height: "140px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  sclText: {
    fontSize: "16px",
    color: theme.palette.text.secondary,
  },
  sclBtnContainer: {
    flexDirection: "row",
    margin: "24px 24px 0px 24px",
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    minHeight: "fit-content",
  },
  sclBtn: {
    width: "48%",
    height: "45px",
    borderRadius: "27px",
    border: "none",
    fontSize: 16,
    "&:focus": {
      outline: "none",
    },
  },
  sclBtnText: {
    color: theme.palette.white,
  },

  fbBtn: {
    backgroundColor: "#4b7ccf",
  },
  ggBtn: {
    backgroundColor: "#ec3d34",
  },
  footText: {
    fontSize: "16px",
    color: theme.palette.text.secondary,
    margin: "32px 0px 24px 0px",
  },
  resLink: {
    fontWeight: "600",
    color: theme.palette.primary.main,
  },
}));
export default AuthSocial;
