import Modal  from './modal';
import Rating from '../rating';
import success from '../../../img/success.png';
import failure from '../../../img/failure.png';

class ModalSave extends Modal{
    constructor(props){
      
        super('save');
        
    }   

    
    render(){
        return(
            <div>
                <div className="modal fade"  id='modal' tabIndex="-1" role="dialog" aria-labelledby="modalSaveLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered " role="document">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="modalSaveLabel"> Guardar Sonido</h5>
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
                                <input type="text" className="form-control" maxLength='25' id="recipient-description"/>
                                <label htmlFor="recipient-name" className="col-form-label">Valoración:</label>
                                <Rating parentCallback={this.setRating}></Rating>
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

export default ModalSave;