import Effect from './effect';

/**
 * La clase delay encapsula el comportamiento neceseraio para que
 * se pueda aplicar un efecto de delay sobre el sintetizador
 *
 * @class Delay
 * @constructor
 * @param {Object} context AudioContext
 * @param {Object} input Nodo de entrada sobre el que se aplica el efecto
 * @param {Object} output Node de salida con el efecto aplicado
 * @see Effect
 */

/**
 * Duracion del efecto delay
 * @property feedback
 * @type Object
 * @private
 */
class Delay extends Effect{
    #feedback;
  
    constructor(context,input,output){
        super(context,input,output);
        this.effect = this.audioctx.createDelay();
        
        this.#feedback = this.audioctx.createGain();
       
        this.effect.delayTime.value = 0.15;
        this.#feedback.gain.value = 0.25;
        this.wet.gain.value = 0.8;
     }

    /**
     * Metodo que se encarga de aplicar el efecto delay sobre el input
     * @method apply
     */
    apply(){
        super.apply()
        this.effect.connect(this.wet);
        this.effect.connect(this.#feedback);
        this.#feedback.connect(this.effect);
        
    }


    /************ GETTERS **************/
    
    /**
     * Getter del estado del efecto
     * 
     * @method getState
     * @returns JSON
     */
    getState(){
        super.getState();
        this.state['time'] =  this.effect.delayTime.value;
        this.state['feedback'] = this.#feedback.gain.value;

        return this.state;
    }

    /************ SETTERS **************/
    /**
     * Setter del tiempo del delay
     * @method setTime
     * @param {String} tempo Fracción de tiempo de delay
     */
    setTime(tempo){
        var val= 0.0;
        switch(tempo){
            case '1/16':
                val = 0.15;
                break;
            case '1/8':
                val = 0.3;
                break;
            case '1/4':
                val= 0.5;
                break;
            case '1/2':
                val= 0.65;
                break;
            case '1':
                val = 0.8;
                break;
            case '2':
                val = 1;
                break;
            default:
                console.error("ERROR: Valor incorrecto de tiempo");
                break;
        }
        
        this.effect.delayTime.value = val;
    }

    /**
     * Setter del feedback del efecto delay
     * @method setFeedback
     * @param {Float} val Nivel de feedback
     */
    setFeedback(val){
        var value = val /100
        this.#feedback.gain.value = value;
    }


}

/**
 * Proporciona el efecto delay
 * 
 * @module Delay
 */
export{ Delay}