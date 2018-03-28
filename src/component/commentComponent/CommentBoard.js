import React, { Component } from 'react';
import { Jumbotron, Container, Button } from 'reactstrap';
// import ec from 'express-comment-frontend';

import CommentCard from './CommentCard';
import CommentComment from './CommentComment';

// const comment = ec(window, '/api/comments');
const comment = {};

class CommentBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comments: [{
        "_id":"5abacf30a2515db919edd6df",
        "username":"kevin",
        "body":"0",
        "assoc":"a",
        "parentId":null,
        "opaque":null,
        "level":0,
        "createdAt":"2018-03-27T23:09:36.751Z",
        "modifiedAt":"2018-03-27T23:09:36.751Z",
        "reply":[{
          "_id":"5abadbb9921a12c16e18927c",
          "username":"kevin",
          "body":"1",
          "assoc":"a",
          "parentId":"5abacf30a2515db919edd6df",
          "opaque":null,
          "level":1,
          "createdAt":"2018-03-28T00:03:05.706Z",
          "modifiedAt":"2018-03-28T00:03:05.706Z",
          "reply":[]
        }]
      }, {
        "_id":"5abad627f6cd72bf37bba533",
        "username":"kevin",
        "body":"S",
        "assoc":"a",
        "parentId":null,
        "opaque":null,
        "level":0,
        "createdAt":"2018-03-27T23:39:19.878Z",
        "modifiedAt":"2018-03-27T23:39:19.878Z",
        "reply":[]
      }],
    };
  }

  componentDidMount() {
    const {
      articleId
    } = this.props;

    /*
    comment.findRootAll(true).on(articleId.toString()).fire()
      .then((arr) => {
        arr.sort((a, b) => new Date(b.modifiedAt) - new Date(a.modifiedAt));
        this.setState({
          comments: arr,
        });
      });
      */
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
    comment.comment(body).by(username).to(parentId).fire()
      .then(() => {
        return comment.findRootAll(true).on(articleId.toString()).fire()
      })
      .then((arr) => {
        arr.sort((a, b) => new Date(b.modifiedAt) - new Date(a.modifiedAt));
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
                              isRoot={false}
                              addReply={this.publishReply} />);
      if (c.reply) {
        c.reply.forEach((r, ind) => {
          cards.push(<CommentCard key={`c-${i}-${ind}`}
                                  postId={r._id}
                                  username={r.username}
                                  body={r.body}
                                  date={r.modifiedAt}
                                  isRoot={true} />)
        });
      }
    });

    return cards;
  }

  render() {
    return (
      <div>
        <h3>Comments</h3>
        {this.showComments()}
        <CommentComment addComment={this.publishComment} />
      </div>
    );
  }
}

export default CommentBoard;