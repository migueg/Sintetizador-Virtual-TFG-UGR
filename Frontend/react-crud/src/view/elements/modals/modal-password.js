import Modal  from './modal';
import success from '../../../img/success.png';
import failure from '../../../img/failure.png';
import { sinte } from '../../osc-components';

class ModalPassword extends Modal{
    constructor(){
        super('password')
    }

    async sendPassword(){
        var password = document.getElementById('recipient-password').value;
        var password2 = document.getElementById('recipient-password2').value;
        document.getElementById('span-password').style.display = 'none';
        document.getElementById('span-password2').style.display = 'none';
        document.getElementById('span-password-length').style.display = 'none';
        document.getElementById('span-password-coincidence').style.display = 'none';


        if(!password){
            document.getElementById('span-password').style.display = '';
        }else{
            if(!password2){
                document.getElementById('span-password2').style.display = '';

            }else{
                console.log(password.length)
                if(password.length < 8){
                    document.getElementById('span-password-length').style.display = '';
                }else{
                    if(password != password2){
                        document.getElementById('span-password-coincidence').style.display = '';
                    }else{
                        
                        this.__showLoader();
                        var result = await sinte.fetchProfile('password',{password: password});
                        
                        this.__handleResponse(result)
                        
                    }
                }
            }
        }
    }
    render(){
        return(
            <div>
            <div className="modal fade"  id='modalPassword' tabIndex="-1" role="dialog" aria-labelledby="modalLoadLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered " role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="modalPasswordLabel">Cambio de contraseña:</h5>
                        <button type="button" onClick={()=>this.hideModal()}  className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body" id='md-body-password'>
                    <span id="span-password-coincidence" style={{color: 'red', display: 'none'}}>*La contraseñas no coinciden</span>

                        <div className="form-group">
                            <label htmlFor="recipient-password" className="col-form-label">Nueva contraseña:</label>
                            <span id="span-password" style={{color: 'red', display: 'none'}}>*Este campo es obligatorio</span>
                            <span id="span-password-length" style={{color: 'red', display: 'none'}}>*La contraseña tiene que tener mínimo 8 caracteres</span>
                            <input type="password" className="form-control" id="recipient-password"/>
                            <label htmlFor="recipient-password2" className="col-form-label">Repite la nueva contraseña:</label>
                            <span id="span-password2" style={{color: 'red', display: 'none'}}>*Este campo es obligatorio</span>
                            <input type="password" className="form-control" id="recipient-password2"/>
                        </div>
                    </div>
                    <div id='success-password' style={{display: 'none' , margin: 'auto', flex: 'auto', alignItems: 'center' , alignContent: 'center' }}>
                        <img alt='success-icon' src={success} style={{width: 60 , marginLeft: '30%', marginTop: '5%', marginBottom: '5%'}}/>
                        <p id='text-success-password'></p>
                    </div>
                    <div id='failure-password' style={{display: 'none' , margin: 'auto', flex: 'auto', alignItems: 'center' , alignContent: 'center' }}>
                    <img alt='failure-icon' src={failure} style={{width: 100 , marginLeft: '30%', marginTop: '5%', marginBottom: '5%'}}/>
                        <p id='text-failure-password' style={{marginLeft: '5%'}}></p>
                    </div>
                    <div id='loader-password' style={{display: 'none'}}>
                        <label style={{marginLeft: '3%'}}htmlFor="recipient-name" className="col-form-label">Cargando...</label>
                        <div className="loader" id='loader' > </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" onClick={()=>this.hideModal()} className="btn btn-secondary" id='close-password-buttom'data-dismiss="modal">Cerrar</button>
                        <button type="button" id='password-buttom' onClick={()=>this.sendPassword()} className="btn btn-success">Enviar</button>
                    </div>
                    </div>
                </div>
            </div>
      <div className="modal-backdrop fade show" id="backdrop" style={{display: 'none'}}></div>
      </div>
        )
    }
}

export default ModalPassword