import  React, {Component} from 'react';
import {synth} from '../controller/synth' ;
import {Container,Row,Col } from 'react-bootstrap';
import {Knob} from './elements/limitedKnob';
import {types as knobTypes} from './elements/knobtypes';
import {Envelope} from './elements/envelope';
import Cookies from 'js-cookie';


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

/**
 * Referencia a la clase Envelope
 * 
 * @property envelope 
 * @type Ref
 * 
 */



class Oscilador extends React.Component{
    #osc;
    constructor(props){
        super();
        this.#osc = props.osc; 
        this.firstTime = true;

        //Asignamos la variable this de la clase a las siguientes funciones
        this.checkChecked = this.checkChecked.bind(this);
        this.setOsc = this.setOsc.bind(this);

        //Referencias
        this.envelope = React.createRef();
        this._KnobVol = React.createRef(); 
        
        var token = Cookies.get('token');
        var user = Cookies.get('user');

        if(token && user){
            sinte.setCookies(token,user)
        }
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
            sinte.setChecked('A',true);
            sinte.onOscillator('A');
        }else{
            sinte.setChecked('A',false)
            sinte.offOscillator('A');
        }
    
        if(document.getElementById('interruptorB').checked){
            this.checkWave();
            sinte.setChecked('B',true)
            sinte.onOscillator('B');
       }else{
            sinte.setChecked('B',false)
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
     * Método que se encarga de enviar al controlador el nivel de paneo
     * que el usuario quiere para un oscilador
     * 
     * @method setPan
     * @param {Char} osc Id del oscilador
     */
    setPan(osc){
        var id = 'range'+ osc;
        var ranger = document.getElementById(id);
        sinte.setPan(this.#osc,ranger.value)
 
    }

    /**
     * Setter del estado del oscilador
     * 
     * @method setOsc
     * @param {Objetc} osc 
     */
    setOsc(osc){
        var on = osc.oscOn;
        var pan = osc.pan;
        var wave = osc.wave;
        var gain = osc.gain * 100;

        document.getElementById('interruptor'+osc.id).checked = on;

        if(on){
            sinte.setChecked(osc.id,true)
        }else{
            sinte.setChecked(osc.id,false)
        }

        document.getElementById('range'+osc.id).value = pan;
        sinte.setPan(osc.id,pan);

        document.getElementById('selector'+osc.id).value = wave;
        sinte.selectWave(osc.id,wave);

        this.envelope.current.setEnvelope(osc.envelope);
        
        this._KnobVol.current.setGainOsc(gain);

        sinte.setVolum(osc.id, gain);


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
            <Row>

            
            < div className="toggle-switch" style={{marginLeft: 10}}>
                <input
                type="checkbox"
                className="toggle-switch-checkbox"
                name={"onOff"+this.#osc}
                id={"interruptor"+this.#osc}
                onClick = {this.checkChecked}
               
                />
            
            </div>

            <h3 style={{float: 'left'}}>Oscilador {this.#osc}</h3>
            </Row>
            <Row>
            <Col>
            <div className='panner'>
                <p>Pan L-R</p>
                <input type="range" id={'range'+this.#osc} onChange={()=>this.setPan(this.#osc)} 
                     defaultValue='0'  step='0.1' min="-1"  max="1" 
                    style={{width: '80%'}}
                    />
          
            </div>

          
            </Col>
            <Col>
            <div className="volumOsc" style={{float: 'right', marginRight: '2%'}}>
            <p>Volumen</p>
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
            </Col>
            </Row> 
            <div className="WaveSelector">
              <select name="selector" className="selector" onClick={()=>this.checkWave(this.#osc)} id={id}>
                  <option value="sine"  >Sine</option>
                  <option value="triangle" >Triangle</option>
                  <option value="square" >Square</option>
                  <option value="sawtooth">Sawtooth</option>
              </select>
              <div className="select_arrow"></div>
          </div>
            
            <Envelope osc={this.#osc} ref={this.envelope}/>
          
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
    constructor(){
        super();
        this.oscA = React.createRef();
        this.oscB = React.createRef();
    }
    setOscA(osc){
        this.oscA.current.setOsc(osc)
    }

    setOscB(osc){
        this.oscB.current.setOsc(osc)

    }
    render(){
        return(
            <div>
                


                <Container fluid style={{height: 'fit-content'}}>
                    <Row>
                        <Col className="oscilador"xs >
                        <Oscilador osc={'A'} ref={this.oscA}/>
                        </Col>
                        <Col className="oscilador" xs >
                        <Oscilador osc={'B'} ref={this.oscB}/>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}


export default OscComponents;