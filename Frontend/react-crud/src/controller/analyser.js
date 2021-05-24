import { FormText } from "react-bootstrap";

class Analyser{
    #analyser
    #domain
    #sampleRate;
    #size;
    constructor(master,context){
        this.#analyser = context.createAnalyser();
        this.#analyser.fftSize = 512;
        this.#sampleRate = context.sampleRate
        this.#size = this.#analyser.frequencyBinCount;
        this.#domain = new Uint8Array(this.#size);

        master.connect(this.#analyser)
        //this.#analyser.connect(context.destination)
        //this.createCanva()

    }

    

    analyse(){
       this.#analyser.getByteFrequencyData(this.#domain) //Guarda en domain decibeles de frecuencias
       //console.log(this.#domain)
       for(var i = 0; i < this.#size; i++){
           //console.log(this.#domain[i])
       }
    }

    getSize(){
        return this.#size;
    }

    getSeparation(){
        return this.#sampleRate / this.#analyser.fftSize
    }

    consoledomain(){
        console.log(this.#analyser.frequencyBinCount)
       /*  for(var i=0 ; i < this.#domain.length ; i++){
            //console.log(this.#domain[i])

        } */
    }
    getData(){
        this.#analyser.getByteFrequencyData(this.#domain) 
       //console.log(this.#domain)
        return this.#domain;
    }

}

export default Analyser;