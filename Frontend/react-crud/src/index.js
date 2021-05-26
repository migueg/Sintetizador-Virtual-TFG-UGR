import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import { BrowserRouter as Router, Route,Switch , Redirect} from "react-router-dom";
import App from './App';
import Login from './view/login-component';
import SignUp from './view/signup-component';
import ErrorPage from './view/errorPage-component';
import Profile from './view/profile-component';

import Nav from './view/navbar'

//import * as serviceWorker from "ser";
import reportWebVitals from './reportWebVitals';
import Cookies from 'js-cookie';

const PrivateRoute = ({isAuthenticated, ...props}) => {
  return (isAuthenticated) ? <Route {...props} /> : <Redirect to="/"/>;
};

const PublicRoute = ({isAuthenticated, ...props}) => {
  return (isAuthenticated) ?  <Redirect to="/synth"/> : <Route {...props} /> ;
};

function    isAuthenticated(){
  var token = Cookies.get('token') 
  if( token && token !== 'undefined'){
      return true;
  }else{
      return false;
  }
}
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
      <PrivateRoute exact path="/synth" isAuthenticated={isAuthenticated()} component={App}/>
      <PrivateRoute exact path="/profile" isAuthenticated={isAuthenticated()} component={Profile}/>
      <PublicRoute exact path='/signup' component={SignUp}/>
      <PublicRoute exact path='/' isAuthenticated={isAuthenticated()} component={Login}/>
      <Route component={ErrorPage}/>

    </Switch>
   

  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

