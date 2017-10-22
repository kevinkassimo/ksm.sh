import React, { Component } from 'react';
import { Button, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

import "../css/Header.css";

class Footer extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="footer" style={{textAlign: "center", backgroundColor: "#157FFC", color: "white", fontSize: "1em", width: "100%", bottom: 0, left: 0, right: 0, display: "block"}}>
        <span>Copyright Kevin Qian, 2017. Proudly Powered by <strong>ReactJS</strong>, <strong>NOT </strong><strike>WordPress</strike></span>
      </div>
    );
  }
}

export default Footer;
