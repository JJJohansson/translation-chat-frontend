import React, { Component } from 'react';
import '../App.css';

import ChatBar from './ChatBar';
import Comments from './Comments';
import LoginDialog from './LoginDialog';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent'
import Avatar from '@material-ui/core/Avatar';
import Chat from '@material-ui/icons/Chat';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const styles = theme => ({
  card: {
    maxWidth: '80vw',
    minWidth: '65vw',
    height: '80vh',
    margin: 'auto',
  },
  header: {
    width: '100%',
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
      loginDialog: true,
    };
  }

  handler = (data) => {
    console.log(data);
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <LoginDialog open={this.state.loginDialog} />
        <Card className={classes.card}>
          <Paper>
            <CardHeader
              className={classes.header}
              avatar={
                <Avatar aria-label="Icon">
                  <Chat />
                </Avatar>
              }
              title="Chat"
              subheader="Bleep bloop"
            />
          </Paper>
          <CardContent className={classes.content}>
            <div id="comments" className={classes.comments}>
              <Comments />
            </div>
            {this.state.loggedIn ? 
              <div className={classes.chatbar}>
                <ChatBar handler={this.handler} />
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
                    onClick={() => prompt('And this should be a register dialog..')}
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
