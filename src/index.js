import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter, Route, Link, Switch }  from 'react-router-dom';


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

const ScrollToTop = () => {
  window.scrollTo(0, 0);
  return null;
};

ReactDOM.render((
    <BrowserRouter>
      <div>
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
    ),
    document.getElementById('root'));


//registerServiceWorker();
