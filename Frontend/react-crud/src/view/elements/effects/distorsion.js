import Effect from './effect'
import  React from 'react';
import {Container,Row,Col } from 'react-bootstrap';
import {Knob} from '../limitedKnob';
import {types as knobTypes} from '../knobtypes';
import { extend } from 'jquery';


class Distorsion extends Effect{
    constructor(props){
        super(props,'distorsion');

    }

    render(){
        return(
            <Container className="fx">
                <Row>
                     <Col>
                        {super.render()}
                        <h3 style={{float: 'left'}}>Distorsion</h3>
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
                            type={knobTypes.DISTORSIONWET}
                            />
                    </Col>
                </Row>

                <Row>
                    <Col>
                    </Col>
                    <Col>
                    <p>Nivel</p>
                        <Knob
                        min={0}
                        max={600}
                        unlockDistance={0}
                        preciseMode={false}
                        width={200} 
                        height={200}
                        val={80}
                        type={knobTypes.DISTORSIONAMOUNT}
                        />
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Distorsion;