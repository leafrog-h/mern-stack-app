import { Link } from 'react-router-dom';
import React from 'react';
import styles from './styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import joi from '@hapi/joi'
import axios from 'axios'
class SignupComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userInfo: {
        email: '',
        password: '',
        passwordConfirmation: ''
      },
      signupError: {
        isPasswordConfirmed: false,
        errorMessage: ''
      }
    };
  }

  handleInput = (e) => this.setState({userInfo: {...this.state.userInfo, [e.target.name]: e.target.value}})
  render() {

    const { classes } = this.props;

    return (
      <main className={classes.main}>
        <CssBaseline/>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sign Up!
          </Typography>
          <form onSubmit={(e) => this.submitSignup(e)} className={classes.form}>
            <FormControl required fullWidth margin='normal'>
              <InputLabel htmlFor='signup-email-input'>Enter Your Email</InputLabel>
              <Input autoComplete='email' name="email" autoFocus onChange={(e) => this.handleInput(e)} id='signup-email-input'></Input>
            </FormControl>
            <FormControl required fullWidth margin='normal'>
              <InputLabel htmlFor='signup-password-input'>Create A Password</InputLabel>
              <Input type="password" name="password" onChange={(e) => this.handleInput(e)} id='signup-password-input'></Input>
            </FormControl>
            <FormControl required fullWidth margin='normal'>
              <InputLabel htmlFor='signup-password-confirmation-input'>Confirm Your Password</InputLabel>
              <Input type="password" name="passwordConfirmation" onChange={(e) => this.handleInput(e)} id='signup-password-confirmation-input'></Input>
            </FormControl>
            { 
            this.state.signupError.isPasswordConfirmed ? 
            null :
            <Typography className={classes.errorText} component='h5' variant='h6'>
              Passwords do not match
            </Typography>
          }
            <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>Submit</Button>
          </form>
          { 
            this.state.signupError.errorMessage ? 
            <Typography className={classes.errorText} component='h5' variant='h6'>
              {this.state.signupError.errorMessage}
            </Typography> :
            null
          }
          <h5 className={classes.hasAccountHeader}>Already Have An Account?</h5>
          <Link className={classes.logInLink} to='/login'>Log In!</Link>
        </Paper>
      </main>
    );
  }

  confirmPassword = () => {
    if (this.state.userInfo.password === this.state.userInfo.passwordConfirmation) 
    this.setState({userInfo: {...this.state.userInfo, isPasswordConfirmed: true}})
  }

  validateUserInfo = () => { 
    const schema = {
      email: joi.string().min(7).required().email(),
      password: joi.string().min(7).required()
  }
    const {userInfo: {passwordConfirmation, ...userInfoToValidate}} = this.state // pull out the obj from state that contains email and password property only, to be validtaed later 
    const {errorMessage} = joi.validate(userInfoToValidate, schema)
    this.setState({signupError: {...this.state.signupError, errorMessage}}) 

  }

  isValidUser = () => {
    return (this.state.signupError.errorMessage === ''&& this.state.signupError.isPasswordConfirmed === true) ? true
    : false
  }

  submitSignup = (e) => {
    e.preventDefault(); // This is to prevent the automatic refreshing of the page on submit.
    this.confirmPassword()
    this.validateUserInfo()
    return this.isValidUser() ? this.toDashboard() : null
  }

  toDashboard = () => {
    const {userInfo: {passwordConfirmation, ...rest}} = this.state
    const dataToSubmit = Object.assign(rest, {date: Date.now})
    axios.post('http:/localhost:8080/adduser', dataToSubmit)
    .then(res => console.log(res.data))
    .then(res => this.props.history.push('/dashboard/' + res.data._id)
  )
  }
}  
export default withStyles(styles)(SignupComponent);