import React from 'react'
import  {Container,Row,Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import portada from '../img/portada.gif'

class Login extends React.Component{
    constructor(){
        super();
    }

    render(){
        return( 
            <div>

            < Container  fluid style={{backgroundImage: `url(${portada})`,
            backgroundRepeat: 'no-repeat', 
            backgroundSize: '100%',
             width:'100%', minHeight: '100%',
             height: '100%' , 
              display: 'flex' , 
                alignContent: 'center' ,
                alignItems: 'center',
                justifyContent: 'space-around',
             paddingBottom: '0%'}}>

                <div style={{width: '40%' , backgroundColor: 'RGB(214, 223, 227,0.7)'}}>
                <form style={{width: '100%'}}>
                    <div className="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"/>
                    </div>
                    <div className="form-check">
                        <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
                        <label class="form-check-label" for="exampleCheck1">Check me out</label>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                </div>
            </Container>
            <Container fluid>
                <h1>Footer</h1>
            </Container>
            </div>


        )
    }
}

export default Login;