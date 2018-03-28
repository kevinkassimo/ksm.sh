import React, { Component } from 'react';
import { Jumbotron, Container, Button, Badge } from 'reactstrap';

import CommentReply from './CommentReply';

class CommentCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isReplyShown: false,
    };
  }

  render() {
    const {
      postId,
      username,
      body,
      date,
      isRoot,
    } = this.props;
    const {
      isReplyShown
    } = this.state;
    return (
      <div className={isRoot ? 'comment-card' : 'comment-card comment-card-indent'}>

        <h5>{username} <Badge color="primary">@ {new Date(date).toLocaleDateString()}</Badge> </h5>
        <p>{body}</p>
        {isRoot &&
          <Button outline color="primary"
            onClick={() => this.setState(prevState => {
              return {
                isReplyShown: !prevState.isReplyShown
              }
            })}>{isReplyShown ? 'Hide Reply...' : 'Reply...'}</Button>
        }
        {isReplyShown &&
          <CommentReply parentId={postId} addReply={(username, body, parentId) => {
            this.props.addReply(username, body, parentId);
            this.setState({
              isReplyShown: false,
            });
          }} />
        }
      </div>
    );
  }
}

export default CommentCard;