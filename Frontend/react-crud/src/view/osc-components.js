import  React, {Component} from 'react';
import {synth} from '../controller/synth' ;
import {Container,Row,Col } from 'react-bootstrap';
import {Knob} from './elements/limitedKnob';
import {types as knobTypes} from './elements/knobtypes';
import {Envelope} from './elements/envelope';

import '../css/Oscilador.css';

export var sinte = new synth();

class Oscilador extends React.Component{
    #osc;
    constructor(props){
        super();
        this.#osc = props.osc;
        this._KnobVol = React.createRef(); 
        this.checkChecked = this.checkChecked.bind(this);
        this.addmobileVolume = this.addmobileVolume.bind(this);
        this.restmobileVolume = this.restmobileVolume.bind(this);
        
    }

    // Comprueba si esta encendido o apagado el interruptor
    checkChecked() {
        if(document.getElementById('interruptorA').checked){
            this.checkWave();
             sinte.play('A');
        }else{
            sinte.stop('A');
        }
    
        if(document.getElementById('interruptorB').checked){
            this.checkWave();
            sinte.play('B');
       }else{
           sinte.stop('B');
       }
    }


    // Comprueba que onda esta seleccionada
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

    addmobileVolume(){
    
        this._KnobVol.current.changeVolume('add')
    }

    restmobileVolume(){
        this._KnobVol.current.changeVolume('rest')
    }

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
            <div id="mobileKnob" >
                <p onClick={this.addmobileVolume}>+</p>
                <p onClick={this.restmobileVolume}>-</p>
            </div>
            
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
export class OscComponents extends Component{
    render(){
        return(
            <div>
                


                <Container >
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