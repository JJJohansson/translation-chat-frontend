import React, { Component } from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Select from '@material-ui/core/Select';

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignContent: 'flex-start',
    width: '95%',
    margin: 'auto'
  },
  paper: {
    padding: '3px 10px 3px 10px',
    alignItems: 'center',
    width: "100%",
    display: 'flex',

  },
  input: {
    width: '85%',
    margin: '0 10px 0 10px'
  },
  button: {
    margin: theme.spacing.unit,
    backgroundColor: '#2196f3'
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  select: {
    width: '15%',
    '&:hover': {
      border: 'none'
    },
    '&::before':{
      content: 'none'
    }
  }
});
 
class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      user: '',
      chatbarFocused: false,
      language: '',
      languages: []
    };
  }

  componentDidMount() {
    this.fetchLanguageOptions();
    window.addEventListener("keydown", (event) => this.handleKeyPress(event));
  }

  fetchLanguageOptions = () => {
    const request = {
      method: 'get',
      url: 'http://localhost:3001/languages',
    };

    axios(request)
      .then(response => this.setState({ languages: response.data }))
      .catch(error => console.log(error))
  }

  componentWillReceiveProps(props) {
    if (props.user) this.setState({ user: props.user });
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
    const user = this.state.user;
    const language = this.state.language;
    const data = { timestamp:timestamp, message:message, user:user, languag:language };
    const request = {
      method: 'post',
      url: 'http://localhost:3001',
      data: data,
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

  handleLanguageChange = (e) => {
    this.setState({ language: e.target.value });
  }

  render() {
    const { classes } = this.props;
    const options = this.state.languages.map(option => <option key={option.id} value={option.id}>{option.language}</option>)
    return (
      <div className={classes.root}>
        <div id="shadow" className={classes.paper}>
          <Select
            native
            className={classes.select}
            value={this.state.language}
            onChange={this.handleLanguageChange}
            inputProps={{
              name: 'language',
              id: 'language-native-simple',
            }}
          >
            { options }
          </Select>
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
        <Button variant="contained" color="primary" className={classes.button} onClick={this.sendMessage}>
          Send
          <Icon className={classes.rightIcon}>send</Icon>
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(ChatBar);
