import React, { useState } from "react";
import {
  Button,
  Typography,
  TextField,
  Box,
  makeStyles,
  InputAdornment,
} from "@material-ui/core/";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { validateEmail, validatePassword } from "../utils";
import AddAvatar from "./AddAvatar";

const SignUpForm = () => {
  const classes = useStyles();
  const isRegister = false;
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState({});

  const onRegister = () => {
    setError({});
    if (
      validateEmail(email) &&
      password === password2 &&
      validatePassword(password)
    ) {
      //SignUp
    } else {
      setError({
        ...error,
        content: "Vui lòng điền chính xác và đầy đủ thông tin",
      });
    }
  };

  const onShowPassword = () => setShowPassword(!showPassword);
  const onChangeEmail = e => setEmail(e.target.value);
  const onChangePass = e => setPassword(e.target.value);
  const onChangePass2 = e => setPassword2(e.target.value);

  return (
    <Box className={classes.form}>
      <AddAvatar />
      <TextField
        id="email"
        label={
          <Typography variant="h5" className={classes.inputLabel}>
            Email
          </Typography>
        }
        className={classes.textInput}
        InputProps={{
          disableUnderline: true,
          classes: {
            input: classes.textOfInput,
          },
          autoComplete: "off",
        }}
        onChange={onChangeEmail}
        type="email"
        fullWidth
      />
      <TextField
        id="password"
        label={
          <Typography variant="h5" className={classes.inputLabel}>
            Mật khẩu
          </Typography>
        }
        className={classes.textInput}
        InputProps={{
          disableUnderline: true,
          endAdornment: (
            <InputAdornment
              position="end"
              className={classes.inputIcon}
              onClick={onShowPassword}
            >
              {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </InputAdornment>
          ),
          classes: {
            input: classes.textOfInput,
          },
        }}
        onChange={onChangePass}
        type={showPassword ? "text" : "password"}
        fullWidth
      />
      <TextField
        name="password2"
        label={
          <Typography variant="h5" className={classes.inputLabel}>
            Xác nhận mật khẩu
          </Typography>
        }
        className={classes.textInput}
        InputProps={{
          disableUnderline: true,
          endAdornment: (
            <InputAdornment
              position="end"
              className={classes.inputIcon}
              onClick={onShowPassword}
            >
              {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </InputAdornment>
          ),
          classes: {
            input: classes.textOfInput,
          },
        }}
        onChange={onChangePass2}
        type={showPassword ? "text" : "password"}
        fullWidth
      />
      <Typography variant="body1" className={classes.errMessage}>
        {error.content}
      </Typography>
      {isRegister && (
        <Typography className="medium-md-txt">
          Kiểm tra email để xác thực tài khoản
        </Typography>
      )}
      <Button
        className={classes.loginBtn}
        fullWidth
        variant="contained"
        color="primary"
        onClick={onRegister}
      >
        <Typography variant="h5" className={classes.loginBtnText}>
          Đăng ký
        </Typography>
      </Button>
    </Box>
  );
};

SignUpForm.propTypes = {};
export default SignUpForm;

const useStyles = makeStyles(theme => ({
  form: {
    width: "100%",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
  },
  textInput: {
    height: "60px",
    boxShadow: `inset 0 -1px 0 0 ${theme.palette.text.disabled}`,
    margin: "8px 0px 8px 0px",
    border: "none",
    fontSize: "18px",
    color: theme.palette.text.secondary,
    paddingLeft: "12px",
    "&:focus": {
      outline: "none",
    },
    "&::placeholder": {
      color: theme.palette.text.secondary,
      fontWeight: "600",
    },
    [theme.breakpoints.down("xs")]: {
      margin: "20px 0px 20px 0px",
    },
  },
  textOfInput: {
    fontSize: "18px",
    color: theme.palette.black,
    height: "30px",
  },
  inputLabel: {
    fontSize: "18px",
    paddingLeft: "12px",
    color: theme.palette.text.secondary,
  },
  inputIcon: {
    color: theme.palette.text.secondary,
    cursor: "pointer",
  },
  errMessage: {
    fontSize: "14px",
    color: theme.palette.error.main,
  },
  loginBtn: {
    height: "45px",
    borderRadius: "27px",
    backgroundColor: theme.palette.primary.main,

    border: "none",
    margin: "34px 24px 0px 24px",
    "&:focus": {
      outline: "none",
    },
  },
  loginBtnText: {
    fontSize: "18px",
    color: theme.palette.white,
  },
}));
