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
            document.getElementById('md-body').style.display = 'block';
            document.getElementById('success').style.display = 'none';
            document.getElementById('failure').style.display = 'none';
            document.getElementById('span-name').style.display= 'none';
        }else if(this.state.type === 'load'){
            $('#load-buttom').removeAttr("disabled");
            document.getElementById('md-body-loader').style.display = 'block';
            document.getElementById("modalLoad").style.display = "none"
            document.getElementById('success-loader').style.display = 'none';
            document.getElementById('failure-loader').style.display = 'none';
        }
       
        
        document.getElementById("backdrop").style.display = "none"
        
        //document.getElementById("save").classNameName += document.getElementById("save").classNameName.replace("show", "")
    }
    __showLoader(){
        if(this.state.type === 'save'){
            $('#save-buttom').attr('disabled',true);
            document.getElementById('md-body').style.display = 'none';
            document.getElementById('loader').style.display = 'block';
        }else{
            document.getElementById('md-body-loader').style.display = 'none';
            document.getElementById('loader-loader').style.display = 'block';
        }
    }
    
    __handleResponse(resp){
        var idS, idF, tS,tF;
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
        if(resp.state){
            document.getElementById(idS).style.display = 'block';
            document.getElementById(tS).innerText = '¡ '+ resp.msg + '!';
        }else{
            document.getElementById(idF).style.display = 'block';
            document.getElementById(tF).innerText = 'Vaya...., tenemos problemas. Intentalo más tarde';
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