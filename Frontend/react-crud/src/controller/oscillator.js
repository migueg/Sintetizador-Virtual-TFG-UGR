
import Voice from './voice';
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



 onOscillator(){
    this.#available = true;
 }
 
 offOscillator(){
    this.#available = false;
    this.#gainNode.gain.value = 0;
 }

 play(key){
   this.mute = false;
  

   if(this.#available ){
      this.#gainNode.gain.value = this.#volume
      
      this.voice.start(key,this.#gainNode.gain.value)

    
      
   }
 }
 setWave(wave){
  
    this.voice.setType(wave);
 }
 
 
 setVolum(level){
    this.#volume = level / 100;
   
   
 }


 //Metodos que modifican los parametros de la envolvente
 setAttack(val){

   this.voice.setAttack(val)
 }

 setRelease(val){
    this.voice.setRelease(val)
 }

 setSustain(val){
    this.voice.setSustain(val)
 }

 setDecay(val){
    this.voice.setDecay(val)
 }


}

export {oscillator };