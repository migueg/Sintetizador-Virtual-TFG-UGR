import  React from 'react';
import {Container,Row,Col } from 'react-bootstrap';
import {Knob} from '../limitedKnob';
import {types as knobTypes} from '../knobtypes';
import  Effect from './effect';
import 'bootstrap/dist/css/bootstrap.css';

/**
 * Clase que genera el componente de la interfaz para el control
 * del efecto Delay
 *
 * @class Delay
 * @constructor
 * @param {Object} props Objeto que contiene las propiedades del componente
 * @see Effect
 */
class Delay extends Effect{
    constructor(props){
        super(props,'delay');
        this.synth.setDelay('time','1/16');

        this.setDelay = this.setDelay.bind(this);
        this.refWet = React.createRef();
        this.refFb = React.createRef();
    }

    
    /**
     * Método que se encarga de seleccionar el tiempo de delay
     * 
     * @method selectTime
     */
    selectTime(){
        var selector = document.getElementById('time').value;
        this.synth.setDelay('time',selector);
    }

    /**
     * Convierte el valor númerico del tiempo a su correspondiente
     * fracción 
     * 
     * @method checkTime
     * @param {Float} time Valor de tiempo de delay
     */
    checkTime(time){
        var val = ''
        switch(time.toString()){
            case '0.15000000596046448':
                val = '1/16';
                break;
            case '0.30000001192092896':
                val = '1/8';
                break;
            case '0.5':
                val= '1/4';
                break;
            case '0.6499999761581421':
                val= '1/2';
                break;
            case '0.800000011920929':
                val = '1';
                break;
            case '1':
                val = '2';
                break;
            default:
                console.error("ERROR: Valor incorrecto de tiempo");
                break;
                

        }
        return val
    }
    
    /**
     * Setter del tiempo de delay
     * 
     * @method setTime
     * @param {String} time Fracción de tiempo
     */
    setTime(time){
        document.getElementById('time').value = time;
        this.synth.setDelay('time',time);

    }
    /**
     * Setter de todos los parámetros del delay
     * 
     * @method setDelay
     * @param {JSON} delay Valores de los parámetros del efecto delay
     */
    setDelay(delay){
        var effectOn = delay.effectOn;
        var wet = delay.wet * 100;
        var feedback = delay.feedback * 100;
        var time = delay.time;
        time = this.checkTime(time);
        this.setTime(time);

        this.refWet.current.setWet('delay',wet);
        this.refFb.current.setFeedback(feedback);

        super.apply(effectOn);


        
    }
    /**
     * Método que devuelve el componente Delay para ser renderizado
     * 
     * @method render
     * @return Código html del componente Delay
     * 
     */
    render(){
        return(
            <div>
                <Container className="fx">
                    <Row>
                        <Col>
                            {super.render()}
                            <h3 style={{float: 'left'}}>Delay</h3>
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
                            type={knobTypes.DELAYWET}
                            ref={this.refWet}
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                        <p>Time</p>
                        <select className="form-select form-select-sm" id="time" aria-label="time select" onClick={()=>this.selectTime()}>
                            <option value="1/16">1/16</option>
                            <option value="1/8">1/8</option>
                            <option value="1/4">1/4</option>
                            <option value="1/2">1/2</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                        </select>
                        </Col>
                        <Col>
                            <p>FeedBack</p>
                            <Knob
                            min={0}
                            max={100}
                            unlockDistance={0}
                            preciseMode={false}
                            width={200} 
                            height={200}
                            val={25}
                            type={knobTypes.DELAYFEEDBACK}
                            ref={this.refFb}
                            />
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}


export default Delay;