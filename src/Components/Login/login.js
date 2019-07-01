import { Link } from "../../../../../../AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/react-router-dom";
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
import axios from "axios";

class LoginComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
      isPwdCorrect: true,
      errorMessage: "",
      serverError: null
    };
  }

  handleInput = e => this.setState({ [e.target.name]: e.target.value });

  clearInput = () =>
    this.setState({
      email: "",
      password: ""
    });

  isUserValid = () => {
    const { errorMessage, isPwdCorrect, serverError } = this.state;
    return !!errorMessage && isPwdCorrect === true && !serverError
      ? true
      : false; // primary data type convertion
  };
  submitLogin = e => {
    e.preventDefault();
    const { serverError, ...userInfo } = this.state;
    axios
      .post("http:/localhost:8080/finduser", userInfo)
      /*     .then(res => {
        if (res.data.isPwdCorrect === false)
          this.setState({ isPwdCorrect: false });
        if (res.data.errorMessage)
          this.setState({ errorMessage: res.data.errorMessage });
        else this.setState({ errorMessage: "" });
      })
      .then(res => {
        if (this.isUserValid())
          this.props.history.push("/dashboard/" + res.data._id);
        this.clearInput();
      });          */
      .then(res => {
        if (this.isUserValid())
          this.props.history.push("/dashboard/" + res.data._id);
        this.clearInput();
      })
      .catch(err => {
        if (err.response.status === 400) {
          const { errorMessage, isPwdCorrect } = err.response.data;
          if (!!errorMessage) this.setState({ errorMessage });
          if (!!isPwdCorrect) this.setState({ isPwdCorrect });
        } else {
          // error from server
          const { serverError } = err.response.data;
          this.setState({ serverError });
        }
      });
  };

  render() {
    const { classes } = this.props;

    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5">
            Log In!
          </Typography>
          <form onSubmit={e => this.submitLogin(e)} className={classes.form}>
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="login-email-input">
                Enter Your Email
              </InputLabel>
              <Input
                autoComplete="email"
                autoFocus
                onChange={e => this.handleInput(e)}
                id="login-email-input"
              />
            </FormControl>
            {this.state.errorMessage ? (
              <Typography
                className={classes.errorText}
                component="h5"
                variant="h6"
              >
                {this.state.errorMessage}
              </Typography>
            ) : null}
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="login-password-input">
                Enter Your Password
              </InputLabel>
              <Input
                autoComplete="current-password"
                type="password"
                onChange={e => this.handleInput(e)}
                id="login-password-input"
              />
            </FormControl>
            {!this.state.isPwdCorrect ? (
              <Typography
                className={classes.errorText}
                component="h5"
                variant="h6"
              >
                Incorrect Password
              </Typography>
            ) : null}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Log In
            </Button>
          </form>
          {this.state.errorMessage ? (
            <Typography
              className={classes.errorText}
              component="h5"
              variant="h6"
            >
              {this.state.errorMessage}
            </Typography>
          ) : null}
          <h5 className={classes.noAccountHeader}>Don't Have An Account?</h5>
          <Link className={classes.signUpLink} to="/signup">
            Sign Up!
          </Link>
        </Paper>
      </main>
    );
  }
}

export default withStyles(styles)(LoginComponent);
