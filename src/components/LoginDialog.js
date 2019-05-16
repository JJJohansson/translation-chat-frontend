import React, { Component } from 'react';
import firebase from 'firebase';
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
import LinearProgress from '@material-ui/core/LinearProgress';

import GithubLogo from '../icons/GitHub-Mark-32px.png';
import FacebookLogo from '../icons/f_logo_RGB-Blue_58.png';
import GoogleSignin from '../icons/btn_google_signin_dark_focus_web.png';

const styles = {
  content: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 0
  },
  topActions: {
    margin: '0 15px 0 0',
  },
  bottomActions: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  thirdPartyLogins: {
    margin: '0 0 15px 20px',
    '& img': {
      cursor: 'pointer'},
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: "75%"
  },
  divider: {
    width: "100%",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  test: {
    width: "40%",
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },
  dividerText: {
    margin: 10,
    color: 'rgba(0, 0, 0, 0.3)',
  }
};

class LoginDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      fullWidth: 'sm',
      email: '',
      password: '',
      emailError: false,
      emailErrorMessage: '',
      passwordError: false,
      passwordErrorMessage: '',
      loading: false,
    };
  }

  componentWillReceiveProps(props) {
    if (props.openLoginDialog) this.setState({ open: true });
  }

  componentWillUnmount() {
    console.log('closing..')
  }

  handleClose = () => {
    this.props.dialogHandler({ loginDialog: false });
    this.setState({ open: false });
  }

  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleLogin = () => {
    if (!this.state.email || !this.state.password) return;

    this.setState({ loading: true}, () => {
      firebaseApp.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((result) => {
        this.setState({ loading: false });
        this.handleClose();
        /*firebaseApp.auth().currentUser.getIdToken(true)
          .then((idToken) => console.log(idToken))
          .catch(error => console.error(error));
        */
      })
      .catch((error) => {
        // there are 4 different errors. 1 for password and 3 for email.
        if (error.code === 'auth/wrong-password') {
          this.setState({ passwordError: true, passwordErrorMessage: error.message, loading: false });
        } else {
          this.setState({ emailError: true, emailErrorMessage: error.message, loading: false });
        }
      });
    });
  }

  handleGoogleLogin = () => {
    console.log('google login bleep bloop');
    const provider = new firebase.auth.GoogleAuthProvider();
    this.setState({ loading: true }, () => {
      firebase.auth().signInWithPopup(provider)
        .then((result) => {
          console.log(result);
          this.setState({ loading: false });
          this.handleClose();
        })
        .catch((error) => {
          console.log(error);
          this.setState({ loading: false });
        });
    });
  }

  handleGitHubLogin = () => {
    console.log('github login bleep bloop');
    const provider = new firebase.auth.GithubAuthProvider();
    this.setState({ loading: true }, () => {
      firebase.auth().signInWithPopup(provider)
        .then((result) => {
          console.log(result);
          this.setState({ loading: false });
          this.handleClose();
        })
        .catch((error) => {
          console.log(error);
          this.setState({ loading: false });
        });
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          maxWidth={'sm'}
          fullWidth
          disableBackdropClick={true}
        >
          {this.state.loading ? <LinearProgress /> : null}
          <DialogTitle id="form-dialog-title">Login</DialogTitle>
          <DialogContent className={classes.content}>
            <DialogContentText>
              Log in with your email or through other accounts.
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
              helperText={this.state.emailError ? this.state.emailErrorMessage : ''}
            />
            <TextField
              id="standard-password-input"
              label="Password"
              type="Password"
              name="password"
              autoComplete="current-password"
              margin="normal"
              onChange={this.handleInput}
              value={this.state.password}
              error={this.state.passwordError}
              helperText={this.state.passwordError ? this.state.passwordErrorMessage : ''}
            />
          </DialogContent>
          <DialogActions className={classes.topActions}>
            <div>
              <Button onClick={this.handleClose} color="default">
                CANCEL
              </Button>
              <Button onClick={this.handleLogin} color="primary">
                LOG IN
              </Button>
            </div>
          </DialogActions>
          <DialogActions className={classes.bottomActions}>
            <div className={classes.divider}>
              <Divider className={classes.test} light={false} />
              <Typography className={classes.dividerText} component="h6" variant="h6" gutterBottom>
                OR
              </Typography>
              <Divider className={classes.test} light={false} />
            </div>
            <div className={classes.thirdPartyLogins}>
              <img src={GithubLogo} alt="GitHub logo" onClick={this.handleGitHubLogin} />
              <img src={FacebookLogo} alt="Facebook logo" height="32" width="32" />
              <img src={GoogleSignin} alt={"Google sign-in"} onClick={this.handleGoogleLogin} />
            </div>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(LoginDialog);
