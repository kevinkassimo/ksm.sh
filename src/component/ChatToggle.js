import React, { Component } from 'react';
import octicons from 'octicons';
import ChatRoom from '../component/chatComponent/ChatRoom';

class ChatToggle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldToggle: false,
    };
  }

  handleToggle = () => {
    this.setState({
      shouldToggle: true
    });
  };

  handleHide = () => {
    this.setState({
      shouldToggle: false
    });
  };

  render() {
    return (
      <div>
        <div className="chatroom__toggle-button"
          onClick={this.handleToggle}>
          <div style={{position: 'relative', left: '15%', top: '15%'}} dangerouslySetInnerHTML={{__html: octicons['comment-discussion'].toSVG({fill: "white", width: "3em", height: "3em"})}} />
        </div>
        <ChatRoom visible={this.state.shouldToggle} handleHide={this.handleHide}/>
      </div>

    );
  }
}

export default ChatToggle;