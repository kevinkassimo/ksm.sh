import React, { Component } from 'react';
import { Jumbotron, Container, Button } from 'reactstrap';
import {SparkScroll, SparkProxy} from './SparkScroll';

import '../css/SplitBoard.css';
import '../css/Circle.css';

class SkillBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  handleScroll(event) {
    for (let elem of document.getElementsByClassName("fill-circle")) {
      let classes = elem.className.split(" ");
      for (let i = 0; i < classes.length; i++) {
        if (/p.+/.test(classes[i])) {
          let elemToTop = elem.offsetTop;
          if (elem['getBoundingClientRect']) {
            elemToTop = elem.getBoundingClientRect().top;
          }
          let elemTriggerStart = 500;
          let percent = 0;
          if (elemToTop > elemTriggerStart) {
            percent = 0;
          } else {
            //console.log(elemTriggerStart, elemToTop, (elemTriggerStart - elemToTop) / 100);
            let diff = (elemTriggerStart - elemToTop) / 200;
            if (diff > 1) {
              diff = 1;
            }
            let getTargetPercentage = Number(elem.getElementsByTagName('span')[0].innerHTML.toString().replace('%', ''));
            percent = Math.trunc(diff * getTargetPercentage);
          }
          classes[i] = "p" + percent.toString();
        }
      }
      elem.className = classes.join(' ');
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }


  renderBoardLayout() {
    let count = 0;
    let circles = this.props.skills.map((skill) => {
      return (
        <div className="col-sm-12 col-lg-3" key={"circles" + count++} style={{marginBottom: "4em"}}>
          <div className="fill-circle c100 p50 big" style={{zIndex: 0, float: "none", textAlign: "center", margin: "0 auto", marginBottom: "10px"}} align="center">
            <span style={{color: "#157EFB"}}>{skill.percent}</span>
            <div className="slice">
              <div className="bar" style={{borderColor: "#157EFB"}} />
              <div className="fill" style={{borderColor: "#157EFB"}} />
            </div>
          </div>
          <div style={{textAlign: "center", fontSize: "2em"}}>{skill.name}</div>
        </div>
      );
    });

    let groups = [];
    let currGroup = [];
    for (let elem of circles) {
      if (currGroup.length >= 4) {
        groups.push(currGroup);
        currGroup = [];
      }
      currGroup.push(elem);
    }
    if (currGroup.length > 0) {
      groups.push(currGroup);
    }

    count = 0;
    let groupHTML = groups.map((group) => {
      return (
        <div className="row" key={"circle-rows-" + count++}>
          {group[0]}
          {group[1]}
          {group[2]}
          {group[3]}
        </div>
      );
    });

    return (
      <div>
        <h1 style={{textAlign: "center", marginBottom: "2em"}}>Skills</h1>
        {groupHTML}
      </div>
    );
  }


  render() {
    return (
      <div className="SkillBoard">
        <Jumbotron fluid style={{backgroundColor: this.props.boardColor, color: this.props.textColor, margin: 0}}>
          <Container fluid>
            {this.renderBoardLayout()}
          </Container>
        </Jumbotron>
      </div>
    );
  }
}

export default SkillBoard;
