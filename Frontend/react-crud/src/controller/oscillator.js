
import * as Tone from 'tone';
import Voice from './voice';
class oscillator  {
   #ctx
   #audioCtx 
   #oscillator
   #gainNode //Variable privada
   #envelope // envolvente del sonido
   #volume
   #available
   #played
   #keyUp

 constructor(type){
   this.#audioCtx = new window.AudioContext ()
   this.#envelope = {
      attack : 0,
      decay: 0.6,
      sustain: 0.5,
      release: 2.5
   }
      
   
   this.voice = new Voice('sine',this.#audioCtx, this.#envelope);
   this.#oscillator = this.#audioCtx.createOscillator();
   this.#oscillator.type = 'sine'
   this.#oscillator.frequency.setValueAtTime(440, this.#audioCtx.currentTime); // value in hertz
   this.#gainNode = this.#audioCtx.createGain();

  
   this.#volume = 0;
   this.#available = false;
   this.#gainNode.gain.value = 0;

      
   
   this.#oscillator.connect(this.#gainNode)
  // this.#envelope.connect(this.#gainNode)
  
   this.#gainNode.connect(this.#audioCtx.destination);
   
   this.#oscillator.start(0);

   this.#played = false;
   this.#keyUp = false
   

 
  // console.log(this.outputNode.gain.value)
   
    
 }


stop(){
   this.#oscillator.mute= true;
   this.mute = true;
}

 onOscillator(){
    this.#available = true;
 }
 
 offOscillator(){
    this.#available = false;
    this.#gainNode.gain.value = 0;
 }

 toca(key){
   this.mute = false;
   this.#keyUp = false;

   if(this.#available ){
      this.#gainNode.gain.value = this.#volume
      
      this.voice.start(key,this.#gainNode.gain.value)
      //this.#oscillator.frequency.value = key;
      //this.#gainNode.gain.value = this.#volume;
      this.envelopeGeneratorOn();
    
      
   }
 }
 setWave(wave){
    this.#oscillator.type = wave;
 }
 
 
 setVolum(level){
    this.#volume = level / 100;
   
   
 }


 //Metodos que modifican los parametros de la envolvente
 setAttack(val){

   this.voice.setAttack(val)
    /* console.log("Attack: " + val)
    this.#envelope.attack = val; */
 }

 setRelease(val){
    this.voice.setRelease(val)
   /* console.log("Release: " + val)
    this.#envelope.release = val;
    */
 }

 setSustain(val){
    this.voice.setSustain(val)
   /* console.log("Sustain: " + val)

    this.#envelope.sustain = val; */
 }

 setDecay(val){
    this.voice.setDecay(val)
   /* console.log("Decay: " + val)

    this.#envelope.decay = val; */
 }

 silence(){
   this.#keyUp = true
 //  this.#gainNode.gain.linearRampToValueAtTime(0, this.#audioCtx.currentTime + 0.3 + 0.5)
   this.#played = false;
 }


 envelopeGeneratorOn( ){
    var current = this.#gainNode.gain.value = this.#volume
    var now = this.#audioCtx.currentTime
   
    this.#gainNode.gain.cancelScheduledValues(now)
    this.#gainNode.gain.setValueAtTime(0 ,now)

    //Fase de ataque
    this.#gainNode.gain.linearRampToValueAtTime(current, now + this.#envelope.attack );
  
    
    //Fase de decay
    current = current / 2
    
    this.#gainNode.gain.linearRampToValueAtTime(current, now + this.#envelope.attack + this.#envelope.decay);

    //Fase de sustain
    current = current-0.1
       
    this.#gainNode.gain.linearRampToValueAtTime(current, now + this.#envelope.attack + this.#envelope.decay +this.#envelope.sustain)
    //Fase de release
    this.#gainNode.gain.linearRampToValueAtTime(0, now +this.#envelope.attack + this.#envelope.decay +this.#envelope.sustain + this.#envelope.release);
 }
}

export {oscillator };