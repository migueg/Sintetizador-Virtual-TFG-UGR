import commonjs from "react-rotary-knob";
import { synth } from "./synth";

class Midi {
    #support;
    #midi;
    #input
    #output
    #notes
    #lastOn
    #synth
    constructor(synth){
       this.#support = false;
       this.#midi = null
       this.#input = null;
       this.#output = null;
       this.#notes = null;
       this.#lastOn = false
       this.#synth = synth
       
       this.fetchNotes()
       this.requestAccess(); 
       //this.handleMidiMessage = this.handleMidiMessage.bind(this)
       //this.__checkNote = this.__checkNote.bind(this)
    }

    async fetchNotes(){
        await fetch('http://localhost:8080/notes')
        .then(res => res.json())
        .then((data) => {
            this.#notes = data.notes[0];
        })
        .catch(console.log)
        
    }

    requestAccess(){
        var that = this
        navigator.requestMIDIAccess()
        .then((midi)=>{
            that.#support = true;
            that.#midi = midi;
            console.log("Disponible el acceso MIDI")
            midi.addEventListener('statechange',(event)=>this.initDevices(event.target)); //detecta si se conecta o desconecta el Midi
            this.initDevices()
        },
        (err)=>{
            this.#support=false
            alert("Tu navegador no soporta control por MIDI")
        })
      
    }

    initDevices(){
        if(this.#midi.inputs.size > 0){
            var inputArray = []; //Contiene los inputs
            var outputArray = []; //Contiene los outputs

            const inputs = this.#midi.inputs.values()
            for (let input = inputs.next(); input && !input.done; input = inputs.next()) { //Recorremos los inputs con el iterador
                inputArray.push(input.value)
            }

            
            const outputs = this.#midi.outputs.values();

            for (let output = outputs.next(); output && !output.done; output = outputs.next()) {
                outputArray.push(output.value);

            }

            this.#input = inputArray[0]
            this.#output = outputArray[0]

            this.__showDevice(this.#input.name);
            this.#input.addEventListener('midimessage', (event)=>{this.handleMidiMessage(event)}) //Listener para la presion de teclas
        }else{
            this.__showDevice("No hay un MIDI conectado")
        }
        
    }


    
    __showDevice(msg){
        document.getElementById('device').innerText = msg
    }

    handleMidiMessage(event){
        //console.log(event.data) [off/on,note,velocity]
        const NOTE_ON = 144;
        const NOTE_OFF = 128;

        var data = event.data
        if(data[0] === NOTE_ON){
           if(!this.#lastOn ){
            var freq = this.__midiNoteToFrequency(data[1]);
            var key = this.__checkNote(freq)
            if(key){
                
                //document.getElementById(key[0]).classList.toggle('white-active')
                this.#synth.playNote(freq)
                
            }
            
           }
            
           this.#lastOn = this.#lastOn ? false : true;
        }


    }
    __midiNoteToFrequency (note) {
        var value = Math.pow(2, ((note - 69) / 12)) * 440;
        if(value < 98){
            return parseFloat(Math.ceil(value * 10000) / 10000)
        }else if (value < 988){
            return parseFloat(Math.round(value * 1000) / 1000)
        }else{
            return parseFloat(Math.round(value * 100) / 100)
        }
      
    }

    __checkNote(freq){
       //console.log('Freq:' + freq)
       if(freq >= 32.7032 && freq <= 4186.01){ //Rango de frecuencias
        var key = ''        
        //console.log(this.#notes )

        for(var n in this.#notes ){
             if(this.#notes[n] === freq){ 
                return n;
             }
 
           
        }
        return key
       } else{
           return false;
       }
    }
}

export default Midi;