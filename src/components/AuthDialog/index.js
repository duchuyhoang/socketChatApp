import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  IconButton,
  Typography,
  Divider,
  useTheme,
  useMediaQuery,
  Box,
  Dialog,
  makeStyles,
} from "@material-ui/core/";
import CloseIcon from "@material-ui/icons/Close";
import AuthSocial from "./AuthSocial";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

const AuthDialog = ({ onClose, isOpen }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const classes = useStyles();

  const [isLogin, setIsLogin] = useState(true);

  const onChangeForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <Dialog
      aria-labelledby="auth-dialog"
      open={isOpen}
      fullScreen={isMobile}
      onClose={onClose}
    >
      <Box className={classes.container}>
        <Box className={classes.header}>
          <Typography variant="h5" className={classes.title}>
            {isLogin ? "Đăng ký" : "Đăng nhập"}
          </Typography>
          <IconButton onClick={onClose} className={classes.closeIcon}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider className={classes.divider} />
        <Box className={classes.content}>
          {!isLogin ? <SignInForm /> : <SignUpForm />}
          <AuthSocial onChangeForm={onChangeForm} isLogin={isLogin} />
        </Box>
      </Box>
    </Dialog>
  );
};

AuthDialog.propTypes = {
  onClose: PropTypes.func,
  isOpen: PropTypes.bool,
};
const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    alignItems: "center",
    padding: 0,
    margin: 0,
    backgroundColor: theme.palette.white,
    flexDirection: "column",
    justifyContent: "flex-start",
    width: "472px",
    borderRadius: "10px",
    overflow: "hidden",
    [theme.breakpoints.down("xs")]: {
      width: "100vw",
      height: "100vh",
    },
  },
  header: {
    width: "100%",
    height: "74px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 0,
    borderRadius: "10px",
    padding: "0 18px 0 24px",
    [theme.breakpoints.down("xs")]: {
      height: "64px",
      flexDirection: "row-reverse",
      justifyContent: "flex-end",
      padding: "0px 0px 0px 16px",
    },
  },
  closeIcon: {
    color: theme.palette.text.secondary,
    [theme.breakpoints.down("xs")]: {
      color: theme.palette.text.primary,
    },
  },
  title: {
    fontSize: "22px",
    fontWeight: 600,
    color: theme.palette.text.primary,
    [theme.breakpoints.down("xs")]: {
      fontSize: "18px",
      margin: "6px",
    },
  },
  divider: {
    width: "100%",
    height: "1px",
    backgroundColor: theme.palette.text.disabled,
    margin: 0,
  },
  content: {
    width: "100%",
    padding: " 0px 24px 0px 24px",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    [theme.breakpoints.down("xs")]: {
      padding: " 0px 16px 0px 16px",
    },
  },
}));
export default AuthDialog;
