import React, { Component } from 'react';
import { Jumbotron, Container, Button } from 'reactstrap';
import octicons from 'octicons';
import {SparkScroll, SparkProxy} from './SparkScroll';


class UnderConstructionBoard extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <div className="UnderConstructionBoard" onScroll={this.handleScroll}>
          <div style={{position: "absolute", left: "50%", right: "50%"}}>
            <h1>Under Construction, LOL</h1>
          </div>
        </div>
      </div>
    );
  }
}

export default UnderConstructionBoard;
