import React, { Component } from 'react';
import { Jumbotron, Container, Button } from 'reactstrap';
import octicons from 'octicons';
import {SparkScroll, SparkProxy} from './SparkScroll';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import '../css/DashBoard.css';

import SplitBoard from './SplitBoard';
import SkillBoard from './SkillBoard'


class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posTop: {}
    };
  }

  static propTypes = {
    about: PropTypes.array,
    education: PropTypes.array,
    contact: PropTypes.array,
    skill: PropTypes.array,
  };

  static defaultProps = {
    about: [
      {title: "Preferred Name", caption: "Kevin Qian"},
      {title: "Real Name", caption: "Kun Qian (钱坤 / 錢坤)"},
      {title: "Pen Name", caption: "Kismet Kassimo (KSM) (凯斯迈 / 凱斯邁)"},
      {title: "Github Handle", caption: "@kevinkassimo", link: "http://github.com/kevinkassimo"},
      {title: "Introduction", caption: "Hi, this is Kevin Qian. I am currently a Computer Science junior. Besides, I am also an amateur musician, video content creator (not on Youtube though), and an Indie game developer (not as career, but just for fun). My favorite games are Touhou and The Binding of Isaac. I love Coke (and Pepsi)!"}
    ],
    education: [
      {title: "Education", caption: "University of California, Los Angeles (UCLA)"},
      {title: "Degree", caption: "B.S. Computer Science (Junior, graduating Spring 2019)"},
      {title: "GPA", caption: "3.97 / 4.00"},
      {title: "Course Taken", caption: "Operating System, Networking, Programming Language, Database, Artificial Intelligence, Web Application"},
      {title: "Activites 1", caption: "Web Developer @ DailyBruin Prime"},
      {title: "Activites 2", caption: "Software Engineering Intern @ Tutorfly"},
      {title: "Honors", caption: "UCLA UPE Computer Science Honor Society Member"}
    ],
    contact: [
      {title: "School Email", caption: "kunqian@ucla.edu"},
      {title: "Personal Email", caption: "kevinkassimo@gmail.com"},
      {title: "Address", caption: "330 De Neve Drive, Westwood, Los Angeles, CA 90024"},
      {title: "Blog Website", caption: "KSM.sh/articles", link: "http://ksm.sh/articles"}
    ],
    skill: [
      {name: "JavaScript/Node", percent: "95%"},
      {name: "Unity3D/C#", percent: "90%"},
      {name: "C", percent: "90%"},
      {name: "HTML/CSS/Sass", percent: "80%"},
      {name: "React", percent: "80%"},
      {name: "Express", percent: "75%"},
      {name: "Python", percent: "75%"},
      {name: "Go", percent: "65%"},
      {name: "jQuery", percent: "60%"},
      {name: "C++", percent: "60%"},
      {name: "Linux/Shell", percent: "40%"},
      {name: "SQL/Mongo", percent: "35%"},
      {name: "Jinja/Nunjucks", percent: "35%"},
      {name: "PHP/Java/JSP", percent: "35%"},
      {name: "Swift", percent: "35%"},
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


  render() {
    const {
      about: aboutMeList,
      education: educationList,
      contact: contactList,
      skill: skillList,
    } = this.props;

    return (
      <div style={{overflow: "hidden"}}>
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
                <div className="text-dim" id="j-text-5" style={{display: "flex"}}>
                  <div style={{marginRight: "1em"}} dangerouslySetInnerHTML={{__html: octicons['mark-github'].toSVG({fill: "white", width: "2em", height: "2em"})}} />
                  <Button color="light" style={{color: "#157EFB"}} href="http://github.com/kevinkassimo">Github Profile</Button>
                  <div style={{marginLeft: "1em", marginRight: "1em"}} dangerouslySetInnerHTML={{__html: octicons['file'].toSVG({fill: "white", width: "2em", height: "2em"})}} />
                  <Button color="light" style={{color: "#157EFB"}} href="http://ksm.sh/files/resume.pdf">Resume</Button>
                </div>
                <div style={{paddingTop: "5em"}}/>
              </div>
            </Container>
          </Jumbotron>
        </div>

        <SplitBoard imgPos="left" imgName="octoface" title="About"
          points={aboutMeList}
          boardColor="white" textColor="#157EFB"/>



        <SplitBoard imgPos="right" imgName="mortar-board" title="Education"
          points={educationList}
          boardColor="#157EFB" textColor="white"/>

        <SkillBoard title="Skills" skills={skillList}
          boardColor="white" textColor="#157EFB"/>



        <div className="SplitBoard" onScroll={this.handleScroll}>
          <Jumbotron fluid style={{backgroundColor: "#157EFB", color: "white", margin: 0}}>
            <Container fluid>
              <SparkScroll.div timeline={{
                'topBottom-50': {opacity: 0, transform: 'translateX(200px)'},
                'topBottom+250': {opacity: 1, transform: 'translateX(0px)'}
              }}>
                <h1 style={{textAlign: "center"}}>Projects</h1>
                <div className="row">
                  <div className="col-md-8">
                    <p style={{textAlign: "center", fontSize: "1.2em", marginTop: "1em"}}>You don't know me before checking out my projects!</p>
                    <div className="row" style={{margin: "2em auto"}}>
                      <Link to="/projects" style={{margin: "auto"}}><Button className="col-xs-4" color="light" style={{color: "#157EFB", margin: "0 auto"}}>Go to Project Page</Button></Link>
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
          boardColor="white" textColor="#157EFB"/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    about: state.about || [],
    education: state.education || [],
    contact: state.contact || [],
    skill: state.skill || [],
  };
};

export default connect(mapStateToProps)(DashBoard);
