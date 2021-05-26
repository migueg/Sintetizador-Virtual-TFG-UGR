import React from 'react';
import {NavLink, withRouter}  from 'react-router-dom'
import {Navbar,Nav} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css';
import '../css/App.css'
import Cookies from 'js-cookie';

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

    isAuthenticated(){
        if(Cookies.get('token')){
            return true;
        }else{
            return false;
        }
    }
 
    logout(){
        if(window.confirm('¿Estas seguro que quieres salir?, se perderán todos los cambios guardados')){
            Cookies.remove('user',{path: ''})
            Cookies.remove('token',{path: ''})

            window.location.reload();
        }
    }
    /**
    * Método que construlle el componente de la interfaz relativo a el navegador.
    * 
    * @method render
    * @returns Código html del componente navegador
    */
    render() {

        if(this.isAuthenticated()){
            return (
            
                <Navbar collapseOnSelect expand="sm" className="custom"variant="dark"> 
                {
                    //la propiedad expand establece cuando el nav bar se va a colapsar en el boton
                }
                    <Navbar.Brand href="/">Sintetizador</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"></Navbar.Toggle>
                    <Navbar.Collapse id="responsive-navbar-nav">
    
                    
                    <Nav className="mr-auto">
                        <Nav.Link className={this.getNavLinkClass("/profile")} href="/profile" >Perfil</Nav.Link>
                        <Nav.Link className={this.getNavLinkClass("#")} onClick={()=>this.logout()}>Logout</Nav.Link>


                    </Nav>
                
                    </Navbar.Collapse>
                </Navbar>
            )
        }else{
            return (
            
                <Navbar collapseOnSelect expand="sm" className="custom"variant="dark"> 
                {
                    //la propiedad expand establece cuando el nav bar se va a colapsar en el boton
                }
                    <Navbar.Brand href="/">Sintetizador</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"></Navbar.Toggle>
                    <Navbar.Collapse id="responsive-navbar-nav">
    
                    
                    <Nav className="mr-auto">
                        <Nav.Link className={this.getNavLinkClass("/login")} href='/' >Login</Nav.Link>
                        <Nav.Link className={this.getNavLinkClass("/singup")} href="/signup">Registro</Nav.Link>

                    </Nav>
                
                    </Navbar.Collapse>
                </Navbar>
            )
        }
        
    }
};
Navigator = withRouter(Navigator);
export default Navigator;