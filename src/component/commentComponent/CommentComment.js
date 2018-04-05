import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

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
      <div className="comment-comment">
        <h4>Add a comment...</h4>
        <Form>
          <FormGroup>
            <Label for="c-username">Name</Label>
            <Input type="text" name="c-username" placeholder="Your name..." value={username}
              onChange={({ target }) => this.setState({ username: target.value })} />
          </FormGroup>
          <FormGroup>
            <Label for="c-body">Comment Body</Label>
            <Input type="textarea" name="c-body" placeholder="Comment goes here..." value={body}
              onChange={({ target }) => this.setState({ body: target.value })} />
          </FormGroup>

          <Button color="primary" disabled={!username || !body} onClick={this.handleCommentSubmit}>Submit</Button>
        </Form>
      </div>
    );
  }
}

export default CommentComment;