import  React from 'react';
import {Container,Row,Col } from 'react-bootstrap';
import Reverb from './elements/reverb';
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
            <Container>
                <Row>
                    <Col className='reverb' xs>
                        <Reverb synth={sinte}/>
                    </Col>
                </Row>
            </Container>
        </div>
        )
    }
}

export default FX;