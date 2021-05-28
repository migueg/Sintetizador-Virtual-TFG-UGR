import {oscillator} from './oscillator';
import {Reverb} from './reverb';
import {Delay} from './delay';
import {Filter} from './filter';
import {Distorsion} from './distorsion';
import Saver from './saver';
import Loader from './loader';
import Midi from './midi';
import Recorder from './recorder';
import Analyser from './analyser';
import Equalizer from './equalizer';

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

/**
 *  Objeto que se va a encargar de gestionar los eventos MIDI
 * 
 * @property midi
 * @type Midi
 * @private
 */

/**
 *  Objeto que se va a encargar de gestionar la grabación de sonidos
 * 
 * @property recorer
 * @type Recorder
 * @private
 */

/**
 *  Objeto que se va a encargar de analizar el espectro de frecuencias 
 *  producido
 * 
 * @property analyser
 * @type Analyser
 * @private
 */

/**
 *  Objeto que se encarga de controlar el ecualizador
 * 
 * @property eq
 * @type Equalizer
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
    #midi;
    #recorder;
    #analyser;
    #eq;
    #eqGain;


    
    constructor(){
        //Nodos
        var AudioContext = window.AudioContext // Default
        || window.webkitAudioContext;
        this.#audioCtx = new AudioContext();
        this.#masterVolumeNode = this.#audioCtx.createGain();
        this.#gainCleanNode = this.#audioCtx.createGain();
        this.#eqGain = this.#audioCtx.createGain();

        //Osciladores
        this.#oscillatorA = new oscillator(this.#masterVolumeNode,this.#audioCtx,this.#gainCleanNode);
        this.#oscillatorB = new oscillator(this.#masterVolumeNode,this.#audioCtx,this.#gainCleanNode);
        
        //Cargador y salvador
        this.#saver = new Saver(this.#oscillatorA,this.#oscillatorB,this);
        this.#loader = new Loader();

        //Interprete MIDI.
        this.#midi = new Midi(this);
        //Efectos
        this.#reverb = new Reverb(this.#audioCtx,this.#gainCleanNode,this.#masterVolumeNode);
        this.#delay = new Delay(this.#audioCtx,this.#gainCleanNode,this.#masterVolumeNode);
        this.#filter = new Filter(this.#audioCtx,this.#gainCleanNode,this.#masterVolumeNode,"highpass");
        this.#distorsion = new Distorsion(this.#audioCtx,this.#gainCleanNode,this.#masterVolumeNode);

        
         //Recorder
         this.#recorder = new Recorder(this.#masterVolumeNode,this.#audioCtx)

         //Equalizador
          this.#eq = new Equalizer(this.#masterVolumeNode,this.#audioCtx,this.#eqGain)

         //Analizador
         this.#analyser = new Analyser(this.#eqGain,this.#audioCtx)
        
        
        
        //this.#masterVolumeNode.connect(this.#audioCtx.destination)
       

       
        
        
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
     * Método que se encarga de enviar al ecualizador que banda
     * hay que atenuar o incrementar
     * 
     * @method equalize
     * @param {String} freq Banda del ecualizador
     * @param {Float} value Decremento o incremento en db
     */
    equalize(freq,value){
        this.#eq.equalize(freq,value)
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
                return data;
            case 'metadata':
                data = await this.#loader.fetchStatesMetadata();
                return data;
            default:
                console.error('Tipo incompatible');
                break;
        }
    }

    /**
     * Método que se encarga de redirigir  las peticiones del cliente
     * en el perfil
     * 
     * @method fetchProfile
     * @param {String} action Acción que el usuario desea realizar
     * @param {JSON} data Datos a mandar al servidor
     * @returns Respuesta del servidor
     */
    async fetchProfile(action,data){
        switch(action){
            case 'edit':
                return await this.#saver.editProfile(data);
            case 'profile':
                return await this.#loader.fetchProfile();
            case 'maxSize':
                return await this.#loader.fetchMaxSize();
            default:
                console.error('ERROR: Acción incorrecta');
                break;
        }
    }
    
    /**
     * Método que se encarga de llamar al módulo de carga para que
     * cargue un sonido
     *  
     * @method load
     * @async
     * @param {string} id Identificador del sonido
     */
    async load(id){
        const resp = await this.#loader.fetchState(id);
        return resp;
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
        //this.#analyser.consoledomain();
    
    }

    rec(state){
        this.#recorder.rec(state)
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
     * @async
     * @param {JSON} data Metadatos del sonido
     */
    async save(data){
        const resp = await this.#saver.save(data)
        return resp;
    }

    /******* GETTERS *********/

    /**
     * Getter de la disponibilidad de los osciladores
     * 
     * @method getAvailable
     * @param {Char} osc Id del oscilador
     * @returns Boolean
     */
       getAvailable(osc){
        if(osc === 'A'){
            return this.#oscillatorA.getAvailable();
        }

        if(osc === 'B'){
            return this.#oscillatorB.getAvailable();
        }
    }

    /**
     * Getter del flag de selección del oscilador
     * 
     * @method getChecked
     * @param {Char} osc Id del oscilador
     * @returns Booleano
     */
    getChecked(osc){
        if(osc === 'A'){return this.#oscillatorA.getChecked()}
        if(osc === 'B'){return this.#oscillatorB.getChecked()}
    }

    
    /**
     * Método que devuelve el estado de todos los efectos
     * 
     * @method getEffects
     * @returns JSON
     */
    getEffects(){
        var effects={};

        effects['delay'] = this.#delay.getState();
        effects['distorsion'] = this.#distorsion.getState();
        effects['filter'] = this.#filter.getState();
        effects['reverb'] = this.#reverb.getState();
        
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
  
    /**
     * Getter de distintos parámetros del Analizador
     * 
     * @method getThingsAnalyser
     * @param {String} thing Parámetro que se quiere
     * @returns Parámetro
     */
     getThingsAnalyser(thing){
        switch(thing){
            case 'size':
                return this.#analyser.getSize();
            case 'data':
                return this.#analyser.getData();
            case 'separation':
                return this.#analyser.getSeparation();
        }
    }

    /******* SETTERS *********/
    /**
     * Setter del flag checked que indica si el oscilador
     * esta seleccionado 
     * 
     * @method setChecked
     * @param {Char} osc Id del oscilador
     * @param {Boolean} val 
     */
    setChecked(osc,val){
        if(osc === 'A'){this.#oscillatorA.setChecked(val)}
        if(osc === 'B'){this.#oscillatorB.setChecked(val)}
    }
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
                break;
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
            this.#oscillatorB.setPan(value);
        }
    }
    /**
     * Setter de la octava del midi
     * 
     * @method setOctave
     * @param {Integer} oct Octava
     */
    setOctave(oct){
        this.#midi.setOctave(oct)
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
     * Setter del jwt de autenticacion y del id del usario
     * 
     * @method setCookies
     * @param {String} token Token
     * @param {String} user Id del usuario
     */
    setCookies(token,user){
        this.#saver.setToken(token);
        this.#saver.setUser(user);
        this.#loader.setToken(token);
        this.#loader.setUser(user);

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