import Effect from './effect';

class Delay extends Effect{
    #feedback;
    constructor(context,input,output){
        super(context,input,output);
        this.effect = this.audioctx.createDelay();
        
        this.#feedback = this.audioctx.createGain();

        this.effect.delayTime.value = 0.15;
        this.#feedback.gain.value = 0.25;
    }

    apply(){
        super.apply()
        this.effect.connect(this.wet);
        this.effect.connect(this.#feedback);
        this.#feedback.connect(this.effect);
        console.log("Aqui")
    }
    
}

export{ Delay}