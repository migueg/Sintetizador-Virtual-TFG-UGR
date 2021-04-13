import {oscillator} from './oscillator';
import {Reverb} from './reverb';
import {Delay} from './delay';

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
 * @type Object
 * @private
 */

/**
 * Instancia del osciladorB
 * 
 * @property #osciladorB
 * @type Object
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
 *  Efecto de reverb
 * 
 * @property reverb
 * @type Object
 * @private
 */

/**
 *  Efecto de Delay
 * 
 * @property delay
 * @type Object
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
    
    constructor(){
        this.#audioCtx = new window.AudioContext();
        this.#masterVolumeNode = this.#audioCtx.createGain();
        this.#gainCleanNode = this.#audioCtx.createGain();

        this.#oscillatorA = new oscillator(this.#masterVolumeNode,this.#audioCtx,this.#gainCleanNode);
        this.#oscillatorB = new oscillator(this.#masterVolumeNode,this.#audioCtx,this.#gainCleanNode);
        
        
        this.#reverb = new Reverb(this.#audioCtx,this.#gainCleanNode,this.#masterVolumeNode);
        this.#delay = new Delay(this.#audioCtx,this.#gainCleanNode,this.#masterVolumeNode);



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
            default:
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
     * @method setMaster
     * @param {Float} val Valor de volumen en db
     */
    setMaster(val){
        this.#masterVolumeNode.gain.value = val;
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
}

/**
 * Proporciona una clase fachada para el controlador
 * 
 * @module synth
 */

export {
    Synth as synth
};