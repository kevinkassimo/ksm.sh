import React, { Component } from 'react';
import { Jumbotron, Container, Button } from 'reactstrap';
import {SparkScroll, SparkProxy} from '../SparkScroll';

import marked from 'marked';

import '../../css/BlogBoard.css'

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
      body: ""
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
          that.setState({
            title: String(meta.title),
            subtitle: String(meta.time),
            body: marked(body, {sanitize: true})
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

          <div id="article-body" dangerouslySetInnerHTML={{__html: this.state.body}} />
        </div>
      </div>
    );
  }
}

export default BlogBoard;
