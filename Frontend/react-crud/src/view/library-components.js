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
    }

    updateTable(){
       this.child.current.updateTable();
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
            <Row style={{alignItems: 'center' ,alignContent:'center'}}>
                <Table ref={this.child} />
            </Row>
        </Container>
        </div>
        );
    }
}

export default Libary;