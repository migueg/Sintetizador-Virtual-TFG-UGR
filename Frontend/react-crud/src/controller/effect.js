/**
 * La clase Effecto encapsula el comportamiento general que todos los 
 * efectos van a necesitar para su aplicación sobre el sintetizador
 * 
 * @class Distorsion
 * @constructor
 * @param {Object} context AudioContext
 * @param {Object} input Nodo de entrada sobre el que se aplica el efecto
 * @param {Object} output Node de salida con el efecto aplicado
 * @see Effect
 */

/**
 * Contiene el nodo correspondiente al efecto
 * 
 * @property effect
 * @type Object
 * @protected 
 */

/**
 * Contiene el nodo de ganancia sobre el que se aplica el efecto
 * 
 * @property input
 * @type Object
 * @protected 
 */

/**
 * Contiene el nodo de ganancia de salida con el efecto aplicao
 * 
 * @property output
 * @type Object
 * @protected 
 */

/**
 * Contiene el nodo para controlar el volumen del nodo del efecto
 * 
 * @property wet
 * @type Object
 * @protected 
 */

/**
 * Booleano para controlar si esta encendido o apagado el efecto
 * 
 * @property on
 * @type Boolean
 * @private
 */

/**
 * Almacena el estado del efecto
 * 
 * @property state
 * @type JSON
 * @protected
 */
class Effect {
    #on
    constructor(context,input,output){
        this.audioctx = context
        this.effect = null;
        this.input = input
        this.output = output;
        this.wet = this.audioctx.createGain();
        this.wet.gain.value = 0.8;
        this.#on = false;
        this.state = {};
        
    }

    /**
     * Método que desaplica el efecto 
     * 
     * @method disapply
     */
    disapply(){
        this.#on = false;
        this.wet.disconnect(this.output)
    }
    
     /**
     * Metodo que se encarga de conectar el input con el efecto y 
     * el wet con el output
     * 
     * @method apply
     */
    apply(){
        this.#on = true;
        this.input.connect(this.effect)
        this.wet.connect(this.output);
        
    }

    /**
     * Devuelve el estado en la variable state
     * 
     * @method getState
     */
    getState(){
        this.state['on'] = this.#on;
        this.state['wet'] = this.wet.gain.value;
    }

    /**
     * Setter de la cantidad de efecto aplicada
     * 
     * @method setWet
     * @param {Float} val Nivel de volumen que se quiere aplicar
     */
     setWet(val){
        
        this.wet.gain.value = val/100;
    }

    

}

export default Effect;