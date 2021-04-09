import Effect from './effect'

class Reverb extends Effect{
    #decay
    #release
    #attack
    

    constructor(context,input){
        super(context,input);
        this.effect = this.audioctx.createConvolver();
        this.#decay = 0.0;
        this.#attack = 0.0001;
        
        this.wet = this.audioctx.createGain();
        //this.wet.connect(this.effect);
       
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
    update(decay){
        this.#decay = decay;
        this.#release = decay;
        
        

        

    }

    disapply(){
        this.effect.disconnect(this.audioctx.destination)
    }
    apply(){
       
        this.effect.buffer = this.impulseResponse(5,4,0);
        this.input.connect(this.effect)
        this.effect.connect(this.audioctx.destination)
    }
}

export default Reverb;