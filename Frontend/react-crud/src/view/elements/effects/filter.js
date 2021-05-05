import Effect from './effect'
import  React from 'react';
import {Container,Row,Col } from 'react-bootstrap';
import {Knob} from '../limitedKnob';
import {types as knobTypes} from '../knobtypes';
import  {types as filterTypes} from './filtertypes';

import 'bootstrap/dist/css/bootstrap.css';
import { sinte } from '../../osc-components';

/**
 * Clase que genera el componente de la interfaz para el control
 * del efecto Filter
 *
 * @class Filter
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
 * Referencia al knob del filtro hs
 * 
 * @property hsRef
 * @type Ref
 */
/**
 * Referencia al knob del filtro bp
 * 
 * @property bpRef
 * @type Ref
 */
/**
 * Referencia al knob del filtro ls
 * 
 * @property lsRef
 * @type Ref
 */
/**
 * Referencia al knob del filtro pi
 * 
 * @property piRef
 * @type Ref
 */

/**
 * Referencia al knob del filtro nt
 * 
 * @property ntRef
 * @type Ref
 */
/**
 * Referencia al knob de wet
 * 
 * @property wetRef
 * @type Ref
 */
class Filter extends Effect{
    #previous;

    constructor (props){
        super(props,'filter');
        this.#previous = filterTypes.HP;
        
        this.wetRef =  React.createRef();
        this.hpRef = React.createRef();
        this.lpRef = React.createRef();
        this.bpRef = React.createRef();
        this.lsRef = React.createRef();
        this.hsRef = React.createRef();
        this.piRef = React.createRef();
        this.ntRef = React.createRef();






    }

    /**
     * Método para selecionar el tipo de filtro
     * 
     * @method selecType
     */

    selectType(){
        var selector = document.getElementById('type').value;
        if(this.#previous !== selector ){
            console.log(this.#previous)
            document.getElementById(this.#previous).style.display = 'none';

            document.getElementById(selector).style.display = '';
           
        }
        
        sinte.setFilter('type',selector);
        this.#previous = selector;

    }
    /**
     * Setter del knob de frecuencia del filtro
     * 
     * @method setFrequencies
     * @param {String} type Tipo de filtro
     * @param {Float} freq Frecuencia de inicio de actuación del filtro
     */
    setFrequecies(type,val){
        switch(type){
            case filterTypes.LP:
                this.lpRef.current.setFrequencies(val);
                break;
            case filterTypes.HP:
                this.hpRef.current.setFrequencies(val);
                break;
            case filterTypes.BP:
                this.bpRef.current.setFrequencies(val);
                break;
            case filterTypes.LS:
                this.lsRef.current.setFrequencies(val);
                break;
            case filterTypes.HS:
                this.hsRef.current.setFrequencies(val);
                break;
            case filterTypes.PI:
                this.piRef.current.setFrequencies(val);
                break;
            case filterTypes.NT:
                this.ntRef.current.setFrequencies(val);
                break;
        }
    }

    /**
     * Setter del efecto filtro
     * 
     * @method setFilter
     * @param {JSON} f Parámetros del efecto Filtro
     */
     setFilter(f){
        var effectOn = f.effectOn;
        var wet = f.wet * 100;
        var type = f.type
        var freq = f.frequency

        this.wetRef.current.setWet('filter',wet);
        
        document.getElementById('type').value = type;
        this.selectType();
        this.setFrequecies(type,freq);

        super.apply(effectOn);
    }

     /**
     * Método que devuelve el componente Filter para ser renderizado
     * 
     * @method render
     * @return Código html del componente Filter
     * 
     */
    render(){
        return(
            <Container className="fx">
                <Row>
                    <Col>
                        {super.render()}
                        <h3 style={{float: 'left'}}>Filter</h3>
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
                            type={knobTypes.FILTERWET}
                            ref= {this.wetRef}
                            />
                    </Col>

                </Row>
                <Row>
                <Col>
                    <p>Tipo</p>
                    <select className="form-select form-select-sm" id="type" aria-label= 'type select' onClick={()=>this.selectType()}>
                        <option value={filterTypes.HP}>highpass</option>
                        <option value={filterTypes.LP}>lowpass</option>
                        <option value={filterTypes.BP}>bandpass</option>
                        <option value={filterTypes.LS}>lowshelf</option>
                        <option value={filterTypes.HS}>highshelf</option>
                        <option value={filterTypes.PI}>peaking</option>
                        <option value={filterTypes.NT}>notch</option>
                        
                    </select>
                </Col>
                <Col>
                    <p>Filter</p>
                    <div id={filterTypes.HP} >
                        <Knob
                        min={0}
                        max={22050}
                        unlockDistance={0}
                        preciseMode={false}
                        width={200} 
                        height={200}
                        val={0}
                        filter= {filterTypes.HP}
                        type={knobTypes.FILTERCONTROL}
                        ref= {this.hpRef}

                        />
                    </div>
                    <div id={filterTypes.LP} style={{display: 'none'}} >
                        <Knob
                        min={0}
                        max={22050}
                        unlockDistance={0}
                        preciseMode={false}
                        width={200} 
                        height={200}
                        val={22050}
                        filter={filterTypes.LP}
                        type={knobTypes.FILTERCONTROL}
                        ref= {this.lpRef}

                        />
                    </div>
                    <div id={filterTypes.BP} style={{display: 'none'}} >
                        <Knob
                        min={0}
                        max={22050}
                        unlockDistance={0}
                        preciseMode={false}
                        width={200} 
                        height={200}
                        val={0}
                        filter={filterTypes.BP}
                        type={knobTypes.FILTERCONTROL}
                        ref= {this.bpRef}

                        />
                    </div>
                    <div id={filterTypes.LS} style={{display: 'none'}} >
                        <Knob
                        min={0}
                        max={22050}
                        unlockDistance={0}
                        preciseMode={false}
                        width={200} 
                        height={200}
                        val={0}
                        filter={filterTypes.LS}
                        type={knobTypes.FILTERCONTROL}
                        ref= {this.lsRef}

                        />
                    </div>
                    <div id={filterTypes.HS} style={{display: 'none'}} >
                        <Knob
                        min={0}
                        max={22050}
                        unlockDistance={0}
                        preciseMode={false}
                        width={200} 
                        height={200}
                        val={22050}
                        filter={filterTypes.HS}
                        type={knobTypes.FILTERCONTROL}
                        ref= {this.hsRef}

                        />
                    </div>
                    <div id={filterTypes.PI} style={{display: 'none'}} >
                        <Knob
                        min={0}
                        max={22050}
                        unlockDistance={0}
                        preciseMode={false}
                        width={200} 
                        height={200}
                        val={0}
                        filter={filterTypes.PI}
                        type={knobTypes.FILTERCONTROL}
                        ref= {this.piRef}

                        />
                    </div>
                    <div id={filterTypes.NT} style={{display: 'none'}} >
                        <Knob
                        min={0}
                        max={22050}
                        unlockDistance={0}
                        preciseMode={false}
                        width={200} 
                        height={200}
                        val={0}
                        filter={filterTypes.NT}
                        type={knobTypes.FILTERCONTROL}
                        ref= {this.ntRef}

                        />
                    </div>
                    </Col>
                </Row>
                
            </Container>
        )
    }
}

export default Filter;