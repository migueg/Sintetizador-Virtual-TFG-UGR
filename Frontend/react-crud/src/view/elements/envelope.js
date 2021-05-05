import  React  from 'react';
import { Container, Row,Col } from 'react-bootstrap';
import {Knob} from './limitedKnob';
import {types as knobTypes} from './knobtypes';

/**
 * La clase Envelope contiene el componente de la interfaz relativo a
 * la envolvente de un oscilador. Proporciona un conjunto de knobs para modificar
 * sus respectivos parametros (Attack,Sustain,Deacay,Release). 
 * clicando en este.
 *
 * @class Envelope
 * @constructor
 * @param {Object} props Propiedades de la envolvente
 */

/**
 *  Id del oscilador que posee la envolvente
 * 
 * @property #osc
 * @type Char
 * @private
 */

class Envelope extends React.Component{
    #osc;
    constructor(props){
        super();
        this.#osc = props.osc
        
        this.attack = React.createRef();
        this.sustain = React.createRef();
        this.release = React.createRef();
        this.decay = React.createRef();
        
        this.setEnvelope = this.setEnvelope.bind(this);

    }

    /**
     * Método que establece nuevos valores para los parámetros de 
     * la envolvente
     * 
     * @method setEnvelope
     * @param {JSON} envelope 
     */
    setEnvelope(envelope){
        //Hacemos la inversa para tener los valores correctos de los knobs
        var attack = (envelope.attack * 100) / 2;
        var decay = (envelope.decay * 100) / 2;
        var sustain = envelope.sustain *100;
        var release = envelope.release * 100 / 5;
        
    /*  //DEBUG
        console.log( envelope)
        console.log('Attack: ' +attack)
        console.log('Decay: ' + decay)
        console.log('Sustain: ' + sustain)
        console.log('Release: ' + release)
    */

        this.attack.current.setEnvelope('attack',attack)
        this.release.current.setEnvelope('release',release)
        this.decay.current.setEnvelope('decay', decay)
        this.sustain.current.setEnvelope('sustain',sustain)
    }

    /**
     * Método que devuelve el componente Envelope para ser renderizado
     * 
     * @method render
     * @return Código html del componente Envelope
     * 
     */
    render(){
        return(
            <Container className="Envelope">
                <Row> 
                    <Col>
                        <p>Attack</p>
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
                              ref={this.attack}
                        />

                    </Col>
                    <Col>
                        <p>Release</p>
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
                              ref={this.release}
                        />
                    </Col>

                    <Col>
                        <p>Decay</p>
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
                              ref={this.decay}
                        />
                    </Col>
                    <Col>
                        <p>Sustain</p>
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
                              ref = {this.sustain}
                        />
                    </Col>
                </Row>
            </Container>
        )
    }
}

/**
 * Proporciona los elementos de la interfaz para la envolvente
 * 
 * @module Knob
 */
export {Envelope}