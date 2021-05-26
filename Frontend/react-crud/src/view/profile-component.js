import React from 'react'
import  {Container} from 'react-bootstrap';
import portada from '../img/portada.jpg';
import Cookies from 'js-cookie';
import editar from '../img/editar.png'
import '../css/login.css';
import 'bootstrap/dist/css/bootstrap.css';

class Profile extends React.Component{
    constructor(){
        super();
        this.state ={}
        
        
    }

    async __fetchProfile(){
        var that = this
        const requestOptions = {
            method: 'GET',
            headers: {
                'Authorization': Cookies.get('token'),
                'User': Cookies.get('user')
            }
        }
        console.log(requestOptions.Authorization)
        try{
            await fetch('http://localhost:8080/profile',requestOptions)
            .then(function(response){
                if(response.status === 200){
                    that.setState({data: true})
                }else{
                    that.setState({data: false})
                }
                return response.json();
            })
            .then((data)=>{
                console.log(data)
                if(that.state.data){
                    that.setState({profile: data.msg})
                }else{
                    that.setState({error: data.msg}) 
                }
            })
        }catch(err){
            that.setState({data: false})

        }
    }
    async componentDidMount(){
       await this.__fetchProfile();
    }
    editProfile(){
       var username = document.getElementById('username')
       username.removeAttribute('disabled') 
       var usernameValue = username.value;
      
       var email = document.getElementById('email');
       email.removeAttribute('disabled');
       var emailValue = email.value;

       document.getElementById('date').style.display = 'none'
       document.getElementById('date-post').style.display = '';

       document.getElementById('edit').style.display = '';
       document.getElementById('cancel').style.display = '';
       
       //username.setAttribute('placeholder',value)

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
                <div className='buttons'>
                    <button  type="button" className="btn btn-light"  onClick={() => this.editProfile()}><img style={{width: '2vw'}}src={editar}></img></button>
                    <button  type="button" className="btn btn-primary" >Cambiar contraseña</button>

                </div>
             {
                 this.state.profile ? (
                    <div style={{
                        display: 'flex',
                        
                        flexFlow: 'column',
                       
                    }}>
                    
                    <label htmlFor='username' >Nombre de usuario: </label>
                    <input type='text'  id='username' disabled style={{fontSize: '1.8vh', color: 'rgb(38, 38, 38)'}}  defaultValue={this.state.profile.username} ></input> 
                    <label htmlFor='role' >Rol: </label>
                    <input type='text'  id='role' disabled style={{fontSize: '1.8vh', color: 'rgb(38, 38, 38)'}} defaultValue={this.state.profile.role} ></input> 
                    <label htmlFor='email' >Email: </label>
                    <input type='email'  id='email' disabled style={{fontSize: '1.8vh', color: 'rgb(38, 38, 38)'}} defaultValue={this.state.profile.email} ></input>
                    <label htmlFor='date' >Fecha de nacimiento: </label>
                    <input type='text'  id='date' disabled style={{fontSize: '1.8vh', color: 'rgb(38, 38, 38)'}} defaultValue={this.toDate(this.state.profile.date)} ></input> 
                    <input type='date'  id='date-post'  style={{display: 'none', color: 'rgb(38, 38, 38)'}}  ></input> 

                    <label htmlFor='created' >Miembro desde: </label>
                    <input type='text'  id='creted' disabled style={{fontSize: '1.8vh', color: 'rgb(38, 38, 38)'}} defaultValue={this.toDate(this.state.profile.created)} ></input>  
                    <input type='date'  id='created-post'  style={{display: 'none', color: 'rgb(38, 38, 38)'}}  ></input> 

                    <button  type="button" id='edit' className="btn btn-success" style={{display: 'none'}}>Editar</button>
                    <button  type="button" id='cancel' className="btn btn-danger" style={{display: 'none'}} >Cancelar</button>

                    
                   </div>
                 ):(
                     <p></p>
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