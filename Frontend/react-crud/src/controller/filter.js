import Effect from './effect'

const types = {
    LP: "lowpass",
    HP: "highpass",
    LS: "lowshelf",
    BP: "bandPass",
    HS: "highshelf",
    PI: "peaking",
    NT: "notch",
    AP: "allpass"

}

/**
 * La clase Filter encapsula el comportamiento neceseraio para que
 * se pueda aplicar un efecto de filtro sobre el sintetizador
 *
 * @class Filter
 * @constructor
 * @param {BaseAudioContext} context AudioContext
 * @param {AudioNode} input Nodo de entrada sobre el que se aplica el efecto
 * @param {AudioNode} output Node de salida con el efecto aplicado
 * @param {String} type Tipo de filtro
 * @see Effect
 */

/**
 * Tipo de filtro
 * 
 * @property type
 * @type String
 * @private
 */
class Filter extends Effect{
    #type
    constructor(context,input,output,type){
        super(context,input,output);
        this.#type = type;
        this.effect = this.audioctx.createBiquadFilter();
        

        this.init(type);
        
    }

    /**
     * Metodo que se encarga de aplicar el efecto de filtro sobre el input
     * @method apply
     * 
     */
    apply(){
        super.apply();
        this.effect.connect(this.wet);
    }

    /**
     * Método que se encarga de inicializar el filtro
     * 
     * @method init
     * @param {String} type  de filtro
     */
    init(type){
        this.#type = type;
        this.effect.type= type;
        this.setinitFrecuencies();
    }
    
    /**
     * Metodo que es usado en el reverb para conectar los filtros
     * a este otro efecto
     * 
     * @method connect
     * @param {Object} input Entrada
     * @param {Object} output Salida
     */
    connect(input,output){
        input.connect(this.effect);
        this.effect.connect(output);
    }

    
    /**
     * Método que inicializa las frecuencias en función del 
     * tipo de filtro
     * 
     * @method setinitFrecuencies
     */
    setinitFrecuencies(){
        switch(this.#type){
            case types.LP:
                this.effect.frequency.value = 22050;
                break;
            case types.HP:
                this.effect.frequency.value = 0;
              
                break;
            case types.HS:
                this.effect.frequency.value = 22050;
                break;
            case types.LS:
                this.effect.frequency.value = 0;
                break;
            case types.BP:
                this.effect.frequency.value = 0;
                break;
            case types.PI:
                this.effect.frequency.value = 0;
                break;
            case types.NT:
                this.effect.frequency.value = 0;
                break;
            default:
                console.log("Tipo de filtro incompatible")
                break;
        }
    }

    /************ GETTERS **************/

    /**
     * Devuelve la frecuencia de inicia de actuación del filtr
     * 
     * @method getFrecuency
     * @returns Float
     */
    getFrecuency(){
        return  this.effect.frequency.value;
    }
    
    /**
     * Getter del estado del efecto
     * 
     * @method getState
     * @returns JSON
     */
    getState(){
        super.getState();
        this.state['type'] = this.effect.type;
        this.state['frequency'] = this.effect.frequency.value;

        return this.state;
    }
    
    /************ SETTERS **************/

    
    /**
     * Setter de la frecuencia del filtro
     * 
     * @method setFrecuency
     * @param {Float} val 
     */
     setFrecuency(val){
        this.effect.frequency.value = val;
    }


    /**
     * Setter del tipo de filtro
     * 
     * @method setType
     * @param {String} type tipo de filtro
     */
    setType(type){
        this.effect.type= type;
        this.setinitFrecuencies();
    }
    
    
}

/**
 * Proporciona el efecto Filtro
 * 
 * @module Filter
 */
export { Filter};