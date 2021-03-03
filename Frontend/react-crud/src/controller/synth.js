import {oscilador} from './oscillator';
import * as Tone from 'tone';

class Synth{
    constructor(){
        this.osciladorA = new oscilador("sine");
        this.osciladorB = new oscilador("square");
        
        this.merge = new Tone.Merge().toDestination();
    }

    //Apagar osciladores
    stopA(){
        this.osciladorA.stop();
        
    }
    stopB(){
        this.osciladorB.stop();
    }

    //Encender osciladores
    play1() {
        console.log('Hola1');
        //this.osciladorA.connect(this.merge,0,0).start();
        

        //this.merge.toDestination();
        this.osciladorA.toca();
    }
    play2() {
        console.log('Hola1');
        //this.osciladorA.connect(this.merge,0,1).start();
        //this.osciladorB.connect(this.osciladorA);

        //this.merge.toDestination();
        this.osciladorB.toca();
    }


    //Seleccionar Onda osciladores

    selectWave(osc, wave){

        switch(osc){
            case 'A':
                this.osciladorA.setWave(wave);
                break;
            case 'B':
                this.osciladorB.setWave(wave);
                break;
        }
    }
}


export {
    Synth as synth
};