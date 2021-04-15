import  React from 'react';
import {Container,Row,Col } from 'react-bootstrap';
import {Knob} from '../limitedKnob';
import {types as knobTypes} from '../knobtypes';
import  Effect from './effect';
import 'bootstrap/dist/css/bootstrap.css';

class Delay extends Effect{
    constructor(props){
        super(props,'delay');
        this.synth.setDelay('time','1/16');
    }

    checkTime(){
        var selector = document.getElementById('time').value;
        this.synth.setDelay('time',selector);
    }
    render(){
        return(
            <div>
                <Container className="fx">
                    <Row>
                        <Col>
                            {super.render()}
                            <h3 style={{float: 'left'}}>Delay</h3>
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
                            type={knobTypes.DELAYWET}
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                        <p>Time</p>
                        <select className="form-select form-select-sm" id="time" aria-label="time select" onClick={()=>this.checkTime()}>
                            <option value="1/16">1/16</option>
                            <option value="1/8">1/8</option>
                            <option value="1/4">1/4</option>
                            <option value="1/2">1/2</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                        </select>
                        </Col>
                        <Col>
                            <p>FeedBack</p>
                            <Knob
                            min={0}
                            max={100}
                            unlockDistance={0}
                            preciseMode={false}
                            width={200} 
                            height={200}
                            val={25}
                            type={knobTypes.DELAYFEEDBACK}
                            />
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}


export default Delay;