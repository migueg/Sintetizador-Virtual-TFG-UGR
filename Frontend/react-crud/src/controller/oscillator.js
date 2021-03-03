
import * as Tone from 'tone';



class Oscilador  {
   #oscilador //Variable privada

 constructor(type){
    this.#oscilador = new Tone.Oscillator(); //Crea e inicia la fuente al tiempo actual
    this.#oscilador.type = "sine";
    this.env = new Tone.AmplitudeEnvelope();
    this.#oscilador.frequency.value = "C5";
    this.#oscilador.connect(this.env);
 }

 /*connect(merge,n1,n2){
    
    return this.oscilador.connect(merge,n1,n2);
 }*/

stop(){
   this.#oscilador.mute= true;
}
 connect(osc){
     return this.#oscilador.connect(osc,0,0);
 }
 toca(){
   this.#oscilador.mute= false;
    this.#oscilador.toDestination().start();
     //this.env.toMaster();
    // this.env.triggerAttack();

 }

 setWave(wave){
    this.#oscilador.type = wave;
 }
 
}

export {Oscilador as oscilador};