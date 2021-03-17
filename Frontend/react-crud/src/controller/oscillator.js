
import * as Tone from 'tone';
import Envelope from './envelopeGenerator';
class oscillator  {
   #ctx
   #audioCtx 
   #oscillator
   #gainNode //Variable privada
   #envelope // envolvente del sonido
   #volume
   #available
   #played

 constructor(type){
   this.#audioCtx = new window.AudioContext ()
   this.#envelope =new Envelope(this.#audioCtx, {
      attack: 0.1,
      decay: 3,
      sustain: 0.4,
      release: 0.1,
      
      
    });
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
   this.#envelope.connect(this.#gainNode.gain)
   this.#oscillator.start(0);

   this.#played = false;
   

 
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
   
   if(this.#available && !this.#played){
      this.#oscillator.frequency.value = key;
      //this.#gainNode.gain.value = this.#volume;
      this.envelopeGeneratorOn();
      this.#played = true;
      
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
    this.#envelope.attack = val;
 }

 setRelease(val){
    this.#envelope.release = val;
   
 }

 setSustain(val){
    this.#envelope.sustain = val;
 }

 setDecay(val){
    this.#envelope.decay = val;
 }

 silence(){
   this.#gainNode.gain.linearRampToValueAtTime(0, this.#audioCtx.currentTime + 0.3 + 0.5)
   this.#played = false;
 }


 envelopeGeneratorOn( a , d ,s){
    console.log('envelope')
    var current = this.#gainNode.gain.value = this.#volume
    var now = this.#audioCtx.currentTime
   
    this.#envelope.setAmplitude(current);
    this.#envelope.action(now)
    //this.#envelope.release(now + 0.5 )

   // let stopAt = this.#envelope.getReleaseCompleteTime();

    //this.#envelope.stop(stopAt);
    /* this.#gainNode.gain.cancelScheduledValues(now)
    this.#gainNode.gain.setValueAtTime(0 ,now)
    this.#gainNode.gain.linearRampToValueAtTime(current, now + 0.3);
    this.#gainNode.gain.linearRampToValueAtTime(current, now  + 0.1);
    this.#gainNode.gain.linearRampToValueAtTime(0, now + 0.3 + 0.5); */
 }
}

export {oscillator };