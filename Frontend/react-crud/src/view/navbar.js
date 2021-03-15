import React from 'react';
import {NavLink, withRouter}  from 'react-router-dom'
import {Navbar,Nav} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css';
import '../css/App.css'

class Navigator extends React.Component {
    //Metodo que nos devuelve si el nav en el que estamos se encuentra activo
    getNavLinkClass = (path) => {
        return this.props.location.pathname === path ? 'active' : '';
    }
    render() {
        return (
            
            <Navbar collapseOnSelect expand="sm" className="custom"variant="dark"> 
            {
                //la propiedad expand establece cuando el nav bar se va a colapsar en el boton
            }
                <Navbar.Brand href="#">Sintetizador</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"></Navbar.Toggle>
                <Navbar.Collapse id="responsive-navbar-nav">

                
                <Nav className="mr-auto">
                    <Nav.Link className={this.getNavLinkClass("/")} href="/">Osc</Nav.Link>
                </Nav>
            
                </Navbar.Collapse>
            </Navbar>
        )
    }
};
Navigator = withRouter(Navigator);
export default Navigator;