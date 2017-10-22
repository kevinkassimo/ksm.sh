import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Header from './component/Header';
import Footer from "./component/Footer";

class App extends Component {
  renderChildren() {
    if (this.props.children) {
      return this.props.children;
    }
    return;
  }

  componentDidMount() {
    // Hack body CSS
    //document.body.style.backgroundImage = "url(../img/milkyway.jpg)";
  }

  render() {
    return (
        <div>
            <Header />
            {this.renderChildren()}
        </div>
    );
  }
}

export default App;
