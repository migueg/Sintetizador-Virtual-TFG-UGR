import React from 'react'
import  {Container} from 'react-bootstrap';

import ModalPassword from './elements/modals/modal-password';

import portada from '../img/portada.jpg';
import editar from '../img/editar.png'
import success from '../img/success.png';
import failure from '../img/failure.png';

import '../css/login.css';
import '../css/loader.css';
import 'bootstrap/dist/css/bootstrap.css';


import { sinte } from './osc-components';

class Profile extends React.Component{
    #profile
    
    constructor(){
        super();
        this.state ={}
        this.#profile = {}
        this.edit = {}
        
    }

    
    async componentDidMount(){
       var profile = await sinte.fetchProfile('profile')
       var maxSize = await sinte.fetchProfile('maxSize');
       
       console.log(maxSize)
       this.setState({maxSize: maxSize.msg})
       this.setState({userSpace: profile.profile.size})
       this.setState(profile.profile)
       
       console.log(this.state.maxSize)
       this.__paintProgressBar()

    }

    __paintProgressBar(){
        var value =  Math.round(this.state.userSpace * 1000) / 1000;
        document.getElementById('progress').style.width = value + '%'
        document.getElementById('space-available').innerText = value + '% de ' + this.state.maxSize + ' MB'

    }

    __handleResponse(response){
        document.getElementById('span-username').style.display = 'none';
        document.getElementById('span-email').style.display = 'none';
        document.getElementById('span-no-edit').style.display = 'none';


        if(response.state){
            document.getElementById('text-success').innerText = response.msg;
            this.__hideLoader('200');
            setTimeout(function(){window.location.reload();},2000) //Se recarga la pagina despues de 2 segundos

        }else{
            if(response.code === 409){
                this.__hideLoader('409');

                if(response.msg.search('usuario') !== -1){ //Se encuentra la palabra usuario
                    var span = document.getElementById('span-username');
                    span.style.display = '';
                    span.innerText = '*'+ response.msg;
                    
                }
                if(response.msg.search('email') !== -1){ //Se encuentra la palabra usuario
                    var span = document.getElementById('span-email');
                    span.style.display = '';
                    span.innerText = '*'+ response.msg;
                }
            }else{
                document.getElementById('text-failure').innerText = response.msg;
                this.__hideLoader('500');
            }
        }
    }

    __hideLoader(code){
        document.getElementById('loader').style.display = 'none';
        if(code === '409'){
            document.getElementById('profile').style.display = 'flex'; 
        }
        if(code == '500'){
            document.getElementById('failure').style.display = '';
        }
        if(code == '200'){
            document.getElementById('success').style.display = '';
        }
    }
    __showLoader(){
        document.getElementById('profile').style.display = 'none';
        document.getElementById('loader').style.display = '';
    }
    async confirmEdit(){
        var username = document.getElementById('username')
        var email = document.getElementById('email');
        var date = document.getElementById('date-post')

        var toPost = {}

        if(this.#profile.username !== username.value){
            toPost.username = username.value;
        }

        if(this.#profile.email !== email.value ){
            toPost.email = email.value;
        }

        if(date.value){

            toPost.date = date.value;
        }
        if(Object.keys(toPost).length !== 0){  //Si el json esta vacio se quieren editar campos
            this.__showLoader()
            var response = await sinte.fetchProfile('edit',toPost);
            this.__handleResponse(response)
        }else{
            document.getElementById('span-no-edit').innerText = '*No has editado ningún campo';
            document.getElementById('span-no-edit').style.display = '';
        }

        

    }
    editProfile(){
       var username = document.getElementById('username')
       username.removeAttribute('disabled') 
       var usernameValue = username.value;
       this.#profile.username = usernameValue;

       var email = document.getElementById('email');
       email.removeAttribute('disabled');
       
       var emailValue = email.value;
       this.#profile.email = emailValue;

       document.getElementById('date').style.display = 'none'
       document.getElementById('date-post').style.display = '';

       document.getElementById('edit').style.display = '';
       document.getElementById('cancel').style.display = '';
       

    }

    showModal(){
        document.getElementById("backdrop").style.display = "block"
        document.getElementById("modalPassword").style.display = "block"
        document.getElementById("modalPassword").className += "show"
    }

    toDate(string){
        console.log()
        var split  = string.split('-');
        var year = split[0]
        var month = split[1]
        var day = split[2].split('T')[0]
        var date = day + '/' + month + '/' + year
        return date
    }

    render(){
        return(
            <div style= {{height: '94%'}}>
            < Container id='background'fluid style={{backgroundImage: `url(${portada})`}}>
            <div id='card'  style={{marginTop: '5%', padding: '1%'}}>
                <h1 style={{textAlign: 'center'}}>Perfil</h1>
                <br/>
                
             {
                 this.state.profile ? (
                    <div >
                        <ModalPassword></ModalPassword>
                        <div id='profile' style={{
                            display: 'flex',
                            
                            flexFlow: 'column',
                        
                        }}>
                        <div className='buttons'>
                            <button  type="button" className="btn btn-light"  onClick={() => this.editProfile()}><img style={{width: '2vw'}}src={editar}></img></button>
                            <button  type="button" onClick={()=> this.showModal()} className="btn btn-primary" >Cambiar contraseña</button>

                        </div>
                        <span  style={{display: 'none', color: 'red'}} id='span-no-edit'></span>

                        <label htmlFor='username' style={{marginTop: '2%'}}>Nombre de usuario: </label>
                        <span htmlFor='username' style={{display: 'none', color: 'red'}} id='span-username'></span>
                        <input type='text'  id='username' disabled style={{fontSize: '1.8vh', color: 'rgb(38, 38, 38)'}}  defaultValue={this.state.profile.username} ></input> 
                        <label htmlFor='role' style={{marginTop: '2%'}}>Rol: </label>
                        <input type='text'  id='role' disabled style={{fontSize: '1.8vh', color: 'rgb(38, 38, 38)'}} defaultValue={this.state.profile.role} ></input> 
                        <label htmlFor='email' style={{marginTop: '2%'}}>Email: </label>
                        <span htmlFor='email' style={{display: 'none', color: 'red'}} id='span-email'></span>
                        <input type='email'  id='email' disabled style={{fontSize: '1.8vh', color: 'rgb(38, 38, 38)'}} defaultValue={this.state.profile.email} ></input>
                        <label htmlFor='date' style={{marginTop: '2%'}}>Fecha de nacimiento: </label>
                        <input type='text'  id='date' disabled style={{fontSize: '1.8vh', color: 'rgb(38, 38, 38)'}} defaultValue={this.toDate(this.state.profile.date)} ></input> 
                        <input type='date'  id='date-post'  style={{display: 'none', color: 'rgb(38, 38, 38)'}}  ></input> 

                        <label htmlFor='created'style={{marginTop: '2%'}} >Miembro desde: </label>
                        <input type='text'  id='creted' disabled style={{fontSize: '1.8vh', color: 'rgb(38, 38, 38)'}} defaultValue={this.toDate(this.state.profile.created)} ></input>  
                        <input type='date'  id='created-post'  style={{display: 'none', color: 'rgb(38, 38, 38)'}}  ></input> 

                        <label htmlFor='progress'style={{marginTop: '2%'}} >Espacio disponible: </label>
                        <p id='space-available' style={{fontSize: '1.2vh'}}></p>
                        <div className="progress">
                            <div className="progress-bar progress-bar-striped bg-danger" id='progress' role="progressbar" aria-valuemax="100"></div>
                        </div>
                                                
                        <button  type="button" id='edit' className="btn btn-success" onClick={()=>this.confirmEdit()} style={{display: 'none' , marginTop: '2%'}}>Editar</button>
                        <button  type="button" id='cancel' className="btn btn-danger" onClick={()=>window.location.reload()} style={{display: 'none', marginTop: '2%'}} >Cancelar</button>

                        
                        </div>
                        <div id='loader' style={{display: 'none'}}>
                                <label style={{marginLeft: '3%'}}htmlFor="recipient-name" className="col-form-label">Editando...</label>
                                <div className="loader" id='loader' > </div>

                        </div>
                        <div id='success' style={{display: 'none' , margin: 'auto', flex: 'auto', alignItems: 'center' , alignContent: 'center' , textAlign: 'center'}}>
                            <img alt='success-icon' src={success} style={{width: 60 , marginTop: '5%', marginBottom: '5%'}}/>
                            <p id='text-success'></p>
                   
                        </div>
                        <div id='failure' style={{display: 'none' , margin: 'auto', flex: 'auto', alignItems: 'center' , alignContent: 'center', textAlign:'center' }}>
                            <img alt='failure-icon' src={failure} style={{width: 100 , marginTop: '5%', marginBottom: '5%'}}/>
                            <p id='text-failure' ></p>
                            <button type='button' onClick={()=>{window.location.reload()}} style={{margin: 'auto', marginBottom: '3%'}} className="btn btn-primary">Intentar de nuevo</button>

                        </div>
                    </div>
                    

                 ):(
                     <p>Lo sentimos, hemos tenido un problema al obtener los datos</p>
                 )
             }
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


export default Profile;