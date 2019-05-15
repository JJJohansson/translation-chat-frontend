import React, { Component } from 'react';
import '../App.css';

import ChatBar from './ChatBar';
import Comments from './Comments';
import LoginDialog from './LoginDialog';
import RegisterDialog from './RegisterDialog';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent'
import Avatar from '@material-ui/core/Avatar';
import Chat from '@material-ui/icons/Chat';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Select from '@material-ui/core/Select';

const styles = theme => ({
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
    height: 40
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
});

class Background extends Component {
  constructor(props) { 
    super(props);
    this.state = {
      loggedIn: false,
      user: '',
      loginDialog: false,
      registerDialog: false,
      languages: [
        'finnish',
        'swedish',
        'german',
        'russian',
        'english'
      ],
    };
  }

  dialogHandler = (data) => {
    console.log(data.registerDialog);
    if (data.loginDialog === false) this.setState({ loginDialog: data.loginDialog });
    if (data.registerDialog === false) this.setState({ registerDialog: data.registerDialog });
  }

  loginHandler = (user) => {
    if (user.email) this.setState({ loggedIn: true, user: user.email });
  }

  render() {
    const { classes } = this.props;
    const options = this.state.languages.map(language => <option key={language} value={language}>{language}</option>)
    return (
      <div>
        <LoginDialog openLoginDialog={this.state.loginDialog} dialogHandler={this.dialogHandler} loginHandler={this.loginHandler} />
        <RegisterDialog openRegisterDialog={this.state.registerDialog} dialogHandler={this.dialogHandler} />
        <Card className={classes.card}>
          <Paper classname={classes.headerPaper}>
            <CardHeader
              className={classes.header}
              avatar={
                <Avatar aria-label="Icon">
                  <Chat />
                </Avatar>
              }
              title="Chat"
              subheader={this.state.loggedIn ? this.state.user : "Bleep bloop"}
            />
          </Paper>
          <CardContent className={classes.content}>
            <div id="comments" className={classes.comments}>
              <Comments />
            </div>
            {this.state.loggedIn
            ?
              <div className={classes.chatbar}>
                <ChatBar user={this.state.user} />
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

export default withStyles(styles)(Background);
