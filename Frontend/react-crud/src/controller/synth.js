import {oscillator} from './oscillator';
import {Reverb} from './reverb';
import {Delay} from './delay';
import {Filter} from './filter';
import {Distorsion} from './distorsion';
import Saver from './saver';
import Loader from './loader';

/**
 * Clase Fachada del controlador que se comunica con los elementos de la vista.
 *
 * @class Synth
 * @constructor
 */

/**
 * Instancia del osciladorA
 * 
 * @property #osciladorA 
 * @type oscillator
 * @private
 */

/**
 * Instancia del osciladorB
 * 
 * @property #osciladorB
 * @type oscillator
 * @private
 */

/**
 *  Contexto de audio para la aplicación de la Web Audio API
 * 
 * @property audioCtx
 * @type Object
 * @private
 */

/**
 *  Nodo de ganancia para controlar el volumen general de la aplicación
 * 
 * @property masterVolumeNode
 * @type Object
 * @private
 */

/**
 *  Nodo de ganancia que representa a los osciladores sin aplicarle ningún efecto
 * 
 * @property gainCleanNode
 * @type Object
 * @private
 */


/**
 *  Efecto de reverb
 * 
 * @property reverb
 * @type Reverb
 * @private
 */

/**
 *  Efecto de Delay
 * 
 * @property delay
 * @type Delay
 * @private
 */

/**
 *  Efecto de Filtro
 * 
 * @property filter
 * @type Filter
 * @private
 */

/**
 *  Efecto de distorsion
 * 
 * @property distorsion
 * @type Distorsion
 * @private
 */

/**
 *  Objeto que se va a encargar de enviar peticiones 
 *  a BD para almacenar objetos
 * 
 * @property saver
 * @type Saver
 * @private
 */

/**
 *  Objeto que se va a encargar de enviar peticiones 
 *  GET a BD para obtener objetos
 * 
 * @property loader
 * @type Loader
 * @private
 */


class Synth{
    #oscillatorA;
    #oscillatorB;
    #audioCtx;
    #masterVolumeNode;
    #gainCleanNode;
    #reverb;
    #delay;
    #filter;
    #distorsion;
    #saver;
    #loader;
    
    constructor(){
        //Nodos
        var AudioContext = window.AudioContext // Default
        || window.webkitAudioContext;
        this.#audioCtx = new AudioContext();
        this.#masterVolumeNode = this.#audioCtx.createGain();
        this.#gainCleanNode = this.#audioCtx.createGain();

        //Osciladores
        this.#oscillatorA = new oscillator(this.#masterVolumeNode,this.#audioCtx,this.#gainCleanNode);
        this.#oscillatorB = new oscillator(this.#masterVolumeNode,this.#audioCtx,this.#gainCleanNode);
        
        //Cargador y salvador
        this.#saver = new Saver(this.#oscillatorA,this.#oscillatorB,this);
        this.#loader = new Loader();

        //Efectos
        this.#reverb = new Reverb(this.#audioCtx,this.#gainCleanNode,this.#masterVolumeNode);
        this.#delay = new Delay(this.#audioCtx,this.#gainCleanNode,this.#masterVolumeNode);
        this.#filter = new Filter(this.#audioCtx,this.#gainCleanNode,this.#masterVolumeNode,"highpass");
        this.#distorsion = new Distorsion(this.#audioCtx,this.#gainCleanNode,this.#masterVolumeNode);

        this.#masterVolumeNode.connect(this.#audioCtx.destination)
       
        
       
    }

    /**
     * Método que se encarga de activar un efecto
     * 
     * @method applyEffect
     * @param {String} effect Efecto que se va a aplicar
     */

    applyEffect(effect){
        switch(effect){
            case 'reverb':
                this.#reverb.apply();
                break;
            case 'delay':
                this.#delay.apply();
                
                break;
            case 'filter':
                this.#filter.apply();
                break;
            case 'distorsion':
                this.#distorsion.apply();
                break;

            default:
                break;
        }
    }

    /**
     * Método que se encarga de desactivar un efecto
     * 
     * @method disapplyEffect
     * @param {String} effect Efecto que se va a desactivar
     */

     disapplyEffect(effect){
        switch(effect){
            case 'reverb':
                this.#reverb.disapply();
                break;
            case 'delay':
                this.#delay.disapply();
                break;
            
            case 'filter':
                this.#filter.disapply();
                break;
            case 'distorsion':
                this.#distorsion.disapply();
                
            default:
                break;
        }
    }

    /**
     * Método que se encarga de comunicar al cargargador que se 
     * requiere obtener información de la BD
     * 
     * @method fetchThings
     * @async
     * @param {String} thing Información que se quiere obtener
     * @return JSON 
     */
    async fetchThings(thing){
        var data;

        switch(thing){
            case 'categories':
                data =  await this.#loader.fetchCategories();
                console.log('SYTH: ' +data)
                return data;
            default:
                console.error('Tipo incompatible');
                break;
        }
    }
    /**
     * Método que se encarga de encender un oscilador
     * 
     * @method onOscillator
     * @param {Char} osc Id del oscildor
     */
    
    onOscillator(osc){
        if(osc === 'A'){
            this.#oscillatorA.onOscillator()
        }

        if(osc === 'B'){
            this.#oscillatorB.onOscillator();
        }

    }
   

    /**
     * Método que se encarga de apagar un oscilador
     * 
     * @method offOscillator
     * @param {Char} osc Id del oscildor
     */
    offOscillator(osc){
        if(osc === 'A'){
            this.#oscillatorA.offOscillator()
        }

        if(osc === 'B'){
            this.#oscillatorB.offOscillator();
        }

    }
   
    /**
     * Método que se encarga de tocar una nota de los osciladores
     * 
     * @method playNote
     * @param {Char} key Nota
     */
    playNote(key){
        this.#oscillatorA.play(key)
        this.#oscillatorB.play(key)
    
    }

   
    /**
     * Método que se encarga de seleccionar el tipo de onda de los osciladores
     * 
     * @method selectWave
     * @param {Char} osc Id del oscilador
     * @param {String} wave Forma de la onda
     */
    selectWave(osc, wave){

        switch(osc){
            case 'A':
                this.#oscillatorA.setWave(wave);
                break;
            case 'B':
                this.#oscillatorB.setWave(wave);
                break;
            default:
                break;
        }
    }


    /**
     * Método que se encarga de llamar al saver para que mande el estado actual
     * del sintetizador a la base de datos para su almacenamiento
     *  
     * @method save
     */
    save(){
        this.#saver.save();
    }

    /******* GETTERS *********/

    /**
     * Método que devuelve el estado de todos los efectos
     * 
     * @method getEffects
     * @returns JSON
     */
    getEffects(){
        var effects={};

        effects['delay'] = this.#delay.getState();
        effects ['distorsion'] = this.#distorsion.getState();
        effects ['filter'] = this.#filter.getState();
        effects ['reverb'] = this.#reverb.getState();
        
        return effects;
    }
    /**
     * Getter del volumen de los osciladores
     * 
     * @method getVolum
     * @param {Char} osc Id del oscilador
     * @return Volumen
     */
    getVolum(osc){
        if(osc === 'A'){
            return this.#oscillatorA.getVolum();
        }

        if(osc === 'B'){
            return this.#oscillatorB.getVolum();
        }

    }

    /******* SETTERS *********/

    /**
     * Setter de los parámetros del delay
     * 
     * @method setDelay
     * @param {Char} param Parámetro a modificar
     * @param {String} val Valor a cambiar
     */
    setDelay(param,val){
        switch(param){
            case 'time':
                this.#delay.setTime(val);
                break;
            case 'feedback':
                this.#delay.setFeedback(val);
                break;
            case 'wet':
                this.#delay.setWet(val);
                break;
            default:
                console.error('ERROR: valor incorrecto');
                break;
        }
    }
    
    /**
     * Setter de los parámetros del delay
     * 
     * @method setDistorsion
     * @param {Char} param Parámetro a modificar
     * @param {String} val Valor a cambiar
     */
    setDistorsion(param,val){
        switch(param){
            case 'amount':
                this.#distorsion.setDistorsionCurve(val);
                break;
            case 'wet':
                this.#distorsion.setWet(val);
                break;
            default:
                console.error("ERROR: parametro incompatible");
                break;
        }
    }
    /**
     * Setter de los parámetros de la envolvente de los osciladores
     * 
     * @method setEnvolve
     * @param {Char} osc Id del oscilador
     * @param {Float} val Valor a cambiar
     * @param {String} param Parámetro de la envolvente a cambiar
     */
    setEnvolve(osc,val,param){
        if(osc === 'A'){
            switch(param){
                case 'attack':
                    this.#oscillatorA.setAttack(val);
                    break;
                case 'release':
                    this.#oscillatorA.setRelease(val);
                    break;
                case 'decay':
                    this.#oscillatorA.setDecay(val);
                    break;
                case 'sustain':
                    this.#oscillatorA.setSustain(val);
                    break;

                default:
                    break;

            }
        }

        if(osc === 'B'){
            switch(param){
                case 'attack':
                    this.#oscillatorB.setAttack(val);
                    break;
                case 'release':
                    this.#oscillatorB.setRelease(val);
                    break;
                case 'decay':
                    this.#oscillatorB.setDecay(val);
                    break;
                case 'sustain':
                    this.#oscillatorB.setSustain(val);
                    break;
                    
                default:
                    break;

            }
        }
        
    }

    /**
     * Setter del volume general de la aplicación
     * 
     * @method setFilter
     * @param {String} param Parametro a modificar
     * @param {String} val  Valor del parametro a modificar
     */
     setFilter(param,val){
        switch(param){
            case 'wet':
                this.#filter.setWet(val);
                break;
            case 'freq':
                this.#filter.setFrecuency(val);
                break;
            case 'type':
                this.#filter.setType(val);
                break;
            default:
                console.error("Error: valor incorrecto ")
        }
    }

    /**
     * Setter del volume general de la aplicación
     * 
     * @method setMaster
     * @param {Float} val Valor de volumen en db
     */
    setMaster(val){
        this.#masterVolumeNode.gain.value = val;
    }

    /**
     * Setter del nivle de paneo de los osciladores
     * 
     * @method setPan
     * @param {Char} osc id del oscilador
     * @param {Float} value valor de paneo
     */
    setPan(osc,value){
        if(osc === 'A'){
            this.#oscillatorA.setPan(value);
        }else if(osc === 'B'){
            this.#oscillatorA.setPan(value);
        }
    }

    /**
     * Modificador del efecto reverb
     * 
     * @method setReverbWet
     * @param {Float} val Nivel de Reverb que se quiere aplicar
     */
    setReverb(val,param){
        switch(param){
            case "wet":
                this.#reverb.setWet(val);
                break;
            case "decay":
                this.#reverb.setDecay(val);
                break;
            case "hpf":
                this.#reverb.setHPF(val);
                break;
            case "lpf":
                this.#reverb.setLPF(val);
                break;
            default:
                break;
        }
        
    }

    /**
     * Setter del volumen de los osciladores
     * 
     * @method setVolum
     * @param {Char} osc Id del oscilador
     */
     setVolum(osc, vol){
        switch(osc){
            case 'A':
              
                this.#oscillatorA.setVolum(vol);
            break;
            
            case 'B':
                this.#oscillatorB.setVolum(vol);
                break;
            default:
                break;
        }
    }


}

/**
 * Proporciona una clase fachada para el controlador
 * 
 * @module synth
 */

export {
    Synth as synth
};