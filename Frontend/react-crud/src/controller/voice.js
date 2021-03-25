import { context } from "tone";


class Voice {
    #voices
    #gains
    #type 
    #context
    #envelope
    #masterNode
    constructor(type,context,envelope,gain){
        this.#type = type;
        this.#context = context;
        this.#envelope = envelope;
        this.#masterNode = gain;
        this.#gains = {};
        this.#voices = {};
        this.fetchNotes();
        this.activeVoices = {};
        //this.#voices = this.createVocies();
        
    }

     async fetchNotes(){
        fetch('http://localhost:8080/notes')
        .then(res => res.json())
        .then((data) => {
            this.notes = data.notes[0];
            this.createVocies();
        })
        .catch(console.log)
        
    }

    createVocies(){
        
        for(var i in this.notes){
            var voice = this.#context.createOscillator();
            voice.type = this.#type;
            voice.frequency.value = this.notes[i];

            var gainVoice =  this.#context.createGain();
            gainVoice.gain.value = 0;
            this.#gains[this.notes[i]] = gainVoice;
            
            voice.connect(gainVoice);
            //gainVoice.connect(this.#context.destination);
            gainVoice.connect(this.#masterNode);
            voice.start(0);

            this.#voices[this.notes[i]] = voice;
            

        }

       
    }

    start(key,gain){
        console.log("key: " + key);
        console.log("gain: " +gain);
        this.activeVoices[key] = this.#voices[key]
        this.envelopeGeneratorOn(key,gain)
    }

    setGain(gain,key){
        console.log(this.#voices)
        this.#gains[key].gain.value = gain;
    }

    setType(){

    }

    //Metodos que modifican los parametros de la envolvente
 setAttack(val){
    
    console.log("Attack: " + val)
    this.#envelope.attack = val;
 }

 setRelease(val){
   console.log("Release: " + val)

    this.#envelope.release = val;
   
 }

 setSustain(val){
   console.log("Sustain: " + val)

    this.#envelope.sustain = val;
 }

 setDecay(val){
   console.log("Decay: " + val)

    this.#envelope.decay = val;
 }

 setType(type){
     for(var i in this.#voices){
         this.#voices[i].type = type
     }
 }
    envelopeGeneratorOn(key,gain){
        var gainN = this.#gains[key].gain
        var current = gainN.value  = gain
        var now = this.#context.currentTime
       
        gainN.cancelScheduledValues(now)
        gainN.setValueAtTime(0 ,now)
    
        //Fase de ataque
        gainN.linearRampToValueAtTime(current, now + this.#envelope.attack );
      
        
        //Fase de decay
        current = current / 2
        
        gainN.linearRampToValueAtTime(current, now + this.#envelope.attack + this.#envelope.decay);
    
        //Fase de sustain
        current = current-0.1
           
        gainN.linearRampToValueAtTime(current, now + this.#envelope.attack + this.#envelope.decay +this.#envelope.sustain)
        //Fase de release
        gainN.linearRampToValueAtTime(0, now +this.#envelope.attack + this.#envelope.decay +this.#envelope.sustain + this.#envelope.release);
     }
}

export default Voice;