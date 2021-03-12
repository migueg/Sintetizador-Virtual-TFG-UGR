import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import App from './App';
//import * as serviceWorker from "ser";
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <Router>
    <Route path="/" component={App}/>
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
