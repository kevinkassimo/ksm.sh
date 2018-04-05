import React, { Component } from 'react';
import '../../css/ChatRoom.css';

class ChatWindow extends Component {
  constructor(props) {
    super(props);
  }

  generateMessageDisplay() {
    const {
      messages
    } = this.props;

    let messageBoxes = [];
    for (let i = 0; i < messages.length; i++) {
      const msg = messages[i];
      messageBoxes.push((
        <div key={'cm-' + String(i)} className={msg.isSelf ? 'chatroom__message--self' : 'chatroom__message'}>
          <div className="chatroom__message-header">
            {msg.author}, {msg.timeStamp}
          </div>
          <div className="chatroom__message-body">
            {msg.body}
          </div>
        </div>
      ))
    }
    return messageBoxes;
  }

  setBodyScrollOn = () => {
    document.body.style.overflow = 'auto';
  }

  setBodyScrollOff = () => {
    document.body.style.overflow = 'hidden';
  }

  componentDidUpdate() {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

  render() {
    return (
      <div>
        <div className="chatroom__window" onMouseEnter={this.setBodyScrollOff} onMouseLeave={this.setBodyScrollOn}
          onTouchStart={this.setBodyScrollOff} onTouchEnd={this.setBodyScrollOn}>
          {this.generateMessageDisplay()}
          <div ref={(el) => this.messagesEnd = el} />
        </div>
      </div>
    )
  }
}

export default ChatWindow
