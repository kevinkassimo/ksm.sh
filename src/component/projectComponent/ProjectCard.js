import React, { Component } from 'react';
import { Card, CardTitle, CardText, Button } from 'reactstrap';
import octicons from 'octicons';
import {SparkScroll, SparkProxy} from '../SparkScroll';


class ProjectCard extends Component {
  constructor() {
    super();
  }

  renderLinkButton() {
    if (this.props.link) {
      return (
        <Button color="primary" href={this.props.link}>Go</Button>
      )
    } else {
      return (
        <Button color="primary" disabled>Not available</Button>
      )
    }
  }

  render() {
    return (
      <div>
        <Card body className="text-center hover-pop">
          <CardTitle>{this.props.title}</CardTitle>
          <CardText>{this.props.caption}</CardText>
          {this.renderLinkButton()}
        </Card>
      </div>
    );
  }
}

export default ProjectCard;
