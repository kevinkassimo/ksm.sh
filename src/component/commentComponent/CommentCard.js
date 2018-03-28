import React, { Component } from 'react';
import { Jumbotron, Container, Button } from 'reactstrap';

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
      <div className={isRoot ? 'comment-card-indent' : 'comment-card'}>
        <p>{username}</p>
        <p>{new Date(date).toLocaleDateString()}</p>
        <p>{body}</p>
        {isRoot &&
          <button
            onClick={() => this.setState(prevState => {
              return {
                isReplyShown: !prevState.isReplyShown
              }
            })}>{isReplyShown ? 'Hide Reply...' : 'Reply...'}</button>
        }
        {isReplyShown &&
          <CommentReply parentId={postId} addReply={this.props.addReply} />
        }
      </div>
    );
  }
}

export default CommentCard;