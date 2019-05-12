import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  paper: {
    display: 'flex',
    padding: '3px 10px 3px 10px',
    alignItems: 'center',
    maxWidth: "70%",
    minWidth: '30%',
    height: 40,
    margin: 15,
    backgroundColor: '#f2f2f2',
  },
});

class Comment extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Paper elevation={1} className={classes.paper}>
          <p>{this.props.comment.timestamp} ..... {this.props.comment.message}</p>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(Comment);
