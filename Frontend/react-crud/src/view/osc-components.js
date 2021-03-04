import  React, {Component,Text,View} from 'react';
import {synth} from '../controller/synth' ;
import {Container,Row,Col } from 'react-bootstrap';
import {Knob,types as knobTypes} from './elements/limitedKnob';
//import {Knob} from 'react-rotary-knob';
//import * as skins from 'react-rotary-knob-skin-pack';

import '../css/Oscilador.css';

export var sinte = new synth();



// Comprueba si esta encendido o apagado el interruptor
function checkChecked() {
    if(document.getElementById('interruptorA').checked){
        checkWave('A');
         sinte.play1();
    }else{
        sinte.stopA();
    }

    if(document.getElementById('interruptorB').checked){
        checkWave('B');
        sinte.play2();
   }else{
       sinte.stopB();
   }
}

// Comprueba que onda esta seleccionada
function checkWave(osc) {
    if(osc == 'A'){
        var selectorA = document.getElementById('selectorA').value;
    
        switch(selectorA){
        
            case "sine":
                sinte.selectWave('A',"sine");
                break;
            case "square":
                sinte.selectWave('A',"square");
                break;
            case "sawtooth":
                sinte.selectWave('A',"sawtooth");
                break;
            case "triangle":
                sinte.selectWave('A',"triangle");
                break;
        }
    }

    if (osc == 'B'){
        var selectorB = document.getElementById('selectorB').value;
        switch(selectorB){
            case "sine":
                sinte.selectWave('B',"sine");
                break;
            case "square":
              
                sinte.selectWave('B',"square");
                break;
            case "sawtooth":
                sinte.selectWave('B',"sawtooth");
                break;
            case "triangle":
                sinte.selectWave('B',"triangle");
                break;
        }
        
    }
    

   
    
}
const InterruptorA  = () =>{
    return(
    
       < div className="toggle-switch">
        <input
          type="checkbox"
          className="toggle-switch-checkbox"
          name="onOffA"
          id="interruptorA"
          onClick = {checkChecked}
        />
     
      </div>
      
    
    )
}



const InterruptorB  = () =>{
    return(
        
       < div className="toggle-switch">
        <input
          type="checkbox"
          className="toggle-switch-checkbox"
          name="onOffB"
          id="interruptorB"
          onClick = {checkChecked}
        />
     
      </div>
     
    )
}


//Componente simple oscialdor
export const Osciladorx = () => {
    return(
        <div style={{marginLeft: 10}} >
        <InterruptorA/>
        <h3>Oscilador1 A</h3> 

        <div className="WaveSelector">
          <select name="selector" className="selector" onClick={()=>checkWave('A')} id="selectorA">
              <option value="sine"  >Sine</option>
              <option value="triangle" >Triangle</option>
              <option value="square" >Square</option>
              <option value="sawtooth">Sawtooth</option>
          </select>
          <div className="select_arrow"></div>
      </div>
    
      
        </div>
    )
}

const Oscilador2 = () => {
   
    return(
       
        <div style={{marginLeft: 10}} >
        <InterruptorB/>
        <h3>Oscilador B</h3> 
        <Knob
            style={{ display: "inline-block" }}
            min={0}
            max={100}
            unlockDistance={0}
            preciseMode={false}
            width={200} 
            height={200}
            type={knobTypes.OSC_VOLUM}
            osc = {'B'}
            
            
        />
       {/*  <Knob  
            min={0} 
            max={100}
            skin={skins.s15} 
            rotateDegrees={180}  //Se situa el  0 abajo
            defaultValue={40} 
            //value={state.volumen}
            unlockDistance={0} //Distancia minima para desbloquear la perilla 
            onChange={(val)=>{
                const maxDistance = 200;
                console.log("Val" +val);
                console.log("Vol" + state.volumen);
                let distance = Math.abs(val - state.volumen);
                console.log(distance);
                if (distance > maxDistance) {
                  return;
                } else {
                    state.volumen = val;
                }
              }
            } 
                
        
        /> */}
     
        <div className="WaveSelector">
          <select className="selector" name="selector" onClick={()=>checkWave('B')} id="selectorB">
              <option value="sine"  >Sine</option>
              <option value="triangle" >Triangle</option>
              <option value="square" >Square</option>
              <option value="sawtooth">Sawtooth</option>
          </select>
          <div className="select_arrow"></div>
      </div>
        </div>

    )
}
export class OscComponents extends Component{
    render(){
        return(
            <div>
                <Container >
                    <Row>
                        <Col xs >
                        <Osciladorx />
                        </Col>
                        <Col xs >
                        <Oscilador2 />
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}


export default OscComponents;