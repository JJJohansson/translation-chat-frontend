import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  paper: {
    display: 'flex',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: "70%",
    minWidth: '20%',
    margin: 10,   
    backgroundColor: '#d6f5d6',
  },
  userComment: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  message: {
  },
  timestamp : {
    fontSize: 12,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    margin: '15px 0 0 15px'
  }
});

class UserComment extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.userComment}>
        <Paper elevation={1} className={classes.paper}>
          <Typography className={classes.message} variant="body1" gutterBottom>
            {this.props.comment.message}
          </Typography>
          <Typography className={classes.timestamp} variant="subtitle1" gutterBottom>
            {this.props.comment.timestamp}
          </Typography>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(UserComment);
