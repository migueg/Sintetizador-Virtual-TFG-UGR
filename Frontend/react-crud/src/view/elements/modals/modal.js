import  React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { sinte } from '../../osc-components';



import $ from 'jquery';
import '../../../css/loader.css'
class Modal extends React.Component{
    
      constructor(type){
        super();
        
        this.state = { 
            data: [],
            type: type,
            valoration: 3
        }
    }

    async componentDidMount(){
           const resp = await sinte.fetchThings('categories');
           this.setState({data: resp})
    }  
     
    setRating = (data)=> {
        console.log('AQUI')
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
        if(this.state.type === 'save'){
            $('#save-buttom').removeAttr("disabled");
            document.getElementById("modal").style.display = "none"
            document.getElementById('recipient-name').value = "";
            document.getElementById('recipient-description').value = ""
            document.getElementById('span-name').style.display= 'none';
        }else if(this.state.type === 'load'){
            console.log('AQUI')

            $('#load-buttom').removeAttr("disabled");
            document.getElementById("modalLoad").style.display = "none"
        }
        document.getElementById('md-body').style.display = 'block';
        document.getElementById('success').style.display = 'none';
        document.getElementById('failure').style.display = 'none';
        
        document.getElementById("backdrop").style.display = "none"
        
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
            this.props.parentCallback2(); //update Table
            
        }else{
            document.getElementById('span-name').style.display= 'block';
        }
    }
    
}


export default Modal;