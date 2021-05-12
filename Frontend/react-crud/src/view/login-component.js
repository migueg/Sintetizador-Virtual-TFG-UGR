import React from 'react'
import  {Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import portada from '../img/portada.jpg'
import '../css/login.css'
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
class Login extends React.Component{
    constructor(){
        super();
        this.data = {}
    }

    checkStatus(status){
        switch(status){
            case 400:
                return false;
            case 500:
                return false;
            case 401:
                return false;
            case 200:
                return true;
            case 201:
                return true;
            default:
                break;
        }
    }
    async __login(user){
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'same-origin',
            body: JSON.stringify(user)
            
        };

        var that = this
        try{
            await fetch('http://localhost:8080/singin',requestOptions)
            .then(function(response){
            
                if(that.checkStatus(response.status)){
                    that.data.state = true;
                }else{
                    that.data.state = false;
                  
                }
                return response.json()
            })
            .then((data) =>{
                if(that.data.state){
                    that.data = {
                        state: true,
                        msg: data.msg.token,
                        user: data.msg.user

                    }
                }else{
                        that.data = {
                            state: false,
                            msg: data.msg
                        }
                    }
                })
            
        }catch(err){

            that.data = {
                state: false,
                msg: err
            };
            console.error(err);
        }

    }
    async checkForm(){
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        var send = false
        if(username !== '' && password !== '' ){
            send = true;
        }

        if(!send){
            document.getElementById('span').style.display = '';
        }else{
            var user = {
                user: {
                    username: username,
                    password: password
                }
            }
    
            await this.__login(user)
            if(this.data.state){
                Cookies.set('token',this.data.msg,{expires:2, path:'' })
                Cookies.set('user',this.data.user,{expires:2, path:'' })
                window.location.replace('http://localhost:3000/synth')

            }

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
                    marginLeft: '5%'}}
                    onSubmit={(e)=>e.preventDefault()}>
                    <div className="form-group">
                        <h3 id='login'>Log In</h3>
                        <span aria-details='login' style={{color: 'red', display:'none'}}  id='span'>*Todos los campos son obligatorios</span>
                        <br/>
                        <label htmlFor="username">Nombre de usuario</label>
                        <input type="text" className="form-control" id="username" aria-describedby="nameHelp" placeholder="Nombre de usuario"/>
                        
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input type="password" className="form-control" id="password" placeholder="Contraseña"/>
                        
                    </div>
                    <label htmlFor='register'>¿Aún no tienes una cuenta?</label>
                    <Link style={{marginLeft: '2%'}} to='/signup' id='register'>Regístrate</Link> <br/>
                    <button type="submit"style={{width: '40%' , marginTop: '5%', marginLeft: '30%' }} onClick={()=>this.checkForm()} className="btn btn-primary">Entrar</button>
                    </form>
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

export default Login;