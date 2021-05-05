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
        this.delay = React.createRef();
        this.distorsion = React.createRef();
        this.filter = React.createRef();
        this.reverb = React.createRef();
    }
    /**
     * Método que se encarga de llamar a los respectivos setters
     * de los efectos en función del que se quiera modificar
     * 
     * @method setFx
     * @param {String} param Efecto a modificar
     * @param {JSON} object Datos nuevos
     */
    setFx(param,object){
        switch(param){
            case 'delay':
                this.delay.current.setDelay(object);
                break;
            case 'distorsion':
                this.distorsion.current.setDistorsion(object);
                break;
            case 'filter':
                this.filter.current.setFilter(object);
                break;
            case 'reverb':
                this.reverb.current.setReverb(object);
                break;
            
            default:
                break;
        }
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
                        <Reverb  synth={sinte} ref={this.reverb}/>
                    </Col>

                    <Col className='effect' xs >
                        <Delay synth={sinte} ref={this.delay}/>
                    </Col>

                    
                </Row>
                <Row>
                    <Col className='effect' xs style={{paddingBottom: '1%'}}>
                        <Filter  synth={sinte} ref={this.filter}/>
                    </Col>

                    <Col className='effect' xs>
                        <Distorsion   synth={sinte} ref={this.distorsion}/>
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