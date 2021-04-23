import  React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { sinte } from '../osc-components';


class Modal extends React.Component{
    #type
    constructor(props){
        super();
        this.#type = props.type;
    }

    hideModal(){
        document.getElementById('recipient-name').value = ""
        document.getElementById("backdrop").style.display = "none"
        document.getElementById("save").style.display = "none"
        document.getElementById('span-name').style.display= 'none';
        document.getElementById("save").className += document.getElementById("save").className.replace("show", "")
    }
    
    save(){
        var name = document.getElementById('recipient-name').value
        if(name){
            sinte.save(name);
        }else{
            document.getElementById('span-name').style.display= 'block';
        }
    }
    render(){
        return(
            <div>
                <div class="modal fade" id={this.#type} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered " role="document">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel"> Guardar Sonido</h5>
                            <button type="button" onClick={()=>this.hideModal()}  class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form>
                            <div class="form-group">
                                <span id="span-name" style={{color: 'red', display: 'none'}}>*Este campo es obligatorio</span>
                                <label for="recipient-name" class="col-form-label">Intruduce un nombre:</label>
                                <input type="text" class="form-control" id="recipient-name"/>
                            </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" onClick={()=>this.hideModal()} class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                            <button type="button" onClick={()=> this.save()} class="btn btn-success">Guardar</button>
                        </div>
                        </div>
                    </div>
                </div>
          <div class="modal-backdrop fade show" id="backdrop" style={{display: 'none'}}></div>
          </div>
        );
    }
}


export default Modal;