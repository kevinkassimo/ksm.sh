import React, { Component } from 'react';
import { Jumbotron, Container, Button } from 'reactstrap';
import octicons from 'octicons';
import {SparkScroll, SparkProxy} from './SparkScroll';


class NotFoundBoard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="UnderConstructionBoard" onScroll={this.handleScroll}>
          <div style={{position: "absolute", top: "40%", width: "100%", textAlign: "center", color: "#157EFB"}}>
            <h1 style={{fontSize: "5em"}}>404</h1>
            <h2 style={{marginBottom: "1em"}}>NOT FOUND</h2>
            <Button href="/#" color="primary" style={{width: "30%"}}>Home</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default NotFoundBoard;
