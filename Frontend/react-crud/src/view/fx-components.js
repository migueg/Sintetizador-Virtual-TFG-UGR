import  React from 'react';
import {Container,Row,Col } from 'react-bootstrap';
import Reverb from './elements/effects/reverb';
import Delay from './elements/effects/delay';
import Filter from './elements/effects/filter';
import Distorsion from './elements/effects/distorsion';

import {sinte} from './osc-components';

import 'bootstrap/dist/css/bootstrap.css';
import '../css/fx.css';

class FX extends React.Component{
    constructor(){
        super()
    }

    render(){
        return(
        <div>
            <Container fluid id="fx" >
                <Row >
                    <Col className='effect' xs style={{paddingBottom: '1%'}}>
                        <Reverb  synth={sinte}/>
                    </Col>

                    <Col className='effect' xs >
                        <Delay synth={sinte}/>
                    </Col>

                    
                </Row>
                <Row>
                    <Col className='effect' xs style={{paddingBottom: '1%'}}>
                        <Filter  synth={sinte}/>
                    </Col>

                    <Col className='effect' xs>
                        <Distorsion   synth={sinte}/>
                    </Col>
                    
                </Row>
            </Container>
        </div>
        )
    }
}

export default FX;