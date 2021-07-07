
import './css/App.css';
import React from 'react'
import OscComponents from './view/osc-components'
import Header from './view/head-component';
import Piano from './view/piano-component'
import FX from './view/fx-components';
import Libary from './view/library-components';
import Analyser from './view/analyser-component';

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
    this.showEQ = this.showEQ.bind(this)

    this.updateTable = this.updateTable.bind(this);
    this.loadSound = this.loadSound.bind(this);

    this.lb =  React.createRef();
    this.header = React.createRef();
    this.oscillators = React.createRef();
    this.fx = React.createRef();

    this.a = false;
    this.b = false;

    
  }
  
  
  /**
   * Comprueba si un layer esta oculto
   * 
   * @method isOff
   * @param {string} element Id del layer
   * @returns {Boolean}
   * @private
   */
  __isOff(element){
    
    var off = false;
    var values= document.getElementById(element).classList.values();
    for (var v of values){
      if(v === 'off'){off = true}
    }

    return off;
  }


  /**
   * Indica a la fahcada que hay que encender los osciladores
   * 
   * @method __onOscillators
   * @private
   */
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
  /**
   * Indica a la fahcada que hay que apagar los osciladores
   * 
   * @method __onOscillators
   * @private
   */
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
  
  /**
   * Muestra el layer de efectos
   * 
   * @method showFX
   */
  showFX(){
    
    var offlb = this.__isOff('lb');
    var offosc = this.__isOff('osc');
    var offfx = this.__isOff('fx');
    var offeq = this.__isOff('analyser')

    if(offfx){
      document.getElementById('fx').classList.remove('off');
      if(!offosc){
        document.getElementById('osc').classList.toggle('off');
      }

      if(!offlb){
        this.__onOscillators();
        document.getElementById('lb').classList.toggle('off');

      }

      if(!offeq){
        document.getElementById('analyser').classList.toggle('off');
      }
    }
    
  }

  /**
   * Muestra el layer de osciladores
   * 
   * @method showOsc
   */
  showOsc(){
    var offlb = this.__isOff('lb');
    var offosc = this.__isOff('osc');
    var offfx = this.__isOff('fx');
    var offeq = this.__isOff('analyser')

    if(offosc){
      document.getElementById('osc').classList.remove('off');
      if(!offlb){
        this.__onOscillators();
        document.getElementById('lb').classList.toggle('off');
      }

      if(!offfx){
        document.getElementById('fx').classList.toggle('off');

      }

      if(!offeq){
        document.getElementById('analyser').classList.toggle('off');
      }
    }
  }
 
  /**
   * Muestra el layer de tabla de sonidos
   * 
   * @method showLb
   */
  showLb(){
    if(window.confirm('Si cambias a la biblioteca, la reproducción de los osciladores estará desctivada')){
      var offlb = this.__isOff('lb');
      var offosc = this.__isOff('osc');
      var offfx = this.__isOff('fx');
      var offeq = this.__isOff('analyser')
    

      if(offlb){
        this.__offOscillators();
        document.getElementById('lb').classList.remove('off');
        if(!offosc){
          document.getElementById('osc').classList.toggle('off');
        }
  
        if(!offfx){
          document.getElementById('fx').classList.toggle('off');
  
        }
        if(!offeq){
          document.getElementById('analyser').classList.toggle('off');
        }
      }
    }
   
  }
  
  /**
   * Muestra el layer de EQ
   * 
   * @method showEQ
   */
  showEQ(){
    var offlb = this.__isOff('lb');
    var offosc = this.__isOff('osc');
    var offfx = this.__isOff('fx');
    var offeq = this.__isOff('analyser')

    if(offeq){
      document.getElementById('analyser').classList.remove('off');
      if(!offosc){
        document.getElementById('osc').classList.toggle('off');
      }

      if(!offlb){
        this.__onOscillators();
        document.getElementById('lb').classList.toggle('off');

      }

      if(!offfx){
        document.getElementById('fx').classList.toggle('off');
      }
    }
    
  }

  /**
   * Cuando se carga el sonido inicia el proceso para que se actualicen los valores
   * 
   * @method loadSound
   * @returns {Object} respuesta
   */
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

  /**
   * Le dice al hijo que tiene que actualizar la tabla de sonidos
   * 
   * @method updateTable
   */
  updateTable (){
     this.lb.current.updateTable()
  }

  /**
     * Método que devuelve el componente App para ser renderizado que se corresponde con el sintetizador
     * 
     * @method render
     * @return Código html del componente App
     * 
     */
  render(){

  
  return (
    <div className="App" >
     
      
       
            <div className="header">
              <Header ref={this.header} showEQ={this.showEQ} showFX={this.showFX} parentCallback={this.updateTable} showOsc={this.showOsc} showLb={this.showLb} />
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
            <div className="analyser off" style={{width: '100%'}} id='analyser'>
              <Analyser/>
            </div>
            <div className="piano">
              <Piano /> 
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
