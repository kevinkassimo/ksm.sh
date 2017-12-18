import React, { Component } from 'react';
import { Jumbotron, Container, Button } from 'reactstrap';
import {SparkScroll, SparkProxy} from './SparkScroll';

import '../css/ArticleBoard.css'


class ArticleBoard extends Component {
  constructor() {
    super();
    this.state = {
      posTop: {},
      articleEntries: []
    };

    this.toID = -1;
    this.fetchLock = false;
  }

  componentDidMount() {
    // Color handling
    window.addEventListener('scroll', this.handleScroll);

    let posTop = {};
    for (let elem of document.getElementsByClassName("text-dim")) {
      posTop[elem.id] = elem.offsetTop;
    }

    this.setState({posTop: posTop});

    // AJAX call
    this.fetchLock = true;
    let xhr = new XMLHttpRequest();
    let that = this;
    xhr.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        try {
          that.toID = Number(JSON.parse(this.responseText).count);
        } catch (e) {
          console.warn(e);
        }
        that.fetchLock = false;
        that.showMoreBoard();
        that.handleLoadMore(null, true);
      }
    };

    xhr.open('GET', '/api/article-count', true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send();

    window.onscroll = this.handleLoadMore;
  }

  hideLoadingBoard = () => {
    this.loadingBoard.style.display = "none";
  };

  hideMoreBoard = () => {
    this.moreBoard.style.display = "none";
  };

  showMoreBoard = () => {
    this.moreBoard.style.display = "block";
  };

  processLinks = (res) => {
    // Format
    // [{title: "", time: "", file_path: ""}...]
    let articleEntries = [];
    res.sort((a, b) => {
      return b.id - a.id;
    });
    for (let entry of res) {
      articleEntries.push(this.createArticleEntry(entry))
    }

    this.setState({
      articleEntries: this.state.articleEntries.slice().concat(articleEntries)
    });
  };

  createArticleEntry = (entry) => {
    if (entry === undefined || entry === null) {
      entry = {title: "Untitled", time: "01-01-1970", id: "-1"};
    }
    return (
      <div className="article-card">
        <a href={"/blog/" + entry.id}>
          <h3 className="article-card-title">{entry.title}</h3>
          <h5 className="article-card-time">{entry.time.split('T')[0]}</h5>
          <div style={{clear: "both"}} />
        </a>
      </div>
    )
  };

  handleScroll = (event) => {
    for (let elem of document.getElementsByClassName("text-dim")) {
      let nextOpacity = (elem.offsetTop) / this.state.posTop[elem.id];
      if (elem['getBoundingClientRect']) {
        nextOpacity = (elem.getBoundingClientRect().top) / this.state.posTop[elem.id];
      }
      if (nextOpacity >= 0) {
        elem.style.opacity = nextOpacity;
      }
    }
  };


  handleLoadMore = (event, shouldNotCheckScroll=false) => {
    if (!shouldNotCheckScroll) {
      let d = document.documentElement;
      let offset = d.scrollTop + window.innerHeight;
      let height = d.offsetHeight;

      if (offset !== height) {
        return;
      }
    }

    if (this.moreBoard.style.display === 'none') {
      // ignore
    } else {
      if (this.toID <= 0) {
        this.hideMoreBoard();
      } else if (this.fetchLock) {
        // ignore
      } else {
        this.fetchLock = true;
        window.removeEventListener('scroll', this.handleScroll);

        let xhr = new XMLHttpRequest();
        let that = this;
        xhr.onreadystatechange = function() {
          if (this.readyState === 4 && this.status === 200) {
            that.toID -= 10;
            try {
              that.hideLoadingBoard();
              let entries = JSON.parse(this.responseText).info;
              that.processLinks(entries);
              that.fetchLock = false;
              window.addEventListener('scroll', that.handleScroll);
            } catch (e) {
              console.warn(e);
              that.hideMoreBoard();
              that.fetchLock = false;
              window.addEventListener('scroll', that.handleScroll);
            }
          }
        };
        xhr.open('GET', `/api/article-info?from=${this.toID-9}&to=${this.toID}`, true);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.send();
      }
    }
  };



  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  render() {
    return (
      <div>
        <div className="ArticleBoard" onScroll={this.handleScroll}>
          <Jumbotron fluid className="bg-primary" style={{color: "white", margin: 0, width: "100%"}}>
            <Container fluid>
              <div>
                <h1 className="text-dim article-main-title">Articles</h1>
                <h3 className="text-dim article-main-subtitle"><i>My posts</i></h3>
              </div>
            </Container>
          </Jumbotron>

          <div ref={loading => this.loadingBoard = loading}>
            <h1 className="article-loading">LOADING...</h1>
          </div>

          {this.state.articleEntries}

          <div ref={more => this.moreBoard = more} style={{display: "none"}}>
            <h1 className="article-more">MORE...</h1>
          </div>
        </div>
      </div>
    );
  }
}

export default ArticleBoard;
