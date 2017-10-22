import React, { Component } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

import "../css/Header.css";

class Header extends Component {
    constructor() {
        super();
        this.state = {
            entries: [
                ["Articles", "/articles"],
                ["Projects", "/projects"],
                ["Github", "http://github.com/kevinkassimo"]
            ]
        }
    }

    componentDidMount() {

    }

    createNavButtons() {
        let navButtons = this.state.entries.map((entry) => {
            return (
                <NavItem key={entry[0]}>
                    <NavLink href={entry[1]}>{entry[0]}</NavLink>
                </NavItem>
            );
        });

        return navButtons;
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    };

    render() {
        return (
            <div className="Header">
                <Navbar light expand="md" className="navbar-dark bg-primary">
                    <NavbarBrand href="/#">KSM</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            {this.createNavButtons()}
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

export default Header;