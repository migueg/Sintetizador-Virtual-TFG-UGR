import  React from 'react';
import {Knob} from './elements/limitedKnob';
import {types as knobTypes} from './elements/knobtypes';
import {Container,Row,Col } from 'react-bootstrap';
import Modal from './elements/modal';



import disquete from '../img/disquete.png'
import 'bootstrap/dist/css/bootstrap.css';
import '../css/header.css';
import { sinte } from './osc-components';


class Header extends React.Component{
    constructor(props){
        super();
        this.props = props;
        
        this.state = {
            A: false,
            B: false
        }
        this.showOsc = this.showOsc.bind(this)
        this.showFX = this.showFX.bind(this)
    
    }
    
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
    showModal(){
        this.checkOscillators();
        document.getElementById("backdrop").style.display = "block"
        document.getElementById("save").style.display = "block"
        document.getElementById("save").className += "show"
    }

    getState = ()=>{
        return this.state
    }

    getAvailable = (osc)=>{
        return sinte.getAvailable(osc)
    }
    showOsc(){
       this.props.showOsc()
    }
    showFX(){
        this.props.showFX()
    }
    showLb(){
        this.props.showLb()
    }
    updateTable = ( )=>{
        this.props.parentCallback();
    }
    render(){
        return(
            <Container>
                <Row>
                    <Col>
                    <button  onClick={()=>this.showOsc()}>Oscs</button>
                    <button  onClick={()=>this.showFX()}>FX</button>
                    <button  onClick={()=>this.showLb()}>Biblioteca</button>
                    </Col>
                   
                    <Col>
                        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
                        <img  onClick={()=>this.showModal()} src={disquete} style={{width: 50, float: 'right' , marginTop: '2%'}}></img>
                        <Modal parentCallback={this.getState} parentCallback2={this.updateTable} type='save' />
                    </Col>
                    <Col>
                        <div className="LoadedSound" >
                            Sonido
                        </div>
                    </Col>
                    <Col>
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