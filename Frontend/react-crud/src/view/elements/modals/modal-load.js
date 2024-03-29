import Modal from './modal';
import success from '../../../img/success.png';
import failure from '../../../img/failure.png';

import $ from 'jquery';

/**
 * Clase que genera el modal de la interfaz para cargar sonidos
 *
 * @class ModalLoad
 * @constructor
 * @see Modal
 */

/**
 * @property id
 * @type string
 */
class ModalLoad extends Modal{
    constructor(){
        super('load');
        this.id = '';
    }

    /**
     * Se encarga de comunicar a la fachada que el usuario quiere cargar un sonido. 
     * Cuando reciba una respuesta, la interpretará
     * 
     * @method delete
     * @async
     */
    async load(){
        $('#load-buttom').attr('disabled',true);
        $('#close-load-buttom').attr('disabled',true);
        this.__showLoader();

        var rsp = await this.props.parentCallback()
        var response = {
            state: false
        }
        if(rsp){
            response.state= rsp
            response.msg = 'Sonido cargado con éxito'

        }

        this.__handleResponse(response)

    }

    /**
     * Se encarga de mostrar el modal
     * 
     * @method show 
     * @param {string} id Identidicador del modal
     */
    show(id){
        this.id = id;
        document.getElementById("backdrop").style.display = "block"
        document.getElementById("modalLoad").style.display = "block"
        document.getElementById("modalLoad").className += "show" 
    }

    /**
     * Método que devuelve el componente ModalLoad para ser renderizado
     * 
     * @method render
     * @return Código html del componente Distorsion
     * 
     */
    render(){
        return(
            <div>
            <div className="modal fade"  id='modalLoad' tabIndex="-1" role="dialog" aria-labelledby="modalLoadLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered " role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="modalLoadLabel">¿Estás seguro que quieres cargar el sonido?</h5>
                        <button type="button" onClick={()=>this.hideModal()}  className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body" id='md-body-loader'>
                        <h5>Se perderán los cambios no guardados hasta ahora</h5>
                    </div>
                    <div id='success-loader' style={{display: 'none' , margin: 'auto', flex: 'auto', alignItems: 'center' , alignContent: 'center' }}>
                        <img alt='success-icon' src={success} style={{width: 60 , marginLeft: '30%', marginTop: '5%', marginBottom: '5%'}}/>
                        <p id='text-success-loader'></p>
                    </div>
                    <div id='failure-loader' style={{display: 'none' , margin: 'auto', flex: 'auto', alignItems: 'center' , alignContent: 'center' }}>
                    <img alt='failure-icon' src={failure} style={{width: 100 , marginLeft: '30%', marginTop: '5%', marginBottom: '5%'}}/>
                        <p id='text-failure-loader' style={{marginLeft: '5%'}}></p>
                    </div>
                    <div id='loader-loader' style={{display: 'none'}}>
                        <label style={{marginLeft: '3%'}}htmlFor="recipient-name" className="col-form-label">Cargando...</label>
                        <div className="loader" id='loader' > </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" onClick={()=>this.hideModal()} className="btn btn-secondary" id='close-load-buttom'data-dismiss="modal">Cerrar</button>
                        <button type="button" id='load-buttom' onClick={()=>this.load()} className="btn btn-success">Cargar</button>
                    </div>
                    </div>
                </div>
            </div>
      <div className="modal-backdrop fade show" id="backdrop" style={{display: 'none'}}></div>
      </div>
        )
    }
}


export default ModalLoad;