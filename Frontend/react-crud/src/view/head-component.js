import  React from 'react';
import {Knob} from './elements/limitedKnob';
import {types as knobTypes} from './elements/knobtypes';
import {Container,Row,Col } from 'react-bootstrap';

import disquete from '../img/disquete.png'
import 'bootstrap/dist/css/bootstrap.css';
import '../css/header.css';


class Header extends React.Component{
    constructor(props){
        super();
        this.props = props;
   
        this.showOsc = this.showOsc.bind(this)
        this.showFX = this.showFX.bind(this)
    }
    showOsc(){
       this.props.showOsc()
    }
    showFX(){
        this.props.showFX()
    }
    render(){
        return(
            <Container>
                <Row>
                    <Col>
                    <button  onClick={()=>this.showOsc()}>Oscs</button>
                    <button  onClick={()=>this.showFX()}>FX</button>
                    </Col>
                   
                    <Col>
                        <img   src={disquete} style={{width: 50, float: 'right' , marginTop: '2%'}}></img>
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