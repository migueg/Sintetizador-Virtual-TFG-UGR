import Effect from './effect'
import {Filter} from './filter';

/**
 * La clase Reverb encapsula el comportamiento neceseraio para que
 * se pueda aplicar un efecto de reverb sobre el sintetizador
 *
 * @class Distorsion
 * @constructor
 * @param {Object} context AudioContext
 * @param {Object} input Nodo de entrada sobre el que se aplica el efecto
 * @param {Object} output Node de salida con el efecto aplicado
 * @see Effect
 */

/**
 * Tiempo que tarda en desaparecer el reverb progresivamente
 * 
 * @property decay
 * @type Float
 * @private
 */

/**
 * Nodo de ganancia auxiliar
 * 
 * @property gainAux
 * @type Object
 * @private
 */

/**
 * Nodo de ganancia para el filtro
 * 
 * @property gainFilter
 * @type Object
 * @private
 */

/**
 * Filtro pasa bajos del reverb
 * 
 * @property lpf
 * @type Filter
 * @private
 */

/**
 * Filtro pasa altos del reverb
 * @property hpf
 * @type Filter
 * @private
 */
class Reverb extends Effect{
    #decay
    #gainAux
    #gainFilter
    #lpf 
    #hpf
   
    constructor(context,input,output){
        super(context,input,output);
        this.effect = this.audioctx.createConvolver();
        this.#gainAux = this.audioctx.createGain();
        this.#gainFilter = this.audioctx.createGain();

        this.#decay = 5;
        this.#lpf = new Filter(context,this.effect,null,"lowpass");
        this.#hpf = new Filter(context, this.effect,null,"highpass");
        
    }

    /**
     * Actualiza el impulso
     * 
     * @method updateImpulse
     * @param {Float} val Tiempo de caida
     * @private
     */
    __updateImpulse(val){
        var duration = 10 - val; // Ya que la duracion es inversa al decay

        this.effect.buffer = this.impulseResponse(duration,this.#decay,0);
    }

    /**
     * Método que se encarga de generar un impulso necesario para
     * generar un efecto de reverb
     * 
     * @param {Float} duration Duracion del impulso
     * @param {Float} decay Tiempo que tarda en caer la amplitud del impulso
     * @param {Float} reverse 
     * @returns {Object} Impulso
     */
    impulseResponse(duration, decay, reverse){
        var sampleRate = this.audioctx.sampleRate
        var length = sampleRate * duration
        var impulse = this.audioctx.createBuffer(2,length,sampleRate)
        var impulseL = impulse.getChannelData(0);
        var impulseR = impulse.getChannelData(1);
    
        if (!decay)
            decay = 2.0;
        for (var i = 0; i < length; i++){
          var n = reverse ? length - i : i;
          impulseL[i] = (Math.random() * 2 - 1) * Math.pow(1 - n / length, decay);
          impulseR[i] = (Math.random() * 2 - 1) * Math.pow(1 - n / length, decay);
        }
       
        return impulse;
    
    }

  
     /**
     * Metodo que se encarga de aplicar el efecto de reverb sobre el input
     * @method apply
     */
    apply(){
       
        this.effect.buffer = this.impulseResponse(5,5,0);
        this.effect.connect(this.#gainAux);
        super.apply();
        this.#lpf.connect(this.#gainAux,this.#gainFilter);
        this.#hpf.connect(this.#gainFilter,this.wet);
        
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
        this.state['hp'] = this.#hpf.getFrecuency();
        this.state['lp'] = this.#lpf.getFrecuency();
        this.state['decay'] = this.#decay

        return this.state;

    }

    /************ SETTERS **************/

    /**
     * Setter de la frecuencia del filtro pasa altos
     * 
     * @method setHPF
     * @param {Float} val Frecuencia de corte
     */
    setHPF(val){
        this.#hpf.setFrecuency(val);
    }
     /**
     * Setter de la frecuencia del filtro pasa bajos
     * 
     * @method setLPF
     * @param {Float} val Frecuencia de corte
     */
    setLPF(val){
        this.#lpf.setFrecuency(val);
       
    }
    
    /**
     * Setter del tiempo de caida
     * 
     * @method setDecay
     * @param {Float} val Tiempo de caida
     */
    setDecay(val){
        this.#decay = val  ;
        this.__updateImpulse(val);
    }
    

    
    
}

/**
 * Proporciona el efecto reverb
 * @module Reverb
 */
export  {Reverb};