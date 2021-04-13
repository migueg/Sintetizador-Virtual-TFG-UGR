import  React from 'react';
import {Container,Row,Col } from 'react-bootstrap';
import {Knob} from './limitedKnob';
import {types as knobTypes} from './knobtypes';
import  Effect from './effect';
import 'bootstrap/dist/css/bootstrap.css';
import '../../css/reverb.css';

class Reverb extends Effect{
    constructor(props){
        super(props,'reverb')
     
    }
   

    render(){
        return(
            <div className='reverb'>
                <Container>
                    <Row>
                        <Col>
                            {super.render()}
                            <h3 style={{float: 'left'}}>Reverb</h3>
                        </Col>
                        <Col>
                            <p>Dry/Wet</p>
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
                            <p>Decay</p>
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
                            max={22050}
                            unlockDistance={0}
                            preciseMode={false}
                            width={200} 
                            height={200}
                            val={0}
                            type={knobTypes.REVERBHPF}
                            />

                        
                        </Col>
                        
    
                        
                        <Col>
                            <p>LP</p>
                            <Knob
                            min={0}
                            max={22050}
                            unlockDistance={0}
                            preciseMode={false}
                            width={200} 
                            height={200}
                            val={22050}
                            type={knobTypes.REVERBLPF}
                            />

                            
                        </Col>

                        
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Reverb;