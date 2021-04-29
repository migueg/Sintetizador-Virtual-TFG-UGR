
import './css/App.css';
import React from 'react'
import { BrowserRouter,Route } from 'react-router-dom'
import Nav from './view/navbar'
import OscComponents from './view/osc-components'
import Header from './view/head-component';
import Piano from './view/piano-component'
import FX from './view/fx-components';
import Libary from './view/library-components';

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
    this.showLb = this.showLb.bind(this)
    this.lb =  React.createRef();
    this.updateTable = this.updateTable.bind(this)
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
    
    var offlb = this.__isOff('lb');
    var offosc = this.__isOff('osc');
    var offfx = this.__isOff('fx');

    if(offfx){
      document.getElementById('fx').classList.remove('off');
      if(!offosc){
        document.getElementById('osc').classList.toggle('off');
      }

      if(!offlb){
        document.getElementById('lb').classList.toggle('off');

      }
    }
    
  }
  showOsc(){
    var offlb = this.__isOff('lb');
    var offosc = this.__isOff('osc');
    var offfx = this.__isOff('fx');

    if(offosc){
      document.getElementById('osc').classList.remove('off');
      if(!offlb){
        document.getElementById('lb').classList.toggle('off');
      }

      if(!offfx){
        document.getElementById('fx').classList.toggle('off');

      }
    }
  }
  
  showLb(){
    var offlb = this.__isOff('lb');
    var offosc = this.__isOff('osc');
    var offfx = this.__isOff('fx');

    if(offlb){
      document.getElementById('lb').classList.remove('off');
      if(!offosc){
        document.getElementById('osc').classList.toggle('off');
      }

      if(!offfx){
        document.getElementById('fx').classList.toggle('off');

      }
    }
  }

  updateTable (){
     this.lb.current.updateTable()
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
              <Header showFX={this.showFX} parentCallback={this.updateTable} showOsc={this.showOsc} showLb={this.showLb} />
            </div>
           
            <div className="oscillators" id="osc">
              <Route exact path="/" component={()=> <OscComponents ref={this.reference}/>} /> 
            </div>
            <div className="FX off" id="fx">
              <FX/>
            </div>
            <div className="LB off" id='lb'>
              <Libary ref={this.lb}/>
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
