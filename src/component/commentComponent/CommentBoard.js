import React, { Component } from 'react';
import { Jumbotron, Container, Button, Badge } from 'reactstrap';
import ec from 'express-comment-frontend';

import CommentCard from './CommentCard';
import CommentComment from './CommentComment';
import '../../css/CommentBoard.css';

const comment = ec(window, '/api/comments');


class CommentBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comments: [],
    };
  }

  componentDidMount() {
    const {
      articleId
    } = this.props;

    comment.findRootAll(true).on(articleId.toString()).fire()
      .then((arr) => {
        arr.sort((a, b) => new Date(b.modifiedAt) - new Date(a.modifiedAt));
        arr.forEach((e) => {
          if (e.reply) {
            e.reply.sort((a, b) => new Date(b.modifiedAt) - new Date(a.modifiedAt));
          }
        });
        this.setState({
          comments: arr,
        });
      });
  }

  publishComment = (username, body) => {
    const {
      articleId
    } = this.props;
    // I am just too lazy of doing caching myself...
    comment.comment(body).by(username).on(articleId.toString()).fire()
      .then(() => {
        return comment.findRootAll(true).on(articleId.toString()).fire()
      })
      .then((arr) => {
        arr.sort((a, b) => new Date(b.modifiedAt) - new Date(a.modifiedAt));
        arr.forEach((e) => {
          if (e.reply) {
            e.reply.sort((a, b) => new Date(b.modifiedAt) - new Date(a.modifiedAt));
          }
        });
        this.setState({
          comments: arr,
        });
      })
  };

  publishReply = (username, body, parentId) => {
    const {
      articleId
    } = this.props;
    // I am just too lazy of doing caching myself...
    comment.reply(body).by(username).to(parentId).fire()
      .then(() => {
        return comment.findRootAll(true).on(articleId.toString()).fire()
      })
      .then((arr) => {
        arr.sort((a, b) => new Date(b.modifiedAt) - new Date(a.modifiedAt));
        arr.forEach((e) => {
          if (e.reply) {
            e.reply.sort((a, b) => new Date(b.modifiedAt) - new Date(a.modifiedAt));
          }
        });
        this.setState({
          comments: arr,
        });
      })
  };

  showComments() {
    const cards = [];

    this.state.comments.forEach((c, i) => {
      cards.push(<CommentCard key={`c-${i}`}
                              postId={c._id}
                              username={c.username}
                              body={c.body}
                              date={c.modifiedAt}
                              isRoot={true}
                              addReply={this.publishReply} />);
      if (c.reply) {
        c.reply.forEach((r, ind) => {
          cards.push(<CommentCard key={`c-${i}-${ind}`}
                                  postId={r._id}
                                  username={r.username}
                                  body={r.body}
                                  date={r.modifiedAt}
                                  isRoot={false} />)
        });
      }
    });

    return cards;
  }

  render() {
    return (
      <div className="comment-board">
        <h3 className="comment-title">Comments <Badge color="secondary">BETA</Badge></h3>
        {this.showComments()}
        <CommentComment addComment={this.publishComment} />
      </div>
    );
  }
}

export default CommentBoard;