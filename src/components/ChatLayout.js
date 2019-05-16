import React, { Component } from 'react';
import { firebaseApp } from '../util/firebase_config';
import '../App.css';

import ChatHeader from './ChatHeader';
import ChatBar from './ChatBar';
import Comments from './Comments';
import LoginDialog from './LoginDialog';
import RegisterDialog from './RegisterDialog';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const styles = {
  card: {
    maxWidth: '70vw',
    minWidth: '65vw',
    height: '80vh',
    margin: 'auto',
  },
  header: {
    width: '100%',
  },
  headerPaper: {
  },
  content: {
    height: '100%',
    position: 'relative',
  },
  chatbar: {
    position: 'absolute',
    bottom: 90,
    width: '98%'
  },
  comments: {
    overflowY: 'scroll',
    height: '82%',
  },
  login: {
    display: 'flex',
    margin: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
  },
  link: {
    cursor: 'pointer'
  }
};

class ChatLayout extends Component {
  constructor(props) { 
    super(props);
    this.state = {
      loggedIn: false,
      user: '',
      loginDialog: false,
      registerDialog: false,
      language: '',
    };
    this.authStateListener = this.authStateListener();
  }

  authStateListener = () => {
    firebaseApp.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true, user: user.email });
      } else {
        this.setState({ loggedIn: false, user: '' });
      }
    })
  }

  dialogHandler = (data) => {
    if (data.loginDialog === false) this.setState({ loginDialog: data.loginDialog });
    if (data.registerDialog === false) this.setState({ registerDialog: data.registerDialog });
  }

  handleLogout = () => {
    firebaseApp.auth().signOut()
      .then(result => console.log(result))
      .catch(error => console.log(error));
  }

  languageHandler = (language) => {
    this.setState({ language });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <LoginDialog openLoginDialog={this.state.loginDialog} dialogHandler={this.dialogHandler} />
        <RegisterDialog openRegisterDialog={this.state.registerDialog} dialogHandler={this.dialogHandler} />
        <Card className={classes.card}>
          <ChatHeader loggedIn={this.state.loggedIn} user={this.state.user} handleLogout={this.handleLogout} />
          <CardContent className={classes.content}>
            <div id="comments" className={classes.comments}>
              <Comments language={this.state.language} user={this.state.user} />
            </div>
            {this.state.loggedIn
            ?
              <div className={classes.chatbar}>
                <ChatBar user={this.state.user} language={this.languageHandler} />
              </div>
            :
              <div className={classes.login}>
                <Typography component="h6" variant="h6" gutterBottom>
                  <Link
                    className={classes.link}
                    underline="none"
                    component="a"
                    variant="h6"
                    onClick={() => this.setState({loginDialog: true})}
                  > Login </Link> 
                  or
                  <Link
                    className={classes.link}
                    underline="none"
                    component="a"
                    variant="h6"
                    onClick={() => this.setState({registerDialog: true})}
                  > Subscribe </Link>
                  to send messages
                </Typography>
              </div>
            }
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(ChatLayout);
