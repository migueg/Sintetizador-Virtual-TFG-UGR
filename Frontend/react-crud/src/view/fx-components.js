import  React from 'react';
import {Container,Row,Col } from 'react-bootstrap';
import Reverb from './elements/effects/reverb';
import Delay from './elements/effects/delay';
import Filter from './elements/effects/filter';
import Distorsion from './elements/effects/distorsion';

import {sinte} from './osc-components';

import 'bootstrap/dist/css/bootstrap.css';
import '../css/fx.css';

/**
 * Clase que genera un vista para aplicar y controlar los efectos 
 *
 * @class Distorsion
 * @constructor
 */
class FX extends React.Component{
    constructor(){
        super()
    }

    /**
     * Método que devuelve el componente FX para ser renderizado que representa
     * la vista de efecots
     * 
     * @method render
     * @return Código html del componente FX
     * 
     */
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

/**
 * Vista de los efectos
 * 
 * @module FX
 */
export default FX;