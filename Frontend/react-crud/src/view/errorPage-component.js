
import React from 'react'
import  {Container} from 'react-bootstrap';
import portada from '../img/portada.jpg';

import '../css/login.css';

/**
 * Proporciona el componente para la vista de error
 * 
 * @class ErrorPage
 * @constructor
 */
class ErrorPage extends React.Component{
    constructor(){
        super();
    }

    /**
     * Método que devuelve el componente Errorpage para ser renderizado
     * 
     * @method render
     * @return Código html del componente Errorpage
     * 
     */
    render(){
        return(
            <div style= {{height: '94%'}}>
            < Container id='background'fluid style={{backgroundImage: `url(${portada})`}}>
            <div id='card'  style={{marginTop: '20%', padding: '5%'}}className='item2'>
                <h3>404- Lo sentimos, página no encontrada!</h3>
            </div>
            </Container>
              <Container style={{height: '10.5%' , padding: 0}} fluid>
              <footer  style={{height: '100%', width: '100%'}} className="bg-light text-center text-lg-start">
                
                 <div className="text-center p-3" id='footer' >
                     © 2021 Copyright:
                     <a className="text-dark" href="https://www.linkedin.com/in/miguel-garc%C3%ADa-tenorio-114352201/">Miguel García Tenorio</a>
                 </div>
                
                 </footer>
             </Container>
             </div>
        )
       
    }
}


export default ErrorPage;