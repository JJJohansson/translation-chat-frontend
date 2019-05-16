import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Chat from '@material-ui/icons/Chat';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  header: {
    width: '100%',
  },
  headerPaper: {
  },
};

class ChatHeader extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Paper className={classes.headerPaper}>
          <CardHeader
            className={classes.header}
            title="Translator chat"
            subheader={this.props.loggedIn ? `Logged in as: ${this.props.user}` : ""}
            avatar={
              <Avatar aria-label="Icon">
                <Chat />
              </Avatar>
            }
            action={
              this.props.loggedIn ?
                <Button onClick={this.props.handleLogout} color="default">
                  LOG OUT
                  </Button>
                : null
            }
          />
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(ChatHeader);
