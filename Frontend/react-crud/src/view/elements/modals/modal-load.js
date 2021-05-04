import Modal from './modal';
import success from '../../../img/success.png';
import failure from '../../../img/failure.png';

import $ from 'jquery';

class ModalLoad extends Modal{
    constructor(){
        super('load');
        this.id = '';
    }

    async load(){
        
        await this.props.parentCallback()
        $('#load-buttom').attr('disabled',true);

    }
    show(id){
        this.id = id;
        document.getElementById("backdrop").style.display = "block"
        document.getElementById("modalLoad").style.display = "block"
        document.getElementById("modalLoad").className += "show" 
    }
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
                    <div className="modal-body" id='md-body'>
                        <h5>Se perderán los cambios no guardados hasta ahora</h5>
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