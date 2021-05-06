
import './css/App.css';
import React from 'react'
import OscComponents from './view/osc-components'
import Header from './view/head-component';
import Piano from './view/piano-component'
import FX from './view/fx-components';
import Libary from './view/library-components';
import { sinte } from '../src/view/osc-components';

/**
 * Es la clase principal que contiene todos los componentes organizados
 *
 * @class App
 * @constructor
 */


class App extends React.Component{
  constructor(){
    super()
    this.showFX = this.showFX.bind(this);
    this.showOsc = this.showOsc.bind(this);
    this.showLb = this.showLb.bind(this);
    this.updateTable = this.updateTable.bind(this);
    this.loadSound = this.loadSound.bind(this);

    this.lb =  React.createRef();
    this.header = React.createRef();
    this.oscillators = React.createRef();
    this.fx = React.createRef();

    this.a = false;
    this.b = false;
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
        this.__onOscillators();
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
        this.__onOscillators();
        document.getElementById('lb').classList.toggle('off');
      }

      if(!offfx){
        document.getElementById('fx').classList.toggle('off');

      }
    }
  }
  __offOscillators(){
    this.a = sinte.getChecked('A');
    this.b = sinte.getChecked('B');
    if(this.a){
      sinte.offOscillator('A');
    }
    if(this.b){
      sinte.offOscillator('B');
    }
  }
  __onOscillators(){
    this.a = sinte.getChecked('A');
    this.b = sinte.getChecked('B');
    if(this.a){
      sinte.onOscillator('A');
    }

    if(this.b){
      sinte.onOscillator('B');
    }
  }
  
  showLb(){
    if(window.confirm('Si cambias a la biblioteca, la reproducción de los osciladores estará desctivada')){
      var offlb = this.__isOff('lb');
      var offosc = this.__isOff('osc');
      var offfx = this.__isOff('fx');
    

      if(offlb){
        this.__offOscillators();
        document.getElementById('lb').classList.remove('off');
        if(!offosc){
          document.getElementById('osc').classList.toggle('off');
        }
  
        if(!offfx){
          document.getElementById('fx').classList.toggle('off');
  
        }
      }
    }
   
  }
  loadSound(){
     var newState = this.lb.current.newState
     var response = true;
     if(newState.name){
      this.header.current.setName(newState.name);
      if(newState.oscA && newState.oscB ){
        //console.log(newState)//A cargar
        this.oscillators.current.setOscA(newState.oscA);
        this.oscillators.current.setOscB(newState.oscB);

        if(newState.filter && newState.delay && newState.distorsion 
          && newState.reverb){
            this.fx.current.setFx('delay',newState.delay);
            this.fx.current.setFx('distorsion',newState.distorsion);
            this.fx.current.setFx('filter', newState.filter);
            this.fx.current.setFx('reverb',newState.reverb);
        }
      }
     }else{
       response = false
     }
     
     return response
  }

  updateTable (){
     this.lb.current.updateTable()
  }
  render(){

  
  return (
    <div className="App" 
     // style={{backgroundColor: '#282828'}}
     >
     
      
        <div>
            <div className="header">
              <Header ref={this.header} showFX={this.showFX} parentCallback={this.updateTable} showOsc={this.showOsc} showLb={this.showLb} />
            </div>
           
            
            <div className="oscillators" id="osc">
              <OscComponents ref={this.oscillators}/> 
            </div>
            <div className="FX off" id="fx">
              <FX ref={this.fx}/>
            </div>
            <div className="LB off" id='lb'>
              <Libary parentCallback={()=>this.loadSound()} ref={this.lb}/>
            </div>
            <div className="piano">
              <Piano /> 
            </div>

        </div>
        <div>

        </div>
   
  
    
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
