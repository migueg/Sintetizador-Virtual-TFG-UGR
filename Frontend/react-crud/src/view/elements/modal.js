import  React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { sinte } from '../osc-components';
import success from '../../img/success.png';
import failure from '../../img/failure.png';

import Rating from './rating';
import $ from 'jquery';
import '../../css/loader.css'
class Modal extends React.Component{
    
      constructor(props){
        super();
        
        this.state = { 
            data: [],
            type: props.type,
            valoration: 3
        }
    }

    async componentDidMount(){
           const resp = await sinte.fetchThings('categories');
           this.setState({data: resp})
    }  
     
    getRating = (data)=> {
        this.state.valoration = data;
    }

    __checkOscillators(){
        var state = this.props.parentCallback();
        if(state.A){
            sinte.onOscillator('A');
        }
        if(state.B){
            sinte.onOscillator('B');
        }

    }
    hideModal(){
        this.__checkOscillators();
        $('#save-buttom').removeAttr("disabled");
        document.getElementById('md-body').style.display = 'block';
        document.getElementById('success').style.display = 'none';
        document.getElementById('failure').style.display = 'none';
        document.getElementById('recipient-name').value = "";
        document.getElementById('recipient-description').value = ""
        document.getElementById("backdrop").style.display = "none"
        document.getElementById("save").style.display = "none"
        document.getElementById('span-name').style.display= 'none';
        //document.getElementById("save").classNameName += document.getElementById("save").classNameName.replace("show", "")
    }
    __showLoader(){
        document.getElementById('md-body').style.display = 'none';
        document.getElementById('loader').style.display = 'block';
        $('#save-buttom').attr('disabled',true);
    }
    
    __handleResponse(resp){
        document.getElementById('loader').style.display = 'none';
        if(resp.state){
            document.getElementById('success').style.display = 'block';
            document.getElementById('text-success').innerText = '¡ '+ resp.msg + '!';
        }else{
            document.getElementById('failure').style.display = 'block';
            document.getElementById('text-failure').innerText = 'Vaya...., tenemos problemas. No es posible guadar el sonido. Intentalo más tarde';
        }
    }
    async __saveInBD(data){
        const resp = await sinte.save(data);
        return resp;
    }
    async save(){
        var name = document.getElementById('recipient-name').value
        if(name){
            var desc = document.getElementById('recipient-description').value
            var category = $('#select option:selected').text();
            var toSave = {
                name: name,
                description: desc,
                category: category,
                valoration: this.state.valoration 
            }

            this.__showLoader();
            var resp = await this.__saveInBD(toSave);
            this.__handleResponse(resp)
            
        }else{
            document.getElementById('span-name').style.display= 'block';
        }
    }
    render(){
        return(
            <div>
                <div className="modal fade" id={this.state.type} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered " role="document">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel"> Guardar Sonido</h5>
                            <button type="button" onClick={()=>this.hideModal()}  className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body" id='md-body'>
                            <form>
                            <div className="form-group">
                               
                                <label htmlFor="recipient-name" className="col-form-label">Intruduce un nombre:</label>
                                <span id="span-name" style={{color: 'red', display: 'none'}}>*Este campo es obligatorio</span>
                                <input type="text" className="form-control" id="recipient-name"/>
                                <label htmlFor="recipient-name" className="col-form-label">Selecciona una categoría:</label><br></br>
                                <select className="form-select" id="select" aria-label="Category select">
                                    { 
                                        this.state.data ? (
                                            this.state.data.map(function(category,index){
                                            return <option key={index} value={index}>{category}</option>
                                        })) :
                                        (
                                            
                                            this.__showLoader()
                                            
                                            
                                        )
                                           
                                    }
                                    {
                                        this.state.data ? (
                                            console.log('')
                                        ): (
                                            this.__handleResponse(false)
                                        )
                                    }
                                </select>
                                <br/>
                                <label htmlFor="recipient-name" className="col-form-label">Añade una descripción corta(opcional):</label>
                                <input type="text" className="form-control" id="recipient-description"/>
                                <label htmlFor="recipient-name" className="col-form-label">Valoración:</label>
                                <Rating parentCallback={this.getRating}></Rating>
                            </div>

                            </form>
                        </div>
                        <div id='success' style={{display: 'none' , margin: 'auto', flex: 'auto', alignItems: 'center' , alignContent: 'center' }}>
                            <img src={success} style={{width: 60 , marginLeft: '30%', marginTop: '5%', marginBottom: '5%'}}/>
                            <p id='text-success'></p>
                        </div>
                        <div id='failure' style={{display: 'none' , margin: 'auto', flex: 'auto', alignItems: 'center' , alignContent: 'center' }}>
                        <img src={failure} style={{width: 100 , marginLeft: '30%', marginTop: '5%', marginBottom: '5%'}}/>
                            <p id='text-failure' style={{marginLeft: '5%'}}></p>
                        </div>
                        <div id='loader' style={{display: 'none'}}>
                            <label style={{marginLeft: '3%'}}htmlFor="recipient-name" className="col-form-label">Guardando...</label>
                            <div className="loader" id='loader' > </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" onClick={()=>this.hideModal()} className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                            <button type="button" id='save-buttom' onClick={()=> this.save()} className="btn btn-success">Guardar</button>
                        </div>
                        </div>
                    </div>
                </div>
          <div className="modal-backdrop fade show" id="backdrop" style={{display: 'none'}}></div>
          </div>
        );
    }
}


export default Modal;