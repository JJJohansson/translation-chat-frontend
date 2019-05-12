import React from 'react';
import '../App.css';
import firebase from 'firebase/app';
import 'firebase/database';
import { firebase_config } from '../util/firebase_config';
import axios from 'axios';


class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      messages: [],
    };
  }

  componentDidMount() {
    document.getElementById('message').focus();
    try {
      firebase
        .database()
        .ref('messages')
        .on('value', (snapshot) => {
          const messages = [];
  
          snapshot.forEach((child) => {
            const timestamp = Number(child.val().timestamp);
            const date = new Date(timestamp).getDate();
            const month = new Date(timestamp).getMonth();
            const year = new Date(timestamp).getFullYear();
            const hour = new Date(timestamp).getHours();
            const minutes = new Date(timestamp).getMinutes();
            const seconds = new Date(timestamp).getSeconds();
            //const UTC = new Date(timestamp).toUTCString();
            const time = `${date}/${month}/${year} ${hour}:${minutes}:${seconds}`;
  
            messages.push({ key: child.key, timestamp: time, message: child.val().message });
          });
  
          this.setState({ messages });
        });
    } catch(error) {
      console.error(error);
    }
  }

  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  saveMessage = () => {
    if (this.state.message.length === 0) return;

    const timestamp = Date.now();
    const message = this.state.message;
    const data = { "timestamp":timestamp, "message":message };
    const request = {
      method: 'post',
      url: 'http://localhost:3001',
      data: data
    };

    axios(request)
      .then(response => this.setState({ message: '' }, () => document.getElementById('message').focus()))
      .catch(error => console.log(error));
  }

  render() {
    const comments = this.state.messages.map(comment => <li key={comment.key}>{comment.timestamp} - {comment.message}</li>)

    return (
      <div className="App">
        <form>
          <input id="message" type="text" size="40" value={this.state.message} name="message" onChange={this.handleInput} />
          <button type="button" onClick={this.saveMessage}>COMMENT</button>
        </form>
        <p>{this.state.messages.length === 0 ? 'Loading...' : null}</p>
        <ul>
          {comments}
        </ul>
      </div>
    );
  }
}

export default Demo;
