
import './css/App.css';
import React from 'react'
import { BrowserRouter,Route } from 'react-router-dom'
import Nav from './view/navbar'
import OscComponents from './view/osc-components'
import Header from './view/head-component';
import Piano from './view/piano-component'

/**
 * Es la clase principal que contiene todos los componentes organizados
 *
 * @class App
 * @constructor
 */

function App() {
  return (
    <div className="App" 
     // style={{backgroundColor: '#282828'}}
     >
     
      <BrowserRouter>
        <div>
            <Nav />
            <div className="header">
              <Header />
            </div>
           
            <div className="oscillators">
              <Route exact path="/" component={OscComponents} /> 
            </div>

            <div className="piano">
              <Piano /> 
            </div>

        </div>
      </BrowserRouter>
  
    
    </div>
  );
}
/**
 * Modulo de la aplicación
 * 
 * @module App
 */

export default App;
