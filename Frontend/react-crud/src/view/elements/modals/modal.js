import  React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { sinte } from '../../osc-components';



import $ from 'jquery';
import '../../../css/loader.css'

/**
 * Clase que encapsula el comportamiento común de los modales.
 *
 * @class Modal
 * @constructor
 * @param {string} type Tipo de modal
 */
class Modal extends React.Component{
    
      constructor(type){
        super();
        
        this.state = { 
            data: [],
            type: type,
            valoration: 3
        }
    }

    /**
     * Método que se ejecuta antes de que el componente se renderice. Se encarga
     * de pedir las categorías y setearlas.
     * 
     * @method componentDidMount
     */
    async componentDidMount(){
           const resp = await sinte.fetchThings('categories');
           this.setState({data: resp})
    }  

    /**
     * Setter de la valoración
     * 
     * @method setRating
     * @param {Float} data Valoración
     */
     
    setRating = (data)=> {
        this.state.valoration = data;
    }

    /**
     * Compureba que osciladores están encendidos
     * 
     * @methos checkOscillators
     * @private
     */
    __checkOscillators(){
        var state = this.props.parentCallback();
        if(state.A){
            sinte.onOscillator('A');
        }
        if(state.B){
            sinte.onOscillator('B');
        }

    }

    /**
     * Se encarga de ocultar los modales
     * 
     * @method hideModal
     */
    hideModal(){
        if(this.state.type === 'save'){
            this.__checkOscillators();
            $('#save-buttom').removeAttr("disabled");
            document.getElementById("modal").style.display = "none"
            document.getElementById('recipient-name').value = "";
            document.getElementById('recipient-description').value = ""
            document.getElementById('md-body').style.display = 'block';
            document.getElementById('success').style.display = 'none';
            document.getElementById('failure').style.display = 'none';
            document.getElementById('span-name').style.display= 'none';
        }else if(this.state.type === 'load'){
            this.__checkOscillators();
            $('#load-buttom').removeAttr("disabled");
            document.getElementById('md-body-loader').style.display = 'block';
            document.getElementById("modalLoad").style.display = "none"
            document.getElementById('success-loader').style.display = 'none';
            document.getElementById('failure-loader').style.display = 'none';
        }else if(this.state.type === 'password'){
            $('#password-buttom').removeAttr("disabled");
            document.getElementById('md-body-password').style.display = 'block';
            document.getElementById("modalPassword").style.display = "none"
            document.getElementById('success-password').style.display = 'none';
            this.__cleanPasswords();
            
        }else if(this.state.type === 'delete'){
            document.getElementById('md-body-delete').style.display = 'block';
            document.getElementById("modalDelete").style.display = "none"
            document.getElementById('success-delete').style.display = 'none';
            document.getElementById('failure-delete').style.display = 'none';
        }
       
        
        document.getElementById("backdrop").style.display = "none"
        
        //document.getElementById("save").classNameName += document.getElementById("save").classNameName.replace("show", "")
    }

    /**
     * Se encarga de limpiar las contraseñas
     * 
     * @method cleanPasswords
     * @private
     */
    __cleanPasswords(){
        document.getElementById('failure-password').style.display = 'none';
        document.getElementById('span-password').style.display = 'none';
        document.getElementById('span-password2').style.display = 'none';
        document.getElementById('span-password-length').style.display = 'none';
        document.getElementById('span-password-coincidence').style.display = 'none';
        document.getElementById('recipient-password').value = '';
        document.getElementById('recipient-password2').value = '';
    }

    /**
     * Se encarga de enseñar el loader
     * 
     * @method showLoader
     * @private
     */
    __showLoader(){
        if(this.state.type === 'save'){
            $('#save-buttom').attr('disabled',true);
            document.getElementById('md-body').style.display = 'none';
            document.getElementById('loader').style.display = 'block';
        }else if(this.state.type === 'password'){
            $('#password-buttom').attr('disabled',true);

            document.getElementById('md-body-password').style.display = 'none';
            document.getElementById('loader-password').style.display = 'block';
        }else if(this.state.type === 'delete'){
            document.getElementById('md-body-delete').style.display = 'none';
            document.getElementById('loader-delete').style.display = 'block';
        }else{
            document.getElementById('md-body-loader').style.display = 'none';
            document.getElementById('loader-loader').style.display = 'block';
        }
    }
    
    /**
     * Interpreta la respuestas de fachada y las maneja
     * 
     * @method handleResponse
     * @param {Object} resp 
     * @private
     */
    __handleResponse(resp){
        var idS, idF, tS,tF;
        console.log(this.state.type)
        if(this.state.type === 'save'){
            document.getElementById('loader').style.display = 'none';
            idS = 'success';
            idF = 'failure';
            tS = 'text-success';
            tF = 'text-failure';
        }

        if(this.state.type === 'load'){
            document.getElementById('loader-loader').style.display = 'none';
            idS = 'success-loader';
            idF = 'failure-loader';
            tS = 'text-success-loader';
            tF = 'text-failure-loader';
            $('#close-load-buttom').attr('disabled',false);

        }

        if(this.state.type === 'password'){
            document.getElementById('loader-password').style.display = 'none';
            idS = 'success-password';
            idF = 'failure-password';
            tS = 'text-success-password';
            tF = 'text-failure-password';
        }

        if(this.state.type === 'delete'){
            document.getElementById('loader-delete').style.display = 'none';
            idS = 'success-delete';
            idF = 'failure-delete';
            tS = 'text-success-delete';
            tF = 'text-failure-delete';

            $('#close-delete-buttom').attr('disabled',true);
            $('#delete-buttom').attr('disabled',true);
        }

        
        if(resp.state){
            document.getElementById(idS).style.display = 'block';
            document.getElementById(tS).innerText = '¡ '+ resp.msg + '!';
        }else{
            document.getElementById(idF).style.display = 'block';
            document.getElementById(tF).innerText = 'Vaya...., tenemos problemas. Intentalo más tarde';
        }


    }

    /**
     * Envía a la fachada un mensaje para guargar un sonido
     * 
     * @method saveInBD
     * @param {Object} data 
     * @returns {string} Respuesta del servidor
     * @private
     */
    async __saveInBD(data){
        const resp = await sinte.save(data);
        return resp;
    }
    /**
     * Inicia el proceso de guardado de un sonido y maneja la respuesta.
     * 
     * @method save
     */
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
            this.props.parentCallback2(); //update Table
            
        }else{
            document.getElementById('span-name').style.display= 'block';
        }
    }
    
}


export default Modal;