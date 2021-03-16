import {oscillator} from './oscillator';
import * as Tone from 'tone';

class Synth{
    #oscillatorA;
    #oscillatorB;

    constructor(){
        this.#oscillatorA = new oscillator("sine");
        this.#oscillatorB = new oscillator("square");
    
        this.merge = new Tone.Merge().toDestination();
    }


    //Apagar oscillatores
    stop(osc){
        if(osc === 'A'){
            this.#oscillatorA.stop();

        }

        if(osc === 'B'){
            this.#oscillatorB.stop();
        }
    }
   
    //Encender oscillatores
    play(osc){
        if(osc === 'A'){
            console.log('HolaA')
            this.#oscillatorA.toca();

        }

        if(osc === 'B'){
            console.log('HolaB')
            this.#oscillatorB.toca();
        }
    }

    playNote(){
        this.#oscillatorA.toca()
        this.#oscillatorB.toca()
    }

    //Seleccionar Onda oscillatores
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

    getVolum(osc){
        if(osc === 'A'){
            return this.#oscillatorA.getVolum();
        }

        if(osc === 'B'){
            return this.#oscillatorB.getVolum();
        }

    }

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


    //Establece los parametros de la envolvente
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
}


export {
    Synth as synth
};