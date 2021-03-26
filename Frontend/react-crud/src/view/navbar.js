import React from 'react';
import {NavLink, withRouter}  from 'react-router-dom'
import {Navbar,Nav} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css';
import '../css/App.css'

/**
 * Proporciona la barra de navegación del Frontend
 * 
 * @module Navigator
 */

/**
 * Esta clase genera el componente de la interfaz correspondiente
 * con la barra de navegación
 *
 * @class Navigator
 * @constructor
 */
class Navigator extends React.Component {
    /**
     * Método que obtiene el link activo
     * 
     * @method getNavLinkClass
     * @param {String} path link
     */
    getNavLinkClass = (path) => {
        return this.props.location.pathname === path ? 'active' : '';
    }
    /**
    * Método que construlle el componente de la interfaz relativo a el navegador.
    * 
    * @method render
    * @returns Código html del componente navegador
    */
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