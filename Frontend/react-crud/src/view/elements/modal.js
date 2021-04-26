import  React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { sinte } from '../osc-components';
import Rating from './rating';
import $ from 'jquery';

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

    hideModal(){
        document.getElementById('recipient-name').value = ""
        document.getElementById("backdrop").style.display = "none"
        document.getElementById("save").style.display = "none"
        document.getElementById('span-name').style.display= 'none';
        //document.getElementById("save").classNameName += document.getElementById("save").classNameName.replace("show", "")
    }
    
    save(){
        var name = document.getElementById('recipient-name').value
        if(name){
            var desc = document.getElementById('recipient-description').value
            var category = $('#select option:selected').text();
            console.log(category)
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
                        <div className="modal-body">
                            <form>
                            <div className="form-group">
                               
                                <label htmlFor="recipient-name" className="col-form-label">Intruduce un nombre:</label>
                                <span id="span-name" style={{color: 'red', display: 'none'}}>*Este campo es obligatorio</span>
                                <input type="text" className="form-control" id="recipient-name"/>
                                <label htmlFor="recipient-name" className="col-form-label">Selecciona una categoría:</label><br></br>
                                <select className="form-select" id="select" aria-label="Category select">
                                    {this.state.data.map(function(category,index){
                                            return <option value={index}>{category}</option>
                                        })
                                        
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
                        <div className="modal-footer">
                            <button type="button" onClick={()=>this.hideModal()} className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                            <button type="button" onClick={()=> this.save()} className="btn btn-success">Guardar</button>
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