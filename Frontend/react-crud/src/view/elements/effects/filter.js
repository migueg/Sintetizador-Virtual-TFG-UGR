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
class Filter extends Effect{
    #previous;

    constructor (props){
        super(props,'filter');
        this.#previous = filterTypes.HP;
    }

    /**
     * Método para selecionar el tipo de filtro
     * 
     * @method selecType
     */

    selectType(){
        var selector = document.getElementById('type').value;
        console.log('AQUI')
        if(this.#previous != selector ){
            console.log(this.#previous)
            document.getElementById(this.#previous).style.display = 'none';

            document.getElementById(selector).style.display = '';
           
        }
        
        sinte.setFilter('type',selector);
        this.#previous = selector;

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
                        />
                    </div>
                    </Col>
                </Row>
                
            </Container>
        )
    }
}

export default Filter;