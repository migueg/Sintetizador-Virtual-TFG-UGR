import  React from 'react';
import {Knob} from './elements/limitedKnob';
import {types as knobTypes} from './elements/knobtypes';
import {Container,Row,Col } from 'react-bootstrap';
import ModalSave from './elements/modals/modal-save';


import rec from '../img/grabar.png'
import pausa from '../img/pausa.png'
import reload from '../img/reload.png'
import disquete from '../img/disquete.png'
import 'bootstrap/dist/css/bootstrap.css';
import '../css/header.css';
import { sinte } from './osc-components';

/**
 * Clase que proporciona el componente para los efectos
 * 
 * @class Header
 * @constructor
 */
class Header extends React.Component{
    constructor(props){
        super();
        this.props = props;
        
        this.state = {
            A: false,
            B: false,
            date: new Date()
        }
        this.showOsc = this.showOsc.bind(this)
        this.showFX = this.showFX.bind(this)
        this.showEQ = this.showEQ.bind(this)
    
    }
    
    /**
     * Comprueba si los osciladores estan encendidos
     * 
     * @method checkOscillators
     */
    checkOscillators(){
        this.state.A = this.getAvailable('A');
        this.state.B = this.getAvailable('B');
        if(this.state.A){
            sinte.offOscillator('A');
        }

        if(this.state.B){
            sinte.offOscillator('B');
        }
    }

    /**
     * Muestra un modal
     * 
     * @method showModal
     */
    showModal(){
        this.checkOscillators();
        document.getElementById("backdrop").style.display = "block"
        document.getElementById("modal").style.display = "block"
        document.getElementById("modal").className += "show"
    }

    /**
     * Getter del estado del componente 
     * 
     * @method getState
     * @returns {Object} estado
     */
    getState = ()=>{
        return this.state
    }
    /**
     * Devuelve si esta encendido el oscilador pasado como parametro
     * 
     * @method getAvailable
     * @param {Char} Id Identificador
     * @returns {Boolean} estado
     */
    getAvailable = (osc)=>{
        return sinte.getAvailable(osc)
    }

    /**
     * Setter del nombre del sonido cargado
     * 
     * @method setName
     * @param {string} name 
     */
    setName(name){
        document.getElementById('sound-charged').innerText = name;
    }
    /**
     * Indica al padre que tiene que enseñar el layer de osciladores
     * 
     * @method showOsc
     */
    showOsc(){
       this.props.showOsc()
    }
    /**
     * Indica al padre que tiene que enseñar el layer de efectos
     * 
     * @method showOsc
     */
    showFX(){
        this.props.showFX()
    }
    /**
     * Indica al padre que tiene que enseñar el layer de tabla de sonidos
     * 
     * @method showLb
     */
    showLb(){
        this.props.showLb()
    }
    /**
     * Indica al padre que tiene que enseñar el layer de EQ
     * 
     * @method showEQ
     */
    showEQ(){
        this.props.showEQ()
    }
    /**
     * Indica al padre que tiene que actualizar la tabla de sonidos
     * 
     * @method updateTable
     */
    updateTable = ( )=>{
        this.props.parentCallback();
    }

    /**
     * Gestiona los botones de grabación y manda el mensaje correspondiente a la fachada
     * 
     * @method rec
     * @param {string} state  botón pulsado
     */
    rec(state){
        if(state === 'pause'){
            document.getElementById('restart').style.display = '';
            document.querySelector('#restart').addEventListener('click',()=>this.rec('restart'))

            document.querySelector('#pause').disabled = true;
            document.querySelector('#pause').removeEventListener('click',()=>this.rec('pause'))
            document.getElementById('audio').style.display = '';
        }

        if(state === 'start'){
            document.getElementById('audio').title = 'Record'+ this.state.date.getDate()+'-'+ this.state.date.getMonth()+ '-' + this.state.date.getFullYear();
            document.querySelector('#pause').disabled = false;
            document.querySelector('#pause').addEventListener('click',()=>this.rec('pause'))
            document.getElementById('restart').style.display = 'none';
        }

        if(state === 'restart'){
            document.getElementById('restart').style.display = 'none';
            document.getElementById('audio').style.display = 'none';

        }
        sinte.rec(state)
    }

    /**
     * Método que devuelve el componente Header para ser renderizado
     * 
     * @method render
     * @return Código html del componente Header
     * 
     */
    render(){
        return(
            <Container fluid>
                <Row>
                    <Col style={{padding: 0}} xs={3}>
                    <button className='pages' onClick={()=>this.showOsc()}>Oscs</button>
                    <button  className='pages'onClick={()=>this.showFX()}>FX</button>
                    <button className='pages'  onClick={()=>this.showEQ()}>EQ</button>
                    <button className='pages' onClick={()=>this.showLb()}>Sonidos</button>
                  
                    </Col>
                   
                    <Col  className='save-col' style={{padding: 0}}>
                        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
                        <img alt='save-icon' onClick={()=>this.showModal()} src={disquete} style={{width: 50}}></img>
                        <ModalSave parentCallback={this.getState} parentCallback2={this.updateTable} type='save' />
                    </Col>
                    <Col className='charge-sound'>
                        <div className="LoadedSound" >
                            <p id='sound-charged' style={{marginBottom: 0}}>Sonido</p>
                        </div>
                    </Col>
                    <Col className='save-col' >
                        <div className='device-div'>
                            <p id='device'></p>
                        </div>
                    </Col>
                    <Col className='rec' >
                        <button className='button' onClick={()=>this.rec('start')} id='start'><img src={rec}></img> </button>
                        <button className='button' id='pause' disabled={true} ><img src={pausa}></img></button>
                        <button className='button' onClick={()=>this.rec('stop')} id='restart' style={{display: 'none'}}><img src={reload}></img></button>
                        <audio  controls id='audio' style={{display: 'none'}}></audio>
                    </Col>
                    <Col className='save-col'>
                    <Knob 
                     min={0}
                     max={100}
                     unlockDistance={0}
                     preciseMode={false}
                     width={200} 
                     height={200}
                     val={97}
                     type={knobTypes.MASTER}/>

                 
                    </Col>
                    
                </Row>
            </Container>
        );
    }
}


export default Header;