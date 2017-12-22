import React, { Component } from 'react';
import { Jumbotron, Container, Button } from 'reactstrap';
import octicons from 'octicons';
import {SparkScroll, SparkProxy} from './SparkScroll';
import { Link } from 'react-router-dom';

import '../css/DashBoard.css';

import SplitBoard from './SplitBoard';
import SkillBoard from './SkillBoard'


class DashBoard extends Component {
  constructor() {
    super();
    this.state = {
      posTop: {}
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);

    let posTop = {};
    for (let elem of document.getElementsByClassName("text-dim")) {
      //posTop[elem.id] = elem.getBoundingClientRect().top;
      posTop[elem.id] = elem.offsetTop;
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


  render() {
    let aboutMeList = [
      {title: "Preferred Name", caption: "Kevin Qian"},
      {title: "Real Name", caption: "Kun Qian (钱坤 / 錢坤)"},
      {title: "Pen Name", caption: "Kismet Kassimo (KSM) (凯斯迈 / 凱斯邁)"},
      {title: "Github Handle", caption: "@kevinkassimo", link: "http://github.com/kevinkassimo"},
      {title: "Introduction", caption: "Hi, this is Kevin Qian. I am currently a Computer Science junior. Besides, I am also an amateur musician, video content creator (not on Youtube though), and an Indie game developer (not as career, but just for fun). My favorite games are Touhou and The Binding of Isaac. I love Coke (and Pepsi)!"}
    ];

    let educationList = [
      {title: "Education", caption: "University of California, Los Angeles (UCLA)"},
      {title: "Degree", caption: "B.S. Computer Science (Junior, graduating Spring 2019)"},
      {title: "GPA", caption: "3.97 / 4.00"},
      {title: "Course Taken", caption: "Operating System, Networking, Programming Language, Database, Artificial Intelligence"},
      {title: "Activites", caption: "Web Developer @ DailyBruin Prime"},
      {title: "Honors", caption: "UCLA UPE Computer Science Honor Society Member"}
    ];

    let contactList = [
      {title: "School Email", caption: "kunqian@ucla.edu"},
      {title: "Personal Email", caption: "kevinkassimo@gmail.com"},
      {title: "Address", caption: "330 De Neve Drive, Westwood, Los Angeles, CA 90024"},
      {title: "Blog Website", caption: "KSM.sh/articles", link: "http://ksm.sh/articles"}
    ];

    let skillList = [
      {name: "JavaScript", percent: "95%"},
      {name: "Unity3D/C#", percent: "90%"},
      {name: "C", percent: "90%"},
      {name: "HTML/CSS/Sass", percent: "80%"},
      {name: "React", percent: "75%"},
      {name: "Express", percent: "75%"},
      {name: "Python", percent: "75%"},
      {name: "Node", percent: "70%"},
      {name: "Go", percent: "65%"},
      {name: "jQuery", percent: "60%"},
      {name: "Linux/Shell", percent: "40%"},
      {name: "SQL", percent: "35%"},
      {name: "Jinja", percent: "35%"},
      {name: "PHP", percent: "35%"},
      {name: "Swift", percent: "35%"},
    ];


    return (
      <div>
      <div className="DashBoard" onScroll={this.handleScroll}>
        <Jumbotron fluid className="bg-primary" style={{color: "white", margin: 0, width: "100%"}}>
          <Container fluid>
            <div style={{paddingLeft: "5%"}}>
            <h1 className="display-1 text-dim" id="j-text-0" style={{paddingTop: "5%"}}>Hi</h1>
            <br/>
              <br/>
            <h1 className="display-5 text-dim" id="j-text-1">Welcome to KSM.sh</h1>
            <br/>
            <p className="lead text-dim" id="j-text-2">Homepage of Kevin (Kun) "KSM" Qian</p>
            <hr className="my-2 text-dim" id="j-text-3" style={{borderColor: "white"}}/>
              <br/>
            <p className="lead text-dim" id="j-text-4">My Github profile is always my best resume.</p>
            <div className="text-dim">
              <div style={{float: "left", marginRight: "1em"}} dangerouslySetInnerHTML={{__html: octicons['mark-github'].toSVG({fill: "white", width: "2em", height: "2em"})}} />
              <Button color="light" style={{color: "#157FFC"}} href="http://github.com/kevinkassimo">Github Profile</Button>
            </div>
              <div style={{paddingTop: "5em"}}/>
            </div>
          </Container>
        </Jumbotron>
      </div>

      <SplitBoard imgPos="left" imgName="octoface" title="About"
                  points={aboutMeList}
                  boardColor="white" textColor="#157FFC"/>



        <SplitBoard imgPos="right" imgName="mortar-board" title="Education"
                    points={educationList}
                    boardColor="#157FFC" textColor="white"/>

        <SkillBoard title="Skills" skills={skillList}
                    boardColor="white" textColor="#157FFC"/>



        <div className="SplitBoard" onScroll={this.handleScroll}>
          <Jumbotron fluid style={{backgroundColor: "#157FFC", color: "white", margin: 0}}>
            <Container fluid>
              <SparkScroll.div timeline={{
                // 'topBottom': {opacity: 0, transform: 'translate3d(-200px,0px,0px)'},
                // 'topTop-400': {opacity: 1, transform: 'translate3d(0px,0px,0px)'}
                'topBottom': {opacity: 0, transform: 'translateX(-200px)'},
                'topTop-400': {opacity: 1, transform: 'translateX(0px)'}
              }}>
                <h1 style={{textAlign: "center"}}>Projects</h1>
                <div className="row">
                  <div className="col-md-8">
                    <p style={{textAlign: "center", fontSize: "1.2em", marginTop: "1em"}}>You don't know me before checking out my projects!</p>
                    <div className="row" style={{margin: "2em auto"}}>
                    <Link to="/projects" style={{margin: "auto"}}><Button className="col-xs-4" color="light" style={{color: "#157FFC", margin: "0 auto"}}>Go to Project Page</Button></Link>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div style={{textAlign: "center", display: "block"}} dangerouslySetInnerHTML={{__html: octicons.repo.toSVG({width: "200", height: "200", fill: "white"})}} />
                  </div>
                </div>
              </SparkScroll.div>
            </Container>
          </Jumbotron>
        </div>



        <SplitBoard imgPos="left" imgName="mail" title="Contact"
                    points={contactList}
                    boardColor="white" textColor="#157FFC"/>
      </div>
    );
  }
}

export default DashBoard;
