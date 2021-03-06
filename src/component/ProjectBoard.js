import React, { Component } from 'react';
import { Jumbotron, Container } from 'reactstrap';
import {SparkScroll, SparkProxy} from './SparkScroll';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import ProjectYearWrapper from './projectComponent/ProjectYearWrapper';

import '../css/ProjectBoard.css';


class ProjectBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posTop: {}
    };
  }

  static propTypes = {
    project: PropTypes.array,
  };

  static defaultProps = {
    project: [
      {year: 2018, projects: [
        {title: "express-comment", caption: "Simple comment/post/response middleware for Express, powering comments of this site", link: "https://github.com/kevinkassimo/express-comment"},
        {title: "vhttps", caption: "Virtual Secure Server, host multiple HTTPS site on single port/IP address", link: "https://github.com/kevinkassimo/vhttps"},
        {title: "Memo4Me", caption: "Message forwarding & Privacy Personal Page, React + Meteor", link: "https://github.com/kevinkassimo/memo4me"},
      ]},
      {year: 2017, projects: [
        {title: "UDEngine", caption: "A minimal and extensible bullet-hell game framework on Unity3D", link: "https://github.com/UD-Engine/UDEngine"},
        {title: "DailyBruin Prime", caption: "Online Magazine for DailyBruin Prime, with Jinja2/Foundation/Flask, etc.", link: "https://github.com/daily-bruin/prime"},
        {title: "KSM.sh", caption: "THIS site, with React, Express, MySQL, Bootstrap, etc.", link: "https://github.com/kevinkassimo/ksm.sh"},
        {title: "GOKey", caption: "Command-line password vault using AES, written in Go", link: "https://github.com/kevinkassimo/gokey"},
        {title: "wotHappen", caption: "Bot on Cisco Spark using Microsoft Cognitive Service API and Sumy library", link: "https://github.com/wotHappen/wothappen"},
        {title: "slices", caption: "Go slice package to improve slice operation readability", link: "https://github.com/kevinkassimo/slices"},
        {title: "CatchLA", caption: "Powerful course scanner with auto-enroll, using PhantomJS, systemd", link: "https://github.com/kevinkassimo/catchla"},
        {title: "BUHTIG.com", caption: "Go to first OR N-th commit of any Github repository, full-stack with Node & jQuery", link: "https://github.com/kevinkassimo/buhtig"},
        {title: "DomainCatch", caption: "Brute force 4-letter domain availability WHOIS search, with Bash or raw C", link: "https://github.com/kevinkassimo/DomainCatch"},
        {title: "CryptoUpdate", caption: "PhantomJS crawl of coinMarketCap.com, get latest cryptocurrency price", link: "https://github.com/kevinkassimo/CryptoUpdate"},
        {title: "ValuateHack", caption: "Simple cookie hack on Valuate.com (so sorry...)", link: "https://github.com/kevinkassimo/ValuateHack"},
        {title: "SEASHelper", caption: "UCLA SEAS Linux Server simple helper, command parsed with Flex & Bison", link: "https://github.com/kevinkassimo/SEASHelper"},
        {title: "Delp", caption: "Chrome extension for UCLA dining service ratings (discontinued)", link: "https://github.com/kevinkassimo/Delp"},
        {title: "Glut", caption: ".IO multiplayer game with Phaser, WebGL, HTML5", link: "https://github.com/iSavor/glut"},
      ]},
      {year: 2016, projects: [
        {title: "BAAAM!", caption: "iOS/Windows/Mac/Linux game, innovative recreation of BlockBreaker", link: "http://ludumdare.com/compo/minild-67/?action=preview&uid=99828"},
        {title: "EarthWorm", caption: "Game entry for Mini Ludum Dare 67, with Unity3D", link: "https://github.com/kevinkassimo/Snake"},
        {title: "SerendiBuddy", caption: "iOS app that finds comments left nearby with CoreLocation", link: "https://github.com/M117Project/SerendiBuddy"},
        {title: "PathReader-2D", caption: "Unity3D plugin, parses parametric equation paths and move GameObjects", link: "https://github.com/PathReader/PathReader-2D"},
        {title: "JSOpen", caption: "Command-line option parser for NodeJS, inspired by Python's optparse library", link: "https://github.com/Jsopen/JSopen_optparser"},
      ]},
      {year: 2015, projects: [
        {title: "Kismet Project", caption: "Bullet-hell (Danmaku) game on Unity, inspired by Touhou"},
      ]}
    ],
  };

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);

    let posTop = {};
    for (let elem of document.getElementsByClassName("text-dim")) {
      if (elem['getBoundingClientRect']) {
        posTop[elem.id] = elem.getBoundingClientRect().top;
      } else {
        posTop[elem.id] = elem.offsetTop;
      }
    }

    this.setState({posTop: posTop});
  }

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

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  generateYearWrappers() {

    const {
      project: listProjects
    } = this.props;

    let currKey = 0;

    let renderedYearProjects = listProjects.map((entry) => {
      return (
        <ProjectYearWrapper key={"project-year-wrapper-" + currKey++}
          year={entry.year}
          cards={entry.projects} />
      );
    });

    return (
      <div>
        {renderedYearProjects}
      </div>
    );
  }


  render() {
    return (
      <div>
        <div className="ProjectBoard" onScroll={this.handleScroll}>
          <Jumbotron fluid className="bg-primary" style={{color: "white", margin: 0, width: "100%"}}>
            <Container fluid>
              <div>
                <h1 id="project-board-dim-id-0" className="text-dim project-main-title">Projects</h1>
                <h3 id="project-board-dim-id-1" className="text-dim project-main-subtitle"><i>My projects at a glance</i></h3>
              </div>
            </Container>
          </Jumbotron>


          <Jumbotron style={{backgroundColor: "white", color: "#157EFB", margin: 0}}>
            <Container fluid>
              {/*<div style={{marginBottom: "20em"}} />*/}
              {this.generateYearWrappers()}
            </Container>
          </Jumbotron>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    project: state.project || [],
  }
};

export default connect(mapStateToProps)(ProjectBoard);
