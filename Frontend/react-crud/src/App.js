
import './css/App.css';
import React from 'react'
import { BrowserRouter,Route } from 'react-router-dom'
import Nav from './view/navbar'
import OscComponents from './view/osc-components'
import Header from './view/head-component';
import Piano from './view/piano-component'
import FX from './view/fx-components';

/**
 * Es la clase principal que contiene todos los componentes organizados
 *
 * @class App
 * @constructor
 */


class App extends React.Component{
  constructor(){
    super()
    this.showFX = this.showFX.bind(this)
    this.showOsc = this.showOsc.bind(this)
  }
  
  __isOff(element){
    var off = false;
    var values= document.getElementById(element).classList.values();
    for (var v of values){
      if(v === 'off'){off = true}
    }

    return off;
  }
  showFX(){
    
    var off = this.__isOff('fx');
    if(off){
      document.getElementById('fx').classList.remove('off');
      document.getElementById('osc').classList.toggle('off');
    }
    
  }
  showOsc(){
    var off = this.__isOff('osc');
    if(off){
      document.getElementById('osc').classList.remove('off');
      document.getElementById('fx').classList.toggle('off');
    } 
  }
  
  render(){

  
  return (
    <div className="App" 
     // style={{backgroundColor: '#282828'}}
     >
     
      <BrowserRouter>
        <div>
            <Nav />
            <div className="header">
              <Header showFX={this.showFX} showOsc={this.showOsc} />
            </div>
           
            <div className="oscillators" id="osc">
              <Route exact path="/" component={()=> <OscComponents ref={this.reference}/>} /> 
            </div>
            <div className="FX off" id="fx">
              <FX/>
            </div>
            <div className="piano">
              <Piano /> 
            </div>

        </div>
      </BrowserRouter>
  
    
    </div>
  );
  }
}
/**
 * Modulo de la aplicación
 * 
 * @module App
 */

export default App;
