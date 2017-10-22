import React, { Component } from 'react';
import { Jumbotron, Container, Button } from 'reactstrap';
import octicons from 'octicons';
import {SparkScroll, SparkProxy} from './SparkScroll';


class ArticleBoard extends Component {
  constructor() {
    super();
  }

  render() {
    return (
        <div className="UnderConstructionBoard" onScroll={this.handleScroll}>
          <div style={{position: "absolute", top: "40%", width: "100%", textAlign: "center", color: "#157FFC"}}>
            <h1 style={{marginBottom: "1em"}}>Articles Under Construction, LOL</h1>
            <h2 style={{marginBottom: "1em"}}>Go to Expr.io instead!</h2>
            <Button href="http://expr.io" color="primary" style={{width: "30%"}}>Go</Button>
          </div>
        </div>
    );
  }
}

export default ArticleBoard;
