import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter, Route, Switch }  from 'react-router-dom';

import { Provider, connect } from 'react-redux';
import { createStore } from 'redux';

import App from './App';
import DashBoard from './component/DashBoard'
import Footer from "./component/Footer";
import ProjectBoard from "./component/ProjectBoard";
import ArticleBoard from "./component/ArticleBoard";
import NotFoundBoard from "./component/NotFoundBoard";
import BlogBoard from "./component/articleComponent/BlogBoard";
import ChatToggle from './component/ChatToggle';

import withTracker from './withTracker';
import registerServiceWorker from './registerServiceWorker';

import { aboutReducer, updateAbout as updateAboutAction } from './reducer';

const ScrollToTop = () => {
  window.scrollTo(0, 0);
  return null;
};

const store = createStore(aboutReducer);

class Wrapper extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.updateAbout();
  }

  render() {
    return (
      <BrowserRouter>
        <div style={{width: "100%"}}>
          <Route component={ScrollToTop} />
          <Route path="/" component={withTracker(App)} />
          <Switch>
            <Route exact path="/" component={DashBoard} />
            <Route path="/articles" component={ArticleBoard} />
            <Route path="/projects" component={ProjectBoard} />
            <Route path="/blog/:id" component={BlogBoard} />
            <Route path="*" component={NotFoundBoard} />
          </Switch>
          <Footer/>
          <ChatToggle/>
        </div>
      </BrowserRouter>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateAbout: () => {
      fetch('/about.json')
        .then((res) => {
          return res.json();
        })
        .then((json) => {
          dispatch(updateAboutAction(json));
        })
        .catch(() => {
          console.log('ERROR: load about failed');
        });
    }
  }
};

const ConnectedWrapper = connect(null, mapDispatchToProps)(Wrapper);

ReactDOM.render((
  <Provider store={store}>
    <ConnectedWrapper />
  </Provider>
),
document.getElementById('root'));


registerServiceWorker();
