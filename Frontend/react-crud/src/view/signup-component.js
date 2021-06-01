import React from 'react'
import  {Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import portada from '../img/portada.jpg';
import success from '../img/success.png';
import failure from '../img/failure.png';



import '../css/login.css';
import '../css/loader.css';


class SignUp extends React.Component{
    constructor(){
        super();
        this.data= {}
    }

    __showLoader(){
        document.getElementById('form').style.display = 'none';
        document.getElementById('loader').style.display = '';
    }
    async register(reg){
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reg)
        };
        var that = this;
        try{
            await fetch('http://localhost:8080/singup',requestOptions)
            .then(function(response){
                if(response.status !== 500){
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
                        msg: data.msg
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

     handleResponse(){
        if( this.data.state){
            document.getElementById('success').style.display = '';
            document.getElementById('text-success').innerText = this.data.msg;

        }else{
            document.getElementById('failure').style.display = '';
            document.getElementById('text-failure').innerText = this.data.msg;

        }
        document.getElementById('loader').style.display = 'none';
    }   
    
    async checkForm(){
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
            send = false;
        }else{
            if(!length){
                document.getElementById('spanlength').style.display = '';
                send = false;
                
            }
            
        }

        
        if(!send){
            if(pw && length){
                document.getElementById('span').style.display = '';
            }
        }else{
            this.__showLoader();
            const user = {
                user:{
                    username: username,
                    email: email,
                    password: password,
                    date: date
                }
                
            }
            
            await this.register(user);
            this.handleResponse()
        }

        

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
                        <input type="text" className="form-control" id="username" aria-describedby="nameHelp" placeholder="Nombre de usuario"/>
                        
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="email">Correo electrónico</label>
                        <input type="email" className="form-control" id="email" placeholder="Email"/>
                        
                    </div>
                    <div className="form-group">
                        <label htmlFor="date">Fecha de nacimiento</label>
                        <input type="date" className="form-control" id="date" placeholder="Email"/>
                        
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input type="password" className="form-control" id="password" placeholder="Contraseña"/>
                        <span aria-details='password' style={{color: 'red', display:'none'}}  id='spanlength'>*La contraseña tiene que tener mínimo 8 caracteres</span>

                    </div>
                    <div className="form-group">
                        <label htmlFor="password2">Repita la contraseña</label>
                        <input type="password" className="form-control" id="password2" placeholder="Contraseña"/>
                        
                    </div>

                  
                    <button type="submit" onClick={()=>this.checkForm()} style={{width: '40%' , marginTop: '5%', marginLeft: '30%' }}  className="btn btn-primary">Registrarse</button>
                    </form>

                    <div id='success' style={{display: 'none' , margin: 'auto', flex: 'auto', alignItems: 'center' , alignContent: 'center' , textAlign: 'center'}}>
                            <img alt='success-icon' src={success} style={{width: 60 , marginTop: '5%', marginBottom: '5%'}}/>
                            <p id='text-success'></p>
                            <button type='button' onClick={()=>{window.location.replace('http://localhost:3000')}} style={{margin: 'auto', marginBottom: '3%'}}className="btn btn-primary">Log in</button>

                    </div>

                    <div id='failure' style={{display: 'none' , margin: 'auto', flex: 'auto', alignItems: 'center' , alignContent: 'center', textAlign:'center' }}>
                        <img alt='failure-icon' src={failure} style={{width: 100 , marginTop: '5%', marginBottom: '5%'}}/>
                            <p id='text-failure' ></p>
                            <button type='button' onClick={()=>{window.location.reload()}} style={{margin: 'auto', marginBottom: '3%'}} className="btn btn-primary">Intentar de nuevo</button>

                    </div>

                    <div id='loader' style={{display: 'none'}}>
                            <label style={{marginLeft: '3%'}}htmlFor="recipient-name" className="col-form-label">Guardando...</label>
                            <div className="loader" id='loader' > </div>

                    </div>
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
            {   
                
               
            }
            </div>


        )
    }
}


export default SignUp;