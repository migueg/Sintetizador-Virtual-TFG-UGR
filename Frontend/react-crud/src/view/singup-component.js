import React from 'react'
import  {Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import portada from '../img/portada.jpg';
import $ from 'jquery';
import '../css/login.css'


class SingUp extends React.Component{
    constructor(){
        super();
    }

    
    checkForm(){
        document.getElementById('spanpass').style.display = 'none';
        document.getElementById('spanlength').style.display = 'none';
        document.getElementById('span').style.display = 'none';

        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        var password2 = document.getElementById('password2').value;
        var date = document.getElementById('date').value;
        var email = document.getElementById('email').value;

        var send = false;
        var pw = false;
        var length = false

        if(password === password2){
            pw = true;
            if(password.length >= 8){
                length = true;
            }
        }
        if(username !== '' && password !== '' && password2  && 
            date !== '' && email !== ''){
                send = true;
        }

        if(!pw){
            document.getElementById('spanpass').style.display = '';
        }else{
            if(!length){
                document.getElementById('spanlength').style.display = '';
                
            }
            
        }

        
        if(!send){
            document.getElementById('span').style.display = '';
        }

        return false;

    }
    render(){
        return( 
            <div style= {{height: '94%'}}>
            
            < Container id='background'fluid style={{backgroundImage: `url(${portada})`}}>
               
                <div id='card'  className='item2'>
                    <form id='form' style={{width: '90%',
                    marginTop: '4%',
                    marginBottom: '4%',
                    marginLeft: '5%'}}
                    onSubmit={(e)=>e.preventDefault()} >
                    <div className="form-group">
                        <h3 id='singup'>Registro</h3>
                        <span aria-details='singup' style={{color: 'red', display:'none'}}  id='span'>*Todos los campos son obligatorios</span>
                        <span aria-details='singup' style={{color: 'red', display:'none'}}  id='spanpass'>*Ambas contraseñas deben ser iguales</span>
                        <br/>
                        <label htmlFor="username">Nombre de usuario</label>
                        <input type="text" class="form-control" id="username" aria-describedby="nameHelp" placeholder="Nombre de usuario"/>
                        
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="email">Correo electrónico</label>
                        <input type="email" class="form-control" id="email" placeholder="Email"/>
                        
                    </div>
                    <div className="form-group">
                        <label htmlFor="date">Fecha de nacimiento</label>
                        <input type="date" class="form-control" id="date" placeholder="Email"/>
                        
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input type="password" class="form-control" id="password" placeholder="Contraseña"/>
                        <span aria-details='password' style={{color: 'red', display:'none'}}  id='spanlength'>*La contraseña tiene que tener mínimo 8 caracteres</span>

                    </div>
                    <div className="form-group">
                        <label htmlFor="password2">Repita la contraseña</label>
                        <input type="password" class="form-control" id="password2" placeholder="Contraseña"/>
                        
                    </div>
                   
                    <button type="submit" onClick={()=>this.checkForm()} style={{width: '40%' , marginTop: '5%', marginLeft: '30%' }}  class="btn btn-primary">Registrarse</button>
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
            {   
                
               
            }
            </div>


        )
    }
}


export default SingUp;