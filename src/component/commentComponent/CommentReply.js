import React, { Component } from 'react';
import { Jumbotron, Container, Button } from 'reactstrap';

class CommentReply extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      body: '',
    };
  }

  handleReplySubmit = () => {
    let {
      username,
      body,
    } = this.state;

    if (!username) {
      username = '(unknown)';
    }
    if (!body) {
      body = '(empty)';
    }

    const {
      addReply,
      parentId,
    } = this.props;

    addReply(username, body, parentId);

    this.setState({
      username: '',
      body: '',
    });
  };

  render() {
    const {
      username,
      body,
    } = this.state;

    return (
      <div>
        <form onSubmit={this.handleReplySubmit}>
          <input type="text" value={username}
                 onChange={({ target }) => this.setState({ username: target.value })} />
          <textarea cols="30" rows="10" value={body}
                    onChange={({ target }) => this.setState({ body: target.value })} />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default CommentReply;