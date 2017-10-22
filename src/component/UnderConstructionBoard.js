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



          {/*<Jumbotron fluid className="bg-primary" style={{color: "white", margin: 0, width: "100%"}}>*/}
            {/*<Container fluid>*/}
              {/*<div style={}>*/}
                {/*<h1 className="text-dim project-main-title">Projects</h1>*/}
                {/*<h3 className="text-dim project-main-subtitle"><i>My projects at a glance</i></h3>*/}
              {/*</div>*/}
            {/*</Container>*/}
          {/*</Jumbotron>*/}
        </div>
      </div>
    );
  }
}

export default UnderConstructionBoard;
