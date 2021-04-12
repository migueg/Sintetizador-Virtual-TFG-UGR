import Reverb from "./reverb";

class Effect {
 
    constructor(context,input){
        this.audioctx = context
        this.effect = null;
        this.wet = 0.0;
        this.input = input
        this.wet = this.audioctx.createGain();
        
        
    }

    disapply(){
        this.wet.disconnect(this.audioctx.destination)
    }
    
    apply(){
        this.input.connect(this.effect)
        //Comprobamos de que hijo se trata
        if(this instanceof Reverb){
            this.effect.connect(this.wet);
           // this.wet.connect(this.audioctx.destination)
        }

        
        
    }
    /**
     * Setter de la cantidad de reverb aplicada
     * 
     * @method setReverbWet
     * @param {Float} val Nivel de Reverb que se quiere aplicar
     */
     setWet(val){
        this.wet.gain.value = val;
    }

}

export default Effect;