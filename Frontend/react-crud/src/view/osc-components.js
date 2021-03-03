import  {React,Component,Text,View} from 'react';
import {synth} from '../controller/synth' ;
import {Container,Row,Col } from 'react-bootstrap';
import '../css/Oscilador.css';

var sinte = new synth();

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
                console.log("Aqui");
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
          <div class="select_arrow">
        </div>
      </div>
    
      
        </div>
    )
}

const Oscilador2 = () => {
    return(
   
        <div style={{marginLeft: 10}} >
        <InterruptorB/>
        <h3>Oscilador B</h3> 

      
        <div className="WaveSelector">
          <select className="selector" name="selector" onClick={()=>checkWave('B')} id="selectorB">
              <option value="sine"  >Sine</option>
              <option value="triangle" >Triangle</option>
              <option value="square" >Square</option>
              <option value="sawtooth">Sawtooth</option>
          </select>
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