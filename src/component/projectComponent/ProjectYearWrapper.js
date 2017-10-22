import React, { Component } from 'react';
import { Jumbotron, Container, Button } from 'reactstrap';
import octicons from 'octicons';
import {SparkScroll, SparkProxy} from '../SparkScroll';
import ProjectCard from './ProjectCard';


class ProjectYearWrapper extends Component {
  constructor() {
    super();
    this.renderCards = this.renderCards.bind(this);
  }

  renderYearMarks() {
    return (
      <div>
        <h3 style={{}}>{this.props.year}</h3>
        <hr style={{backgroundColor: "#d8e5fc", borderWidth: "8px", marginTop: "2em", marginBottom: "2em"}}/>
      </div>
    )
  }

  renderCards() {
    if (this.props.cards) {
      let currKey = 0;
      let cards = this.props.cards.map((card) => {
        return (
          <div className="col-sm-12 col-md-4">
          <ProjectCard key={"project-card-" + currKey++}
                            title={card.title}
                            caption={card.caption}
                            link={card.link} /*this may be undefined*/ />
          </div>
        );
      });

      let groups = [];
      let currGroup = [];
      for (let elem of cards) {
        if (currGroup.length >= 3) {
          groups.push(currGroup);
          currGroup = [];
        }
        currGroup.push(elem);
      }
      if (currGroup.length > 0) {
        groups.push(currGroup);
      }

      currKey = 0;
      let groupHTML = groups.map((group) => {
        return (
          <div className="row" key={"project-year-rows-" + currKey++} style={{marginBottom: "1.5em"}}>
            {group[0]}
            {group[1]}
            {group[2]}
          </div>
        );
      });

      return (

        <div>
          {groupHTML}
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        {/*<SparkScroll.div timeline={{*/}
          {/*// 'topBottom': {opacity: 0, transform: 'translate3d(-200px,0px,0px)'},*/}
          {/*// 'topTop-400': {opacity: 1, transform: 'translate3d(0px,0px,0px)'}*/}
          {/*'topBottom': {transform: 'translateX(-100px)'},*/}
          {/*'topTop-600': {transform: 'translateX(0px)'}*/}
        {/*}}>*/}
        {this.renderYearMarks()}
        {this.renderCards()}
        {/*</SparkScroll.div>*/}
      </div>
      );
    }
  }

  export default ProjectYearWrapper;
