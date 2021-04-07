import Effect from './effect'

class Reverb extends Effect{
    #decay
    #release
    #attack
    

    constructor(context,output){
        super(context,output);
        this.effect = this.audioctx.createConvolver();
        this.#decay = 0.0;
        this.#attack = 0.0001;
        
        this.wet = this.audioctx.createGain();
        this.wet.connect(this.effect);
        this.effect.connect(this.output);
    }

    update(decay){
        this.#decay = decay;
        this.#release = decay;

    }

    apply(){
        
    }
}