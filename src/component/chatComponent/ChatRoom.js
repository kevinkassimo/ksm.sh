import React, { Component } from 'react';
import ChatWindow from './ChatWindow';
import { ChatMessage } from './ChatModel';
import update from 'immutability-helper';
import * as moment from 'moment';
import * as faker from 'faker';

import '../../css/ChatRoom.css';

class ChatRoom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      author: 'You-Know-Who',
      currentMessage: '',
      messages: [
        new ChatMessage('KSM', 'Welcome to ChatRoom! Type whatever you want here!', 'PINNED'),
        new ChatMessage('Me', 'Hello world', '2018-01-01', true),
      ]
    };

    this.webSocket = null;
  }

  handleInitMessages() {
    try {
      this.webSocket = new WebSocket('ws://ksm.sh:10000');
      this.webSocket.send(JSON.stringify({
        type: 'init' // init to tell server that this is my first fetch
      }));

      this.webSocket.onmessage = (event) => {
        try {
          const jsonData = JSON.parse(event.data);
          if (jsonData['messages']) {
            const data = jsonData['messages'].map(obj => new ChatMessage(obj['author'], obj['body'], obj['timeStamp'])) || [];
            this.setState({
              messages: update(this.state.messages, {$push: data})
            });
          }
        } catch (_) {
        }
      }
    } catch (_) {}
  }

  handleSubmit = () => {
    const {
      author,
      currentMessage
    } = this.state;

    if (currentMessage.length <= 0 || author.length <= 0) { // avoid empty message/author
      return;
    }

    if (this.webSocket) {
      const submitObject = {
        type: 'message',
        data: {
          author,
          body: currentMessage
        }
      };
      this.webSocket.send(JSON.stringify(submitObject));
    }

    this.setState({
      currentMessage: '',
      messages: update(this.state.messages, {
        $push: [new ChatMessage(author, currentMessage, moment().format('YYYY-MM-DD'), true)]
      })
    });
  };

  componentDidMount() {
    this.handleInitMessages();
    this.setState({
      author: faker.fake("{{name.firstName}}")
    });
  }

  render() {
    const {
      messages
    } = this.state;
    const {
      visible,
    } = this.props;
    return (
      <div className={visible ? 'chatroom' : 'chatroom--disabled'}>
        <div className="chatroom__header">
          <span className="chatroom__header-name">Chat Room</span>
          <button className="chatroom__header-button" onClick={this.props.handleHide}>✕</button>
        </div>
        <p className="chatroom__username">You are granted the pseudo-name: <strong>{this.state.author}</strong></p>
        <ChatWindow messages={messages} />
        <div className="chatroom__footer">
          <input className="chatroom__footer-input" type="text" onChange={event => this.setState({ currentMessage : event.target.value }) } />
          <button className="chatroom__footer-submit" onClick={this.handleSubmit}>Submit</button>
        </div>
      </div>
    );
  }
}

export default ChatRoom
