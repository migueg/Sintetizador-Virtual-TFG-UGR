import  React from 'react';
import {Container,Row,Col } from 'react-bootstrap';
import {Knob} from './limitedKnob';
import {types as knobTypes} from './knobtypes';
import  Effect from './effect';
import 'bootstrap/dist/css/bootstrap.css';

class Delay extends Effect{
    constructor(props){
        super(props,'delay');
    }

    render(){
        return(
            <div>
                <Container>
                    <Row>
                        <Col>
                            {super.render()}
                            <h3 style={{float: 'left'}}>Delay</h3>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}


export default Delay;