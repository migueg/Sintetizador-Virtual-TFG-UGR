import { FormText } from "react-bootstrap";

/**
 * La clase Anlyser se encarga de analizar la señal de audio y generar
 * los datos que será utilizados para pintar los graficos
 *
 * @class Analyser
 * @constructor
 * 
 * @param {BaseContext} context AudioContext
 * @param {AudioNode} master Nodo master de ganancia
 * 
 */


/**
 * Nodo analizador
 * @property analyser
 * @type AnalyserNode
 * @private
 */

/**
 * Buffer de datos
 * @property domain
 * @type Uint8Array
 * @private
 */

/**
 * Sample rate
 * @property sampleRate
 * @type Integer
 * @private
 */

/**
 * Tamaño del buffer
 * @property size
 * @type Integer
 * @private
 */

class Analyser{
    #analyser
    #domain
    #sampleRate;
    #size;
    constructor(master,context){
        this.#analyser = context.createAnalyser();
        this.#analyser.fftSize = 512;
        this.#sampleRate = context.sampleRate
        this.#size = this.#analyser.frequencyBinCount;
        this.#domain = new Uint8Array(this.#size);

        master.connect(this.#analyser)
        //this.#analyser.connect(context.destination)
        //this.createCanva()

    }

    /**
     * Se encarga de analizar el flujo de audio
     * 
     * @method analyse
     */

    analyse(){
       this.#analyser.getByteFrequencyData(this.#domain) //Guarda en domain decibeles de frecuencias
      
    }

    /**
     * Getter del tamaño del buffer
     * 
     * @method getSize
     * @returns {Integer} tamaño
     */
    getSize(){
        return this.#size;
    }

    /**
     * Getter del número de frecuencias contenidas en cada posición del buffer
     * 
     * @method getSeparation
     * @returns {Float} Número de frecuencias 
     */
    getSeparation(){
        return this.#sampleRate / this.#analyser.fftSize
    }

    consoledomain(){
        console.log(this.#analyser.frequencyBinCount)  
    }

     /**
     * Getter del buffer con los datos
     * 
     * @method getSeparation
     * @returns {Uint8Array} Buffer
     */
    getData(){
        this.#analyser.getByteFrequencyData(this.#domain) 
       //console.log(this.#domain)
        return this.#domain;
    }

}

export default Analyser;