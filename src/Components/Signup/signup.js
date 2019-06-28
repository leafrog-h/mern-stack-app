import { Link } from "react-router-dom";
import React from "react";
import styles from "./styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import joi from "@hapi/joi";
import axios from "axios";
class SignupComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {
        email: "",
        password: "",
        passwordConfirmation: ""
      },
      signupError: {
        isPasswordConfirmed: false,
        errorMessage: "",
        isEmailTaken: false
      }
    };
  }

  handleInput = e =>
    this.setState({
      userInfo: { ...this.state.userInfo, [e.target.name]: e.target.value }
    });

  confirmPassword = () => {
    const {
      userInfo: { pwd, confirmPwd }
    } = this.state;
    this.setState({
      userInfo: {
        ...this.state.userInfo,
        isPasswordConfirmed: pwd === confirmPwd ? true : false
      }
    });
    return pwd === confirmPwd ? true : false;
  };

  validateUserInfo = () => {
    const schema = {
      email: joi
        .string()
        .min(7)
        .required()
        .email(),
      password: joi
        .string()
        .min(7)
        .required()
    };
    const {
      userInfo: { passwordConfirmation, ...userInfoToValidate }
    } = this.state; // pull out the obj from state that contains email and password property only, to be validtaed later
    const { errorMessage } = joi.validate(userInfoToValidate, schema); // errorMessage could be translated to Chinese
    this.setState({
      signupError: {
        ...this.state.signupError,
        errorMessage: !!errorMessage ? errorMessage : ""
      }
    });
    return !errorMessage ? true : false;
  };

  isValidUser = () => {
    const {
      userInfo: { errorMessage, isPasswordConfirmed, isEmailTaken }
    } = this.state;
    return errorMessage === "" &&
      isPasswordConfirmed === true &&
      isEmailTaken === false
      ? true
      : false;
  };

  submitSignup = e => {
    e.preventDefault(); // This is to prevent the automatic refreshing of the page on submit.
    this.confirmPassword();
    this.validateUserInfo();
    const {
      userInfo: { passwordConfirmation, ...dataToSubmit }
    } = this.state;
    axios
      .post("http:/localhost:8080/adduser", dataToSubmit)
      .then(res => {
        if (res.data.isEmailTaken)
          this.setState({
            userInfo: { ...this.state.userInfo, isEmailTaken: true }
          });
      })
      .then(res => {
        if (this.isValidUser())
          this.props.history.push("/dashboard" + res.data._id);
      });
  };

  render() {
    const { classes } = this.props;

    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sign Up!
          </Typography>
          <form onSubmit={e => this.submitSignup(e)} className={classes.form}>
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="signup-email-input">
                Enter Your Email
              </InputLabel>
              <Input
                autoComplete="email"
                name="email"
                autoFocus
                onChange={e => this.handleInput(e)}
                id="signup-email-input"
              />
            </FormControl>
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="signup-password-input">
                Create A Password
              </InputLabel>
              <Input
                type="password"
                name="password"
                onChange={e => this.handleInput(e)}
                id="signup-password-input"
              />
            </FormControl>
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="signup-password-confirmation-input">
                Confirm Your Password
              </InputLabel>
              <Input
                type="password"
                name="passwordConfirmation"
                onChange={e => this.handleInput(e)}
                id="signup-password-confirmation-input"
              />
            </FormControl>
            {this.state.signupError.isPasswordConfirmed ? null : (
              <Typography
                className={classes.errorText}
                component="h5"
                variant="h6"
              >
                Passwords do not match
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Submit
            </Button>
          </form>
          {this.state.signupError.errorMessage ? (
            <Typography
              className={classes.errorText}
              component="h5"
              variant="h6"
            >
              {this.state.signupError.errorMessage}
            </Typography>
          ) : null}
          <h5 className={classes.hasAccountHeader}>Already Have An Account?</h5>
          <Link className={classes.logInLink} to="/login">
            Log In!
          </Link>
        </Paper>
      </main>
    );
  }
}
export default withStyles(styles)(SignupComponent);
