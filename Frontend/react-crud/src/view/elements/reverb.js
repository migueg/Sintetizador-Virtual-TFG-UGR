import  React from 'react';
import {Container,Row,Col } from 'react-bootstrap';
 

import 'bootstrap/dist/css/bootstrap.css';
import '../../css/reverb.css';

class Reverb extends React.Component{
    #synth
    constructor(props){
        super()
        this.#synth = props.synth
    }
    checkReverb(){
        if(document.getElementById('interruptor').checked){
            this.#synth.applyEffect('reverb');
        }else{
            this.#synth.disapplyEffect('reverb');
        }
        
    }

    render(){
        return(
            <div className='reverb'>
                <Container>
                    <Row>
                        <Col>
                            <div className='toggle-switch'>
                                <input
                                    type="checkbox"
                                    className="toggle-switch-checkbox"  
                                    id={'interruptor'}
                                    onClick ={()=>this.checkReverb()}                      
                                />
                            </div>
                            <h3 style={{float: 'left'}}>Reverb</h3>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Reverb;