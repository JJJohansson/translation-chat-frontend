import React, { Component } from 'react';
import { firebaseApp } from '../util/firebase_config';

import Comment from './Comment';

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      loggedIn: false,
    };
    this.listener = this.listener();
  }

  componentWillUnmount() {
    this.listener = undefined;
  }

  listener = () => {
    try {
      firebaseApp
        .database()
        .ref('messages')
        .on('value', (snapshot) => {
          const messages = [];
  
          snapshot.forEach((child) => {
            console.log(child.val());

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
  
          this.setState({ messages }, () => {
            var element = document.getElementById("comments");
            element.scrollTop = element.scrollHeight;
          });
        });
    } catch(error) {
      console.error(error);
    }
  }

  render() {
    const comments = this.state.messages.map(comment => <Comment key={comment.key} comment={comment} />);
    return (
      <div>
        {comments}
      </div>
    );
  }
}

export default Comments;