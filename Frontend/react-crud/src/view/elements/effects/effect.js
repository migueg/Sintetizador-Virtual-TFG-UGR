import  React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

/**
 * Clase padre para los componentes relacionados con efectos 
 *
 * @class Effect
 * @constructor
 * @param {Object} props Objeto que contiene las propiedades del componente
 * @param {String} type Tipo de efecto
 * @see Effect
 */

/**
 * Instancia de la clase fachada del controlador
 * 
 * @property synth 
 * @type Synth
 * @protected
 */

/**
 * Tipo de efecto
 * 
 * @property type
 * @type String
 * @private
 */
class Effect extends React.Component{
    synth
    #type
    constructor(props,type){
        super()
        this.synth = props.synth;
        this.#type = type;
    }
    /**
     * Método que se encarga de mandar la orden al controlador
     * para aplicar o desaplicar el efecto
     * 
     * @method checkEffect
     * 
     */
    checkEffect(){
        var check = 'interruptor'+this.#type
        if(document.getElementById(check).checked){
            this.synth.applyEffect(this.#type);
        }else{
            this.synth.disapplyEffect(this.#type);
        }
        
    }
    /**
     * Método que se encarga de mandar la orden de aplicar o 
     * desaplicar el efecto cuando se carga un sonido desde BD
     * 
     * @method apply
     * @param {Boolean} b 
     */
    apply(b){
        var check = 'interruptor'+this.#type
        var now =   document.getElementById(check).checked 
        document.getElementById(check).checked = b;

        if(b){
            this.synth.applyEffect(this.#type);

        }else{
            if(now){
                this.synth.disapplyEffect(this.#type);

            }
        }
    }

    /**
     * Método que devuelve un interruptor para aplicar o 
     * desaplicar un efecto
     * 
     * @method render
     * @return Código html del interruptor
     * 
     */
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