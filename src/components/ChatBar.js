import React, { Component } from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  paper: {
    padding: '3px 10px 3px 10px',
    alignItems: 'center',
    width: "100%",
  },
  input: {
    width: '100%',
  },
  button: {
    margin: theme.spacing.unit,
    backgroundColor: '#2196f3'
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
});

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      chatbarFocused: false,
    };
  }

  componentDidMount() {
    window.addEventListener("keydown", (event) => this.handleKeyPress(event));
  }

  focus = () => {
    this.setState({ chatbarFocused: true });
  }
  
  blur = () => {
    this.setState({ chatbarFocused: false });
  }

  sendMessage = () => {
    if (this.state.message.length === 0) return;

    const timestamp = Date.now();
    const message = this.state.message;
    const data = { "timestamp":timestamp, "message":message };
    const request = {
      method: 'post',
      url: 'http://localhost:3001',
      data: data
    };
    
    this.setState({ message: '' }, () => document.getElementById("input").focus());
    axios(request)
      .then(response => console.log(response))
      .catch(error => console.log(error));
  }

  handleKeyPress = (event) => {
    if (event.key === 'Enter' && this.state.chatbarFocused) this.sendMessage();
  }

  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        {/* <Paper elevation={1} className={classes.paper}> */}
        <div id="shadow" className={classes.paper}>
          <InputBase
            id="input"
            className={classes.input}
            onChange={this.handleInput}
            name="message"
            value={this.state.message}
            onFocus={this.focus}
            onBlur={this.blur}
            autoFocus
          />
        </div>
        {/* </Paper> */}
        <Button variant="contained" color="primary" className={classes.button} onClick={this.sendMessage}>
          Send
          <Icon className={classes.rightIcon}>send</Icon>
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(ChatBar);
