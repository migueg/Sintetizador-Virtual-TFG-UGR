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
    #ceil
    #octave;

    constructor(synth){
       this.#support = false;
       this.#midi = null
       this.#input = null;
       this.#output = null;
       this.#notes = null;
       this.#lastOn = false
       this.#synth = synth;
       this.#ceil = 2;
       this.#octave = 3;
       this.init = true;
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

            //console.log(this.#input)
            this.__showDevice(this.#input.name);
            this.#input.addEventListener('midimessage', (event)=>{this.handleMidiMessage(event)}) //Listener para la presion de teclas
        }else{
            this.__showDevice("No hay un MIDI conectado")
        }
        
    }


    
    __showDevice(msg){
        var doc =  document.getElementById('device')
        if(doc){
            document.getElementById('device').innerText = msg
        }
        
    }

    handleMidiMessage(event){
        //console.log(event.data) [off/on,note,velocity]
        const NOTE_ON = 144;
        const NOTE_OFF = 128;

        var data = event.data
        var freq = this.__midiNoteToFrequency(data[1]);
       
        var key = this.__checkNote(freq)
        //console.log('KEY: ' + key)
        if(data[0] === NOTE_ON){
           if(!this.#lastOn ){
            
            if(key){
               
                if(key.length === 2 ){
                    //console.log('Octave: ' + key[1])
                    
                    if(key[1] <= this.#octave && key[1] > this.#octave - 2){
                        var dif =  key[1] % this.#ceil;

                        if(!dif){ 
                        // console.log('Menor white active')
                            document.getElementById(key[0]).classList.toggle('white-active')

                        }else{
                            //console.log('Mayor white active')

                            document.getElementById(key[0]+'1').classList.toggle('white-active')
                        }

                    }
                    
                    
                   
                }else if( key[2] <= this.#octave && key[2] > this.#octave - 2){
                    var aux = key[0] + key[1]
                  
                   // console.log('Octave: ' + key[2])
                    var dif =  key[2] % this.#ceil;


                    if(!dif){
                       // console.log('Menor black active')

                        document.getElementById(aux).classList.toggle('black-active')

                    }else{
                       // console.log('Menor black active')

                        document.getElementById(aux+'1').classList.toggle('black-active')
                    }
                    
                

                }
                this.#synth.playNote(freq)
                
            }
            
           }
            
           this.#lastOn = this.#lastOn ? false : true;
        }else{
            if(key){
                if(key.length === 2  ){
                    if(key[1] <= this.#octave && key[1] > this.#octave - 2){
                        var dif =  key[1] % this.#ceil;
                        if(!dif  ){
                        
                            document.getElementById(key[0]).classList.remove('white-active')

                        }else{
                            
                            document.getElementById(key[0]+'1').classList.remove('white-active')
                        }
                    }
                }else if( key[2] <= this.#octave){
                  
                    var aux = key[0] + key[1]
                    var dif =  key[2] % this.#ceil;


                    if(!dif ){
                      
                        document.getElementById(aux).classList.remove('white-active')

                    }else{
                        
                        document.getElementById(aux+'1').classList.remove('white-active')
                    }
                    

                }
                
            }
        }


    }
    __midiNoteToFrequency (note) {
        var value = Math.pow(2, ((note - 69) / 12)) * 440;
        if(value < 98){
            
            var parse = parseFloat(Math.ceil(value * 10000) / 10000)
            if(parse === 77.7818){return 77.7817}
            if(parse === 92.4987){return 92.4986}
            if(parse === 46.2494){return 46.2493}
            if(parse === 51.9131){return 51.9130}
            return parse;
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

    setOctave(oct){
        this.#octave = oct +1 
    }
}

export default Midi;