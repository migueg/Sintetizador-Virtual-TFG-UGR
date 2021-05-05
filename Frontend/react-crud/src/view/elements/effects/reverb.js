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
/**
 * Referencia al knob del filtro hp
 * 
 * @property hpRef
 * @type Ref
 */
/**
 * Referencia al knob del filtro lp
 * 
 * @property lpRef
 * @type Ref
 */
/**
 * Referencia al knob de wet
 * 
 * @property wetRef
 * @type Ref
 */
/**
 * Referencia al knob de decay
 * 
 * @property dcRef
 * @type Ref
 */
class Reverb extends Effect{
    constructor(props){
        super(props,'reverb')
        
        this.wetRef = React.createRef();
        this.dcRef = React.createRef();
        this.hpRef = React.createRef();
        this.lpRef = React.createRef();
    }
   
    /**
     * Setter de todos los parámetros del efecto distorsión
     * 
     * @method setDistorsion
     * @param {JSON} r Valores de los parámetros del efecto re
     */
    setReverb(r){
        var effectOn = r.effectOn;
        var wet = r.wet * 100;
        var hp = r.hp;
        var lp = r.lp;
        var decay = 100 - (10 * r.decay);

        this.lpRef.current.setFrequencies(lp);
        this.hpRef.current.setFrequencies(hp);
        this.wetRef.current.setWet('reverb',wet)
        this.dcRef.current.setReverbDecay(decay);

        super.apply(effectOn)


        
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
                            ref={this.wetRef}
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
                            ref={this.dcRef}

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
                            ref={this.hpRef}

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
                            ref={this.lpRef}

                            />

                            
                        </Col>

                        
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Reverb;