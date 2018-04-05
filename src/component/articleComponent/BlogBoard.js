import React, { Component } from 'react';
import { Jumbotron, Container, Button } from 'reactstrap';
import {SparkScroll, SparkProxy} from '../SparkScroll';
import CommentBoard from '../commentComponent/CommentBoard';

import '../../css/BlogBoard.css'

import marked from 'marked';
import {
  ShareButtons,
  ShareCounts,
  generateShareIcon,
} from 'react-share';
const {
  FacebookShareButton,
  GooglePlusShareButton,
  TwitterShareButton,
} = ShareButtons;

const {
  FacebookShareCount,
  GooglePlusShareCount,
} = ShareCounts;
const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');
const GooglePlusIcon = generateShareIcon('google');

// marked.setOptions({
//   highlight: function (code, lang, callback) {
//     require('pygmentize-bundled')({ lang: lang, format: 'html' }, code, function (err, result) {
//       callback(err, result.toString());
//     });
//   }
// });

class BlogBoard extends Component {
  constructor() {
    super();
    this.state = {
      title: "Loading...",
      subtitle: "Loading...",
      body: "",
      shareButtons: [],
      notLoaded: true,
    };
  }

  componentDidMount() {
    // AJAX call
    let xhr = new XMLHttpRequest();
    let that = this;
    xhr.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        try {
          let [meta, body] = that.parseArticle(this.responseText);
          document.title = meta.title + " - KSM.sh"; // Set title
          that.setState({
            title: String(meta.title),
            subtitle: String(meta.time),
            body: marked(body, {sanitize: true}),
            shareButtons: [
              that.craftShareIcon('facebook', document.URL, meta.title + " - KSM.sh"),
              that.craftShareIcon('twitter', document.URL, meta.title + " - KSM.sh"),
              that.craftShareIcon('google', document.URL, meta.title + " - KSM.sh")
            ],
            notLoaded: false,
          });
          that.hideLoadingBoard();
        } catch (e) {
          console.warn(e);
        }
      } else if (this.readyState === 4) {
        that.setState({
          title: "404 Not Found",
          subtitle: "Article Not Found"
        })
      }
    };

    xhr.open('GET', `/api/article?id=${this.props.match.params.id}`, true);
    xhr.send();
  }

  parseArticle = (source) => {
    let sections = source.split('======');
    return [JSON.parse(sections[0]), sections[1]];
  };

  hideLoadingBoard = () => {
    this.loadingBoard.style.display = "none";
  };

  craftShareIcon = (typeName, shareUrl, title) => {
    switch (typeName) {
    case "facebook":
      return (
        <div className="share-network">
          <FacebookShareButton
            url={shareUrl}
            quote={title}
            className="share-button">
            <FacebookIcon
              size={32}
              round />
          </FacebookShareButton>

          <FacebookShareCount
            url={shareUrl}
            className="share-count">
            {count => count}
          </FacebookShareCount>
        </div>
      );
      break;
    case "twitter":
      return (
        <div className="share-network">
          <TwitterShareButton
            url={shareUrl}
            title={title}
            className="share-button">
            <TwitterIcon
              size={32}
              round />
          </TwitterShareButton>
        </div>
      );
      break;
    case "google":
      return (
        <div className="share-network">
          <GooglePlusShareButton
            url={shareUrl}
            className="share-button">
            <GooglePlusIcon
              size={32}
              round />
          </GooglePlusShareButton>

          <GooglePlusShareCount
            url={shareUrl}
            className="share-count">
            {count => count}
          </GooglePlusShareCount>
        </div>
      );
      break;
    default:
      return (
        <div/>
      );
    }
  };

  render() {
    return (
      <div>
        <div className="BlogBoard" onScroll={this.handleScroll}>
          <Jumbotron fluid className="bg-primary" style={{color: "white", margin: 0, width: "100%"}}>
            <Container fluid>
              <div>
                <h1 className="text-dim article-main-title">{this.state.title}</h1>
                <h3 className="text-dim article-main-subtitle"><i>{this.state.subtitle}</i></h3>
              </div>
            </Container>
          </Jumbotron>

          <div ref={loading => this.loadingBoard = loading}>
            <h1 className="article-loading">LOADING...</h1>
          </div>

          <div id="share-list">
            {this.state.shareButtons}
          </div>
          <div id="article-body" dangerouslySetInnerHTML={{__html: this.state.body}} />
        </div>
        {!this.state.notLoaded &&
          <CommentBoard articleId={this.props.match.params.id.toString()} />
        }
      </div>
    );
  }
}

export default BlogBoard;
