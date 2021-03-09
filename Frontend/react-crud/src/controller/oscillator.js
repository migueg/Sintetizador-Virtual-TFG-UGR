
import * as Tone from 'tone';



class oscillator  {
   #oscillator
   #volume //Variable privada
   #envelope // envolvente del sonido

 constructor(type){
  
   this.#envelope = new Tone.AmplitudeEnvelope().toDestination();

    this.#oscillator = new Tone.Oscillator({
       type: "sine",
   
    }).connect(this.#envelope).start();  //Conectamos la envolvente al oscilador
    
    this.#oscillator.frequency.value = "C5";
    this.#volume = -100;

    this.#oscillator.volume.value = this.#volume;
    this.mute = false;
   
   
    
 }


stop(){
   this.#oscillator.mute= true;
   this.mute = true;
}

 toca(){
   this.mute = false;
   this.#oscillator.mute= false;
 
   this.#envelope.triggerAttack()
   this.#envelope.triggerRelease("+0.5") // Establecemos que el Release empieze a los 0.5 ms de la amplitud del audio
   Tone.start() // Necesario para que suene en navegadores mobiles
 }
 setWave(wave){
    this.#oscillator.type = wave;
 }
 
 getVolum(){
    console.log(this.#oscillator.volume.immediate());
    return this.#oscillator.volume;
 }

 setVolum(level){

   this.#volume = level -100;
  

   if(this.mute === true){
      this.#oscillator.mute = true;
   }else{
      this.#oscillator.volume.value = level -100;
   }
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
}

export {oscillator };