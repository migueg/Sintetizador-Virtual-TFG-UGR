import Modal from './modal';
import success from '../../../img/success.png';
import failure from '../../../img/failure.png';

import $ from 'jquery';

/**
 * Clase que genera el modal de la interfaz para borrar sonidos
 *
 * @class ModalDelete
 * @constructor
 * @see Modal
 */

/**
 * @property id
 * @type string
 */
class ModalDelete extends Modal{
    constructor(){
        super('delete');
        this.id = '';
    }

    /**
     * Se encarga de comunicar a la fachada que el usuario quiere eliminar un sonido. 
     * Cuando reciba una respuesta, la interpretará
     * 
     * @method delete
     * @async
     */
    async delete(){
        
        this.__showLoader();

        var rsp = await this.props.parentCallback2()

        var response = {
            state: false
        }
        if(rsp){
            response.state= rsp.state
            response.msg = rsp.msg

        }

        this.__handleResponse(response)

        if(response.state){ 
            setTimeout(function(){window.location.reload()},1000)
        }

    }

    /**
     * Se encarga de mostrar el modal
     * 
     * @method show 
     * @param {string} id Identidicador del modal
     */
    show(id){
        $('#close-delete-buttom').attr('disabled',false);
        $('#delete-buttom').attr('disabled',false);
        this.id = id;
        document.getElementById("backdrop").style.display = "block"
        document.getElementById("modalDelete").style.display = "block"
        document.getElementById("modalDelete").className += "show" 
    }
    /**
     * Método que devuelve el componente ModalDelte para ser renderizado
     * 
     * @method render
     * @return Código html del componente Distorsion
     * 
     */
    render(){
        return(
            <div>
            <div className="modal fade"  id='modalDelete' tabIndex="-1" role="dialog" aria-labelledby="modalDeleteLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered " role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="modalDeleteLabel">¿Estás seguro que quieres eliminar el sonido?</h5>
                        <button type="button" onClick={()=>this.hideModal()}  className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body" id='md-body-delete'>
                        <h5>No podrás recuperarlo una vez eliminado </h5>
                    </div>
                    <div id='success-delete' style={{display: 'none' , margin: 'auto', flex: 'auto', alignItems: 'center' , alignContent: 'center' }}>
                        <img alt='success-icon' src={success} style={{width: 60 , marginLeft: '30%', marginTop: '5%', marginBottom: '5%'}}/>
                        <p id='text-success-delete'></p>
                    </div>
                    <div id='failure-delete' style={{display: 'none' , margin: 'auto', flex: 'auto', alignItems: 'center' , alignContent: 'center' }}>
                    <img alt='failure-icon' src={failure} style={{width: 100 , marginLeft: '30%', marginTop: '5%', marginBottom: '5%'}}/>
                        <p id='text-failure-delete' style={{marginLeft: '5%'}}></p>
                    </div>
                    <div id='loader-delete' style={{display: 'none'}}>
                        <label style={{marginLeft: '3%'}}htmlFor="recipient-name" className="col-form-label">Cargando...</label>
                        <div className="loader" id='loader' > </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" onClick={()=>this.hideModal()} className="btn btn-secondary" id='close-delete-buttom'data-dismiss="modal">Cancelar</button>
                        <button type="button" id='delete-buttom' onClick={()=>this.delete()} className="btn btn-danger">Eliminar</button>
                    </div>
                    </div>
                </div>
            </div>
      <div className="modal-backdrop fade show" id="backdrop" style={{display: 'none'}}></div>
      </div>
        )
    }
}

export default ModalDelete