import  React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

class Effect extends React.Component{
    synth
    #type
    constructor(props,type){
        super()
        this.synth = props.synth;
        this.#type = type;
    }
    checkEffect(){
        var check = 'interruptor'+this.#type
        if(document.getElementById(check).checked){
            this.synth.applyEffect(this.#type);
        }else{
            this.synth.disapplyEffect(this.#type);
        }
        
    }

    render(){
        return(
            <div className='toggle-switch'>
            <input
                type="checkbox"
                className="toggle-switch-checkbox"  
                id={'interruptor'+this.#type}
                onClick ={()=>this.checkEffect()}                      
            />
             </div>
        )
    }
}

export default Effect;