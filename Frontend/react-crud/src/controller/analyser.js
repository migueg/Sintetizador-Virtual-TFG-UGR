
class Analyser{
    #analyser
    #domain
    #highFreq;
    #size;
    constructor(master,context){
        this.#analyser = context.createAnalyser();
        this.#analyser.fftSize = 256;
        this.#highFreq = context.sampleRate / 2;
        this.#size = this.#analyser.frequencyBinCount;
        this.#domain = new Uint8Array(this.#size);

        master.connect(this.#analyser)
        //this.#analyser.connect(context.destination)
        //this.createCanva()

    }

    

    analyse(){
       this.#analyser.getByteFrequencyData(this.#domain) //Guarda en domain decibeles de frecuencias
       console.log(this.#domain)
       for(var i = 0; i < this.#size; i++){
           console.log(this.#domain[i])
       }
    }

    getSize(){
        return this.#size;
    }

    consoledomain(){
        console.log(this.#domain)
    }
    getData(){
        this.#analyser.getByteFrequencyData(this.#domain) 
       //console.log(this.#domain)
        return this.#domain;
    }

}

export default Analyser;