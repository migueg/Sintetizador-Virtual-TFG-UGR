


class Effect {
 
    constructor(context,input,output){
        this.audioctx = context
        this.effect = null;
        this.input = input
        this.output = output;
        this.wet = this.audioctx.createGain();
        
        
    }

    disapply(){
        this.wet.disconnect(this.output)
    }
    
    apply(){
        this.input.connect(this.effect)
        this.wet.connect(this.output);
        

        
        
    }
    /**
     * Setter de la cantidad de efecto aplicada
     * 
     * @method setWet
     * @param {Float} val Nivel de volumen que se quiere aplicar
     */
     setWet(val){
        
        this.wet.gain.value = val/100;
    }

}

export default Effect;