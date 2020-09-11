import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.scss';
import App from './components/app/app.component';
import EventEngine from './libs/event-engine.lib';

const eventEngine = new EventEngine();
eventEngine.init();
ReactDOM.render(
  <Router>
    <App eventEngine={eventEngine} />
  </Router>,
  document.getElementById('root')
);
