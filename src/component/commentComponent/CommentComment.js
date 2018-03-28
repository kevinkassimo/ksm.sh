import React, { Component } from 'react';
import { Jumbotron, Container, Button } from 'reactstrap';

class CommentComment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      body: '',
    };
  }

  handleCommentSubmit = () => {
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
      addComment,
    } = this.props;

    addComment(username, body);

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
        <form onSubmit={this.handleCommentSubmit}>
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

export default CommentComment;