import Effect from './effect'
import  React from 'react';
import {Container,Row,Col } from 'react-bootstrap';
import {Knob} from '../limitedKnob';
import {types as knobTypes} from '../knobtypes';

/**
 * Clase que genera el componente de la interfaz para el control
 * del efecto Distorsion
 *
 * @class Distorsion
 * @constructor
 * @param {Object} props Objeto que contiene las propiedades del componente
 * @see Effect
 */
class Distorsion extends Effect{
    constructor(props){
        super(props,'distorsion');

        this.refWet = React.createRef();
        this.amountRef = React.createRef();
    }
    /**
     * Setter de todos los parámetros del efecto distorsión
     * 
     * @method setDistorsion
     * @param {JSON} d Valores de los parámetros del efecto distorsión
     */
    setDistorsion(d){
        var effectOn = d.effectOn;
        var wet = d.wet * 100;
        var amount = d.amount;
    
        this.refWet.current.setWet('distorsion',wet);
        this.amountRef.current.setAmountDistorsion(amount)

        super.apply(effectOn)
    }
    /**
     * Método que devuelve el componente Distorsion para ser renderizado
     * 
     * @method render
     * @return Código html del componente Distorsion
     * 
     */
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
                            ref={this.refWet}
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
                        ref={this.amountRef}
                        />
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Distorsion;