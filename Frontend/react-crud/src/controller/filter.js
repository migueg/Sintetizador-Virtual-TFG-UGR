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
    constructor(context,input,type){
        super(context,input);
        this.#type = type;
        this.effect = this.audioctx.createBiquadFilter();
        

        this.init(type);
        
    }

    apply(){
        super.apply();

    }
    
    init(type){
        this.effect.type= type;
        console.log(this.effect.type)
        switch(type){
            case types.LP:
                this.effect.frequency.value = 22050;
                break;
            case types.HP:
                this.effect.frequency.value = 0;
              
                break;

            default:
                console.log("Tipo de filtro incompatible")
                break;
        }
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
    
}

export { Filter};