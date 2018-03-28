import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

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
      <div className="comment-reply">
        <h5>Reply:</h5>
        <Form>
          <FormGroup>
            <Label for="cr-name">Name</Label>
            <Input type="text" name="cr-name" placeholder="Your name..." value={username}
                   onChange={({ target }) => this.setState({ username: target.value })} />
          </FormGroup>

          <FormGroup>
            <Label for="cr-body">Reply Body</Label>
            <Input type="textarea" name="cr-body" placeholder="Reply body goes here..." value={body}
                   onChange={({ target }) => this.setState({ body: target.value })} />
          </FormGroup>

          <Button disabled={!username || !body} onClick={this.handleReplySubmit}>Submit</Button>
        </Form>
      </div>
    );
  }
}

export default CommentReply;