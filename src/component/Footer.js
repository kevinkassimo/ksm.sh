import React, { Component } from 'react';
import { Button, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

import "../css/Header.css";

class Footer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="footer" style={{textAlign: "center", backgroundColor: "#157EFB", color: "white", fontSize: "1em", width: "100%", bottom: 0, left: 0, right: 0, display: "block"}}>
        <span>© Kevin Qian, 2018. Proudly Powered by <strong>ReactJS/Express/MySQL</strong>, <strong>NOT </strong><strike>WordPress</strike></span>
      </div>
    );
  }
}

export default Footer;
