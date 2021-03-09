import  React  from 'react';
import { Container, Row,Col } from 'react-bootstrap';
import {Knob} from './limitedKnob';
import {types as knobTypes} from './knobtypes';

class Envelope extends React.Component{
    #osc;
    constructor(props){
        super();
        this.#osc = props.osc
        
    }


    render(){
        return(
            <Container className="Envelope">
                <Row> 
                    <Col>
                        <p>Attack</p>
                    </Col>
                    <Col>
                        <p>Release</p>
                    </Col>
                </Row>
                <Row >
                    <Col >
                        <Knob
                              style={{ display: "inline-block" }}
                              min={0}
                              max={100}
                              unlockDistance={0}
                              preciseMode={false}
                              width={200} 
                              height={200}
                              type={knobTypes.ATTACK}
                              osc = {this.#osc}
                              val= {0}
                        />

                        
                    </Col>

                    <Col>
                        <Knob
                              style={{ display: "inline-block" }}
                              min={0}
                              max={100}
                              unlockDistance={0}
                              preciseMode={false}
                              width={200} 
                              height={200}
                              type={knobTypes.RELEASE}
                              osc = {this.#osc}
                              val = {50}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p>Decay</p>
                    </Col>
                    <Col>
                        <p>Sustain</p>
                    </Col>
                </Row>

                <Row >
                    <Col >
                        <Knob
                              style={{ display: "inline-block" }}
                              min={0}
                              max={100}
                              unlockDistance={0}
                              preciseMode={false}
                              width={200} 
                              height={200}
                              type={knobTypes.DECAY}
                              osc = {this.#osc}
                              val= {30}
                        />

                        
                    </Col>

                    <Col>
                        <Knob
                              style={{ display: "inline-block" }}
                              min={0}
                              max={100}
                              unlockDistance={0}
                              preciseMode={false}
                              width={200} 
                              height={200}
                              type={knobTypes.SUSTAIN}
                              osc = {this.#osc}
                              val = {50}
                        />
                    </Col>
                </Row>
            </Container>
        )
    }
}

export {Envelope}