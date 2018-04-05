import React, { Component } from 'react';
import { Jumbotron, Container, Button } from 'reactstrap';
import octicons from 'octicons';
import {SparkScroll, SparkProxy} from './SparkScroll';

import '../css/SplitBoard.css'

class SplitBoard extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  /* Props:
   * imgPos: left, right
   * imgName: string
   * title: title
   * points: [[title, caption]]
   * boardColor: string
   * textColor: string
   */

  makePadding() {
    if (this.props.imgPos === 'left') {
      return {paddingLeft: "5%"};
    } else {
      return {paddingRight: "5%"};
    }
  }

  generateScrollTimeLine() {
    if (this.props.imgPos === 'left') {
      return {
        // 'topBottom': {opacity: 0, transform: 'translate3d(-200px,0px,0px)'},
        // 'topTop-400': {opacity: 1, transform: 'translate3d(0px,0px,0px)'}
        'topBottom': {opacity: 0, transform: 'translateX(-200px)'},
        'topTop-400': {opacity: 1, transform: 'translateX(0px'}
      };
    } else {
      return {
        'topBottom': {opacity: 0, transform: 'translateX(-200px)'},
        'topTop-400': {opacity: 1, transform: 'translateX(0px)'}
      };
    }
  }

  renderBoardLayout() {
    if (this.props.imgPos === 'left') {
      return (
        <SparkScroll.div timeline={this.generateScrollTimeLine()}>
          <h1 style={{textAlign: "center"}}>{this.props.title}</h1>
          <div className="row">
            <div className="col-md-4">
              {this.renderImage()}
            </div>
            <div className="col-md-8">
              {this.renderText()}
            </div>
          </div>
        </SparkScroll.div>
      );
    } else {
      return (
        <SparkScroll.div timeline={this.generateScrollTimeLine()}>
          <h1 style={{textAlign: "center"}}>{this.props.title}</h1>
          <div className="row">
            <div className="col-md-8">
              {this.renderText()}
            </div>
            <div className="col-md-4">
              {this.renderImage()}
            </div>
          </div>
        </SparkScroll.div>
      );
    }
  }

  renderImage() {
    return (
      <div style={{textAlign: "center", display: "block"}} dangerouslySetInnerHTML={{__html: octicons[this.props.imgName].toSVG({width: "200", height: "200", fill: this.props.textColor})}} />
    );
  }

  renderText() {
    let currKey = 0;
    let lines = this.props.points.map((p) => {
      if (p.link !== undefined) {
        return (
          <li key={"point_" + String(currKey++)} style={{listStyle: "none"}}>
            <span style={{fontSize: "1.2em"}}><strong>{p.title + ": "}</strong></span>
            <a href={p.link}>
              <span style={{fontSize: "1.2em"}}>{p.caption}</span>
            </a>
          </li>
        );
      } else {
        return (
          <li key={"point_" + String(currKey++)} style={{listStyle: "none"}}>
            <span style={{fontSize: "1.2em"}}><strong>{p.title + ": "}</strong></span>
            <span style={{fontSize: "1.2em"}}>{p.caption}</span>
          </li>
        );
      }
    });

    return (
      <ul>
        {lines}
      </ul>
    );
  }

  render() {
    return (
      <div className="SplitBoard" onScroll={this.handleScroll}>
        <Jumbotron fluid style={{backgroundColor: this.props.boardColor, color: this.props.textColor, margin: 0}}>
          <Container fluid>
            {this.renderBoardLayout()}
          </Container>
        </Jumbotron>
      </div>
    );
  }
}

export default SplitBoard;
