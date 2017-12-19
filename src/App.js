import React, { Component } from 'react';
import 'babel-polyfill';
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

    componentWillMount() {
        // NodeList.prototype[Symbol.iterator] = [][Symbol.iterator];
        // HTMLCollection.prototype[Symbol.iterator] = [][Symbol.iterator];
    }

    componentDidMount() {
       // Hack body CSS
        document.title = "Welcome to KSM.sh";
        //document.body.style.backgroundImage = "url(../img/milkyway.jpg)";
        window.onbeforeunload = function easterEgg() {
            document.write("<h1>SUPER SECRET EasterEgg when unloading -- not quite LOL</h1>");
            document.write("<p>OOOPS -- KSM</p>");
            document.close();
        }
    }

    createGTag() {
        return (
                <div>
                <script async src="https://www.googletagmanager.com/gtag/js?id=UA-109679226-2"></script>
                <script dangerouslySetInnerHTML={{__html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'UA-109679226-2');
                    `}} />
                    </div>
               )
    }

    render() {
        return (
                <div>
                <Header />
                {this.renderChildren()}
                {this.createGTag()}
                </div>
               );
    }
}

export default App;
