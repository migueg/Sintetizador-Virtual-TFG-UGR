import  React, {Component} from 'react';
import {synth} from '../controller/synth' ;
import {Container,Row,Col } from 'react-bootstrap';
import {Knob} from './elements/limitedKnob';
import {types as knobTypes} from './elements/knobtypes';
import {Envelope} from './elements/envelope';

import 'bootstrap/dist/css/bootstrap.css';
import '../css/Oscilador.css';


export var sinte = new synth();

/**
 * Esta clase contiene el componente de la interfaz que simula
 * un oscilador analógico, de manera que el usuario pueda modificar sus parámetros
 *
 * @class Oscilador
 * @constructor
 */

/**
 * Identificador del oscilador
 * 
 * @property #osc 
 * @type Char
 * @private
 */

/**
 * Referencia a la clase Knob
 * 
 * @property _KnobVol 
 * @type Ref
 * 
 */


class Oscilador extends React.Component{
    #osc;
    constructor(props){
        super();
        this.#osc = props.osc;
        this._KnobVol = React.createRef(); 
        
        //Asignamos la variable this de la clase a las siguientes funciones
        this.checkChecked = this.checkChecked.bind(this);
      
    
        
    }

    /**
     * Método que se encarga de comprobar si esta encendido o apagado 
     * el oscilador
     * 
     * @method checkChecked
     */
    checkChecked() {
        if(document.getElementById('interruptorA').checked){
            this.checkWave();
             sinte.onOscillator('A');
        }else{
            sinte.offOscillator('A');
        }
    
        if(document.getElementById('interruptorB').checked){
            this.checkWave();
           
            sinte.onOscillator('B');
       }else{
           sinte.offOscillator('B');
       }
    }


    /**
     * Método que se encarga de comprobar que onda esta seleccionada en el 
     * momento de la llamada
     * 
     * @method checkWave
     */
    checkWave() {
        var select = 'selector'+this.#osc;
        var selector = document.getElementById(select).value;

        switch(selector){
            
            case "sine":
                sinte.selectWave(this.#osc,"sine");
                break;
            case "square":
                sinte.selectWave(this.#osc,"square");
                break;
            case "sawtooth":
                sinte.selectWave(this.#osc,"sawtooth");
                break;
            case "triangle":
                sinte.selectWave(this.#osc,"triangle");
                break;

            default:
                break;
        }
        
        
    }

  
   /**
    * Método que construlle el componente de la interfaz relativo a el oscilador, que contiene los Knobs de la envolvente,
    * el selector de onda, el knob de volumen y el botón de encendido y apagado.
    * 
    * @method render
    * @returns Código html del componente oscilador
    */

    render(){
        var id= ""
        if(this.#osc ==='A'){
            id = "selectorA"
        }else{
             id = "selectorB"
        }

    
        return(
            <div style={{marginLeft: 10}} >
            
            < div className="toggle-switch">
                <input
                type="checkbox"
                className="toggle-switch-checkbox"
                name={"onOff"+this.#osc}
                id={"interruptor"+this.#osc}
                onClick = {this.checkChecked}
               
                />
            
            </div>

            <h3 style={{float: 'left'}}>Oscilador {this.#osc}</h3> 
            <div className="volumOsc" style={{float: 'right'}}>
        
            <Knob
                ref={this._KnobVol}
                style={{ display: "inline-block" }}
                min={0}
                max={100}
                unlockDistance={0}
                preciseMode={false}
                width={200} 
                height={200}
                type={knobTypes.OSC_VOLUM}
                osc = {this.#osc}
                val={0}
              
            
            />
           
            </div>
            <div className="WaveSelector">
              <select name="selector" className="selector" onClick={()=>this.checkWave(this.#osc)} id={id}>
                  <option value="sine"  >Sine</option>
                  <option value="triangle" >Triangle</option>
                  <option value="square" >Square</option>
                  <option value="sawtooth">Sawtooth</option>
              </select>
              <div className="select_arrow"></div>
          </div>
            
            <Envelope osc={this.#osc} />
          
          </div>
        )
    }
}


/**
 * Proporciona la interfaz correspondiente a los dos osciladores contruida
 * 
 * @module OscComponents
 */

export class OscComponents extends Component{
    render(){
        return(
            <div>
                


                <Container  >
                    <Row>
                        <Col className="oscilador"xs >
                        <Oscilador osc={'A'} />
                        </Col>
                        <Col className="oscilador" xs >
                        <Oscilador osc={'B'}/>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}


export default OscComponents;