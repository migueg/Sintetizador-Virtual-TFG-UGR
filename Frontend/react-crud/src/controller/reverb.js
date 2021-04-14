import Effect from './effect'
import {Filter} from './filter';

class Reverb extends Effect{
    #decay
    #gainAux
    #gainFilter
    
   
    constructor(context,input,output){
        super(context,input,output);
        this.effect = this.audioctx.createConvolver();
        this.#gainAux = this.audioctx.createGain();
        this.#gainFilter = this.audioctx.createGain();

        this.#decay = 5;
        this.lpF = new Filter(context,this.effect,null,"lowpass");
        this.hpF = new Filter(context, this.effect,null,"highpass");
        
    }

    impulseResponse(duration, decay, reverse){
        var sampleRate = this.audioctx.sampleRate
        var length = sampleRate * duration
        var impulse = this.audioctx.createBuffer(2,length,sampleRate)
        var impulseL = impulse.getChannelData(0);
        var impulseR = impulse.getChannelData(1);
    
        if (!decay)
            decay = 2.0;
        for (var i = 0; i < length; i++){
          var n = reverse ? length - i : i;
          impulseL[i] = (Math.random() * 2 - 1) * Math.pow(1 - n / length, decay);
          impulseR[i] = (Math.random() * 2 - 1) * Math.pow(1 - n / length, decay);
        }
       
        return impulse;
    
    }

    disapply(){
        super.disapply();
    }
    
    apply(){
       
        this.effect.buffer = this.impulseResponse(5,5,0);
        this.effect.connect(this.#gainAux);
        super.apply();
        this.lpF.connect(this.#gainAux,this.#gainFilter);
        this.hpF.connect(this.#gainFilter,this.wet);
        
    }
    
    setHPF(val){
        this.hpF.setFrecuency(val);
    }
    
    setLPF(val){
        this.lpF.setFrecuency(val);
       
    }

    setDecay(val){
        this.#decay = val  ;
        var duration = 10 - val; // Ya que la duracion es inversa al decay

        this.effect.buffer = this.impulseResponse(duration,this.#decay,0);
    }
    
}

export  {Reverb};