
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
 * @type Object
 * @private
 */

/**
 * Nodo de ganancia del oscilador para controlar el volumen de este
 * @property gainNode
 * @type Object
 * @private
 */

/**
 * Guarda los valores de la envolvente
 * @property envelope
 * @type JSON
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
 * @type Object
 */
class oscillator  {
   #audioCtx 
   #gainNode //Variable privada
   #envelope // envolvente del sonido
   #volume
   #available
  
 

 constructor(){
   this.#audioCtx = new window.AudioContext ()
   this.#envelope = {
      attack : 0,
      decay: 0.6,
      sustain: 0.5,
      release: 2.5
   }

   this.#gainNode = this.#audioCtx.createGain();
   
   this.#volume = 0;
   this.#available = false;
   this.#gainNode.gain.value = 0;

  

   this.#gainNode.connect(this.#audioCtx.destination);
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
  * @param {String} key Nota
  */

 play(key){
   this.mute = false;
  

   if(this.#available ){
      this.#gainNode.gain.value = this.#volume
      
      this.voice.start(key,this.#gainNode.gain.value)

    
      
   }
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