import  React from 'react';
import {Container,Row,Col } from 'react-bootstrap';
import {Knob} from '../limitedKnob';
import {types as knobTypes} from '../knobtypes';
import  Effect from './effect';
import 'bootstrap/dist/css/bootstrap.css';
import '../../../css/reverb.css';

/**
 * Clase que genera el componente de la interfaz para el control
 * del efecto Rerverb
 *
 * @class Reverb
 * @constructor
 * @param {Object} props Objeto que contiene las propiedades del componente
 * @see Effect
 */
class Reverb extends Effect{
    constructor(props){
        super(props,'reverb')
     
    }
   
    /**
     * Método que devuelve el componente Reverb para ser renderizado
     * 
     * @method render
     * @return Código html del componente Reverb
     * 
     */
    render(){
        return(
            <div className='reverb'>
                <Container className="fx">
                    <Row>
                        <Col>
                            {super.render()}
                            <h3 style={{float: 'left'}}>Reverb</h3>
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
                            type={knobTypes.REVERBWET}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p>Decay</p>
                            <Knob
                            min={0}
                            max={100}
                            unlockDistance={0}
                            preciseMode={false}
                            width={200} 
                            height={200}
                            val={50}
                            type={knobTypes.REVERBDECAY}
                            />
                        </Col>
                        
                        <Col>
                      
                         
                            <p>HP</p>
                            <Knob
                            min={0}
                            max={22050}
                            unlockDistance={0}
                            preciseMode={false}
                            width={200} 
                            height={200}
                            val={0}
                            type={knobTypes.REVERBHPF}
                            />

                        
                        </Col>
                        
    
                        
                        <Col>
                            <p>LP</p>
                            <Knob
                            min={0}
                            max={22050}
                            unlockDistance={0}
                            preciseMode={false}
                            width={200} 
                            height={200}
                            val={22050}
                            type={knobTypes.REVERBLPF}
                            />

                            
                        </Col>

                        
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Reverb;