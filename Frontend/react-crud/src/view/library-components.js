import  React from 'react';
import {Container,Row,Col } from 'react-bootstrap';
import Table from './elements/table';


import 'bootstrap/dist/css/bootstrap.css';

/**
 * Clase que proporciona el layer de la tabla de sonidos
 * 
 * @class Library
 * @constructor
 */
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

    /**
     * Indica al hijo que debe actualizar la tabla
     * 
     * @method updateTable
     */
    updateTable(){
       this.child.current.updateTable();
    }
    
    /**
     * Obtiene el nuevo estado y se lo pasa al padre
     * 
     * @returns {Object} datos del sonido
     */
    loadSound(){
        this.newState = this.child.current.newState;
        return this.props.parentCallback();
    }
    /**
     * Método que devuelve el componente Library para ser renderizado
     * 
     * @method render
     * @return Código html del componente Library
     * 
     */
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