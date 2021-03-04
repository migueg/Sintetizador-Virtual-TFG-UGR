
import * as Tone from 'tone';



class Oscilador  {
   #oscilador
   #volume //Variable privada

 constructor(type){
    this.#oscilador = new Tone.Oscillator(); //Crea e inicia la fuente al tiempo actual
    this.#oscilador.type = "sine";
    this.env = new Tone.AmplitudeEnvelope();
    this.#oscilador.frequency.value = "C5";
    this.#oscilador.connect(this.env);
    this.#volume = -100;
    this.#oscilador.volume.value = this.#volume;
    this.mute = false;
 }

 /*connect(merge,n1,n2){
    
    return this.oscilador.connect(merge,n1,n2);
 }*/

stop(){
   this.#oscilador.mute= true;
   this.mute = true;
}
 connect(osc){
     return this.#oscilador.connect(osc,0,0);
 }
 toca(){
   this.mute = false;
   this.#oscilador.mute= false;
    this.#oscilador.toDestination().start();
     //this.env.toMaster();
    // this.env.triggerAttack();

 }

 setWave(wave){
    this.#oscilador.type = wave;
 }
 
 getVolum(){
    console.log(this.#oscilador.volume.immediate());
    return this.#oscilador.volume;
 }

 setVolum(level){

   this.#volume = level -100;
  

   if(this.mute === true){
      this.#oscilador.mute = true;
   }else{
      this.#oscilador.volume.value = level -100;
   }
 }
}

export {Oscilador as oscilador};