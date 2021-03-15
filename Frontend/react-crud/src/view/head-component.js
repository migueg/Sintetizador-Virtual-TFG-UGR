import  React from 'react';
import {Knob} from './elements/limitedKnob';
import {Container,Row,Col } from 'react-bootstrap';
import {types as knobTypes} from './elements/knobtypes';
import disquete from '../img/disquete.png'
import 'bootstrap/dist/css/bootstrap.css';
import '../css/header.css';


class Header extends React.Component{
    constructor(){
        super();
    }

    render(){
        return(
            <Container>
                <Row>
                    <Col>
                        <img   src={disquete} style={{width: 50, float: 'right' , marginTop: '2%'}}></img>
                    </Col>
                    <Col>
                        <div className="LoadedSound" >
                            Sonido
                        </div>
                    </Col>
                    <Col>
                    <Knob>

                    </Knob>
                    </Col>
                </Row>
            </Container>
        );
    }
}


export default Header;