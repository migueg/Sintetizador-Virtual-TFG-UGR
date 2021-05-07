import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import { BrowserRouter as Router, Route,Switch } from "react-router-dom";
import App from './App';
import Login from './view/login-component';
import SingUp from './view/singup-component';

import Nav from './view/navbar'

//import * as serviceWorker from "ser";
import reportWebVitals from './reportWebVitals';

/**
 * Renderiza toda la aplicación
 *
 * @class Index
 * @constructor
 */

ReactDOM.render(

  <Router>
      <Nav />
    <Switch>
      <Route path="/synth" component={App}/>
      <Route path='/singup' component={SingUp}/>
      <Route path='/' component={Login}/>
      
    </Switch>
   

  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

