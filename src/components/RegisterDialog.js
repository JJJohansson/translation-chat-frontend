import React, { Component } from 'react';
import { firebaseApp } from '../util/firebase_config';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

export default class RegisterDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      email: '',
      password: '',
      retypePassword: '',
      emailError: false,
      emailErrorText: '',
      passwordError: false,
      passwordErrorText: '',
      registrationSuccess: false,
    };
  }

  componentWillReceiveProps(props) {
    if (props.openRegisterDialog) this.setState({ open: true });
  }

  handleClose = () => {
    this.props.dialogHandler({ registerDialog: false });
    this.setState({ open: false });
  }

  handleInput = (e) => {
    let emailError = this.state.emailError;
    let passwordError = this.state.passwordError;
    if (e.target.name === 'email') emailError = false;
    if (e.target.name === 'password') passwordError = false;
    this.setState({ [e.target.name]: e.target.value, emailError, passwordError });
  }

  handleRegister = () => {
    console.log('asd');
  }

  render() {
    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          maxWidth={'sm'}
          fullWidth
          disableBackdropClick={true}
        >
          <DialogTitle id="form-dialog-title">Register</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Register
            </DialogContentText>
            <TextField
              id="standard-email-input"
              label="Email"
              type="email"
              name="email"
              autoComplete="email"
              margin="normal"
              value={this.state.email}
              onChange={this.handleInput}
              error={this.state.emailError}
              helperText={this.state.emailError ? this.state.emailErrorText : ''}
            />
            <TextField
              id="standard-password-input"
              label="Password"
              type="Password"
              name="password"
              autoComplete="current-password"
              margin="normal"
              value={this.state.password}
              onChange={this.handleInput}
              error={this.state.passwordError}
              helperText={this.state.passwordError ? this.state.passwordErrorText : ''}
            />
            <TextField
              id="standard-password-input"
              label="Retype password"
              type="Password"
              name="retypePassword"
              autoComplete="current-password"
              margin="normal"
              value={this.state.retypePassword}
              onChange={this.handleInput}
              error={this.state.password !== this.state.retypePassword ? true : false}
              helperText={this.state.password !== this.state.retypePassword ? 'Password does not match' : ''}
            />
          </DialogContent>
          <DialogActions>
            <div>
              <Button onClick={this.handleClose} color="default">
                CANCEL
              </Button>
              <Button onClick={this.handleLogin} color="primary">
                REGISTER
              </Button>
            </div>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}
