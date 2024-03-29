
import Voice from './voice';

/**
 * Clase que representa un oscilador analógico
 * 
 * @class oscillator
 * @constructor
 */

/**
 * Contexto de audio para la aplicación de la Web Audio API
 * @property audioCtx
 * @type BaseAudioContext
 * @private
 */

/**
 * Nodo de ganancia del oscilador para controlar el volumen de este
 * @property gainNode
 * @type AudioNode
 * @private
 */

/**
 * Guarda los valores de la envolvente
 * @property envelope
 * @type Object
 * @private
 */

/**
 * Volumen del oscilador
 * @property volume
 * @type Float
 * @private
 */

/**
 * Flag que representa la disponibilidad del oscilador
 * @property available
 * @type Boolean
 * @private
 */

/**
 * Contiene una instancia de la clase Voice para lograr la polifonia
 * @property voice
 * @type AudioNode
 */

/**
 * Nodo que se encarga del paneo del oscilador
 * @property #panNode
 * @type AudioNode
 */
/**
 * Glag para controlar que el oscilador esa marcado
 * @property checked
 * @type Boolean
 */
class oscillator  {
   #audioCtx 
   #gainNode //Variable privada
   #envelope // envolvente del sonido
   #volume
   #available
   #panNode
   #checked
 

 constructor(master,context,cleanNode){
   //this.#audioCtx = new window.AudioContext ()
   this.#audioCtx = context
   this.#envelope = {
      attack : 0,
      decay: 0.6,
      sustain: 0.5,
      release: 2.5
   }

   this.#gainNode = this.#audioCtx.createGain();
   
   this.#volume = 0;
   this.#available = false;
   this.#checked = false;
   this.#gainNode.gain.value = 0;

  
   this.#gainNode.connect(cleanNode);
   //this.#gainNode.connect(this.#audioCtx.destination);
   
   this.#panNode = this.#audioCtx.createStereoPanner();
   this.#panNode.pan.value = 0;
   this.#gainNode.connect(this.#panNode);
   this.#panNode.connect(master);

   this.voice = new Voice('sine',this.#audioCtx, this.#envelope,this.#gainNode);

 
 
    
 }

 

 /**
  * Método que enciende el oscilador
  * 
  * @method onOscillator
  */

 onOscillator(){
    this.#available = true;
 }
 /**
  * Método que apaga el oscilador
  * 
  * @method offOscillator
  */

 offOscillator(){
   
    this.#available = false;
    this.#gainNode.gain.value = 0;
 }

 /**
  * Método que reproduce una de las voces, dependiendo de la nota pasada 
  * como argumento
  * 
  * @method play
  * @param {String} key Frecuencia
  */

 play(key){
   this.mute = false;
  

   if(this.#available ){
      this.#gainNode.gain.value = this.#volume
      
      
      this.voice.start(key,this.#gainNode.gain.value)
    
   }
 }

 //GETTERS
 /**
  * Getter de la disponibilidad del oscilador
  * 
  * @method getAvailable
  * @returns Boolean
  */
  getAvailable(){
     return this.#available;
  }

  /**
  * Getter del flag checked
  * 
  * @method getChecked
  * @returns Boolean
  */
  getChecked(){
     return this.#checked;
  }

  /**
   * Getter de la envolvente
   * 
   * @method getEnvelope
   * @returns JSON
   */
  getEnvelope(){
     return this.voice.getEnvelope();
  }

  /**
   * Getter del estado
   * 
   * @method getState
   * @returns JSON
   */
  getState(){
     var state = {};
     state['pan'] = this.#panNode.pan.value;
     state['on'] = this.#checked;
     state['gain'] = this.#volume;
     state['wave'] = this.voice.getType();

     return state;

  }
  
 //SETTERS

/**
 * Setter del flag checked
 * 
 * @method setChecked
 * @param {Boolean} c valor
 */
 setChecked(c){
   this.#checked = c;
 }
 /**
  * Setter del nivel de paneo del oscilador, -1 izquierda, +1 derecha.
  * 
  * @method setPan
  * @param {Float} value valor de paneo
  */
 setPan(value){
    this.#panNode.pan.value = value;
 }

 /**
  * Setter del tipo de onda
  * 
  * @method setWave
  * @param {String} wave Onda
  */
 setWave(wave){
    
    this.voice.setType(wave);
 }
 
 /**
  * Setter del volumen
  * 
  * @method setVolum
  * @param {Float} level Volumen
  */
 setVolum(level){
    this.#volume = level / 100;
   
   
 }


 //Metodos que modifican los parametros de la envolvente

 /**
  * Setter del Attack
  * 
  * @method setAttack
  * @param {Float} val Valor
  */
 setAttack(val){

   this.voice.setAttack(val)
 }

 /**
  * Setter del Release
  * 
  * @method setRelease
  * @param {Float} val Valor
  */
 setRelease(val){
    this.voice.setRelease(val)
 }

 /**
  * Setter del Sustain
  * 
  * @method setSustain
  * @param {Float} val Valor
  */
 setSustain(val){
    this.voice.setSustain(val)
 }

 /**
  * Setter del Decay
  * 
  * @method setDecay
  * @param {Float} val Valor
  */
 setDecay(val){
    this.voice.setDecay(val)
 }


}



export {oscillator };