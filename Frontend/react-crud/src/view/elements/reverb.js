import  React from 'react';
import {Container,Row,Col } from 'react-bootstrap';
import {Knob} from './limitedKnob';
import {types as knobTypes} from './knobtypes';
import 'bootstrap/dist/css/bootstrap.css';
import '../../css/reverb.css';

class Reverb extends React.Component{
    #synth
    constructor(props){
        super()
        this.#synth = props.synth
    }
    checkReverb(){
        if(document.getElementById('interruptor').checked){
            this.#synth.applyEffect('reverb');
        }else{
            this.#synth.disapplyEffect('reverb');
        }
        
    }

    render(){
        return(
            <div className='reverb'>
                <Container>
                    <Row>
                        <Col>
                            <div className='toggle-switch'>
                                <input
                                    type="checkbox"
                                    className="toggle-switch-checkbox"  
                                    id={'interruptor'}
                                    onClick ={()=>this.checkReverb()}                      
                                />
                            </div>
                            <h3 style={{float: 'left'}}>Reverb</h3>
                        </Col>
                        <Col>
                            <Knob
                            min={0}
                            max={100}
                            unlockDistance={0}
                            preciseMode={false}
                            width={200} 
                            height={200}
                            val={80}
                            type={knobTypes.REVERBWET}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Knob
                            min={0}
                            max={100}
                            unlockDistance={0}
                            preciseMode={false}
                            width={200} 
                            height={200}
                            val={50}
                            type={knobTypes.REVERBDECAY}
                            />
                        </Col>
                        <Col>
                            <p>HP</p>
                            <Knob
                            min={0}
                            max={44000}
                            unlockDistance={0}
                            preciseMode={false}
                            width={200} 
                            height={200}
                            val={0}
                            type={knobTypes.REVERBHPF}
                            />
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Reverb;