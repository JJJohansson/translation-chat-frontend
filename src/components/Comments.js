import React, { Component } from 'react';
import { firebaseApp } from '../util/firebase_config';

import Comment from './Comment';
import UserComment from './UserComment';

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      loggedIn: false,
      language: 'en',
    };
    this.listener = this.listener();
  }

  componentWillUnmount() {
    this.listener = undefined;
  }

  componentWillReceiveProps(props) {
    if (props.language) this.setState({ language: props.language });
  }

  listener = () => {
    try {
      firebaseApp
        .database()
        .ref('messages')
        .on('value', (snapshot) => {
          const messages = [];
  
          snapshot.forEach((child) => {
            //console.log(child.val());

            const user = child.val().user;
            const source = child.val().source;
            const timestamp = Number(child.val().timestamp);
            const date = new Date(timestamp).getDate();
            const month = new Date(timestamp).getMonth();
            const year = new Date(timestamp).getFullYear();
            const hour = new Date(timestamp).getHours();
            let minutes = new Date(timestamp).getMinutes();
            if (minutes === 0) minutes += '0';
            //const seconds = new Date(timestamp).getSeconds();
            //const UTC = new Date(timestamp).toUTCString();
            const time = `${hour}:${minutes}`;
            const date2 = `${date}/${month}/${year}`;
  
            messages.push({ 
              key: child.key,
              user: user,
              sourceLanguage: source,
              timestamp: time,
              date: date2,
              translations: child.val().translations
            });
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
    const commentsByLanguage = this.state.messages.map(message => {
      const filtered = message.translations.filter(translation => translation.id === this.state.language);
      const comment = filtered[0];
      comment.timestamp = message.timestamp;
      comment.user = message.user;
      return comment;
    });
    const comments = commentsByLanguage.map(comment => {
      return comment.user === this.props.user
      ? 
        <UserComment key={Math.random() * 1000000} comment={comment} />
      :
        <Comment key={Math.random() * 1000000} comment={comment} />
      });
    return (
      <div>
        {comments}
      </div>
    );
  }
}

export default Comments;
