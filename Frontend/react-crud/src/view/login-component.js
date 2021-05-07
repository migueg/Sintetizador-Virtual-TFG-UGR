import React from 'react'
import  {Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import portada from '../img/portada.jpg'
import '../css/login.css'
import { Link } from 'react-router-dom';

class Login extends React.Component{
    constructor(){
        super();
    }

    checkForm(){
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        var send = false
        if(username !== '' && password !== '' ){
            send = true;
        }

        if(!send){
            document.getElementById('span').style.display = '';
        }
    }
    render(){
        return( 
            <div style= {{height: '94%'}}>
            
            < Container id='background'fluid style={{backgroundImage: `url(${portada})`}}>
                <div className='item1'>
                    <h1>¡Bienvenido!</h1>
                    <h6>¿Estás preparado para empezar a crear?</h6>
                </div>
                <div id='card'  className='item2'>
                    <form style={{width: '90%',
                    marginTop: '4%',
                    marginBottom: '4%',
                    marginLeft: '5%'}}>
                    <div className="form-group">
                        <h3 id='login'>Log In</h3>
                        <span aria-details='login' style={{color: 'red', display:'none'}}  id='span'>*Todos los campos son obligatorios</span>
                        <br/>
                        <label htmlFor="username">Nombre de usuario</label>
                        <input type="email" class="form-control" id="username" aria-describedby="nameHelp" placeholder="Nombre de usuario"/>
                        
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input type="password" class="form-control" id="password" placeholder="Contraseña"/>
                        
                    </div>
                    <label htmlFor='register'>¿Aún no tienes una cuenta?</label>
                    <Link style={{marginLeft: '2%'}} to='/singup' id='register'>Regístrate</Link> <br/>
                    <button type="submit"style={{width: '40%' , marginTop: '5%', marginLeft: '30%' }} onClick={()=>this.checkForm()} class="btn btn-primary">Entrar</button>
                    </form>
                </div>
            </Container>
            <Container style={{height: '10.5%' , padding: 0}} fluid>
             <footer  style={{height: '100%', width: '100%'}} class="bg-light text-center text-lg-start">
               
                <div class="text-center p-3" id='footer' >
                    © 2021 Copyright:
                    <a class="text-dark" href="https://www.linkedin.com/in/miguel-garc%C3%ADa-tenorio-114352201/">Miguel García Tenorio</a>
                </div>
               
                </footer>
            </Container>
            </div>


        )
    }
}

export default Login;