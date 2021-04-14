import Effect from './effect'

const types = {
    LP: "lowpass",
    HP: "highpass",
    LS: "lowshelf",
    BP: "bandPass",
    HS: "highshelf",
    PI: "peaking",
    NT: "notch",
    AP: "allpass"

}

class Filter extends Effect{
    #type
    constructor(context,input,output,type){
        super(context,input,output);
        this.#type = type;
        this.effect = this.audioctx.createBiquadFilter();
        

        this.init(type);
        
    }

    apply(){
        super.apply();
        this.effect.connect(this.wet);
        console.log('AQUIII')
    }

    
    init(type){
        this.#type = type;
        this.effect.type= type;
        this.setinitFrecuencies();
        console.log(this.effect.type)
        
    }
    //Para el reverb
    connect(input,output){
        input.connect(this.effect);
        this.effect.connect(output);
        //this.effect.connect(this.audioctx.destination);
    }

    setFrecuency(val){
        this.effect.frequency.value = val;
    }

    
    setinitFrecuencies(){
        switch(this.#type){
            case types.LP:
                this.effect.frequency.value = 22050;
                break;
            case types.HP:
                this.effect.frequency.value = 0;
              
                break;
            case types.HS:
                this.effect.frequency.value = 22050;
                break;
            case types.LS:
                this.effect.frequency.value = 0;
                break;
            case types.BP:
                this.effect.frequency.value = 0;
                break;
            case types.PI:
                this.effect.frequency.value = 0;
                break;
            case types.NT:
                this.effect.frequency.value = 0;
                break;
            default:
                console.log("Tipo de filtro incompatible")
                break;
        }
    }

    setType(type){
        this.effect.type= type;
        this.setinitFrecuencies();
    }
    
    
}

export { Filter};