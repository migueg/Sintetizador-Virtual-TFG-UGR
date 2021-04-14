import Effect from './effect';

class Delay extends Effect{
    #feedback;
  
    constructor(context,input,output){
        super(context,input,output);
        this.effect = this.audioctx.createDelay();
        
        this.#feedback = this.audioctx.createGain();
       
        this.effect.delayTime.value = 0.15;
        this.#feedback.gain.value = 0.25;
        this.wet.gain.value = 0.8;
     }

    apply(){
        super.apply()
        this.effect.connect(this.wet);
        this.effect.connect(this.#feedback);
        this.#feedback.connect(this.effect);
        
    }
    
    setTime(tempo){
        var val= 0.0;
        switch(tempo){
            case '1/16':
                val = 0.15;
                break;
            case '1/8':
                val = 0.3;
                break;
            case '1/4':
                val= 0.5;
                break;
            case '1/2':
                val= 0.65;
                break;
            case '1':
                val = 0.8;
                break;
            case '2':
                val = 1;
                break;
            default:
                console.error("ERROR: Valor incorrecto de tiempo");
                break;
        }
        
        this.effect.delayTime.value = val;
    }

    setFeedback(val){
        var value = val /100
        this.#feedback.gain.value = value;
    }


}

export{ Delay}