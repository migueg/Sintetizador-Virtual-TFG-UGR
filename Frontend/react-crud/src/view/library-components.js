import  React from 'react';
import {Container,Row,Col } from 'react-bootstrap';
import Table from './elements/table';


import 'bootstrap/dist/css/bootstrap.css';

class Libary extends React.Component{
    constructor(){
        super();
        this.state = {
            charged: ''
            
        }
    }

    componentDidMount(){
    }

    render(){
        return(
        <div  className="LB">
        <Container >
            <Row>
                <Col style={{textAlign: 'center'}}>
                    <h3>Biblioteca de sonidos</h3>

                </Col>
            </Row>
            <Row>
                <Table/>
            </Row>
        </Container>
        </div>
        );
    }
}

export default Libary;