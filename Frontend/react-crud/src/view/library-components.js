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
        this.child = React.createRef();
        this.updateTable = this.updateTable.bind(this);
        this.newState = {}
    }

    updateTable(){
       this.child.current.updateTable();
    }
    
    loadSound(){
        this.newState = this.child.current.newState;
        return this.props.parentCallback();
    }

    render(){
        return(
        <div  className="LB">
        <Container fluid style={{height: '30%'}}>
            <Row>
                <Col style={{textAlign: 'center'}}>
                    <h3>Biblioteca de sonidos</h3>

                </Col>
            </Row>
            <Row style={{width: '90%', marginLeft: '5%', alignItems: 'center' ,alignContent:'center'}}>
                <Table parentCallback={()=>this.loadSound()} ref={this.child} />
            </Row>
        </Container>
        </div>
        );
    }
}

export default Libary;