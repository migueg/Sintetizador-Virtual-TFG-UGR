
/**
 * Clase que implementa la polifinia a partir de un conjunto de voces.
 * Cada voz se corresponde con un oscilador real de la Web Audio API
 * 
 * @class Voice
 * @constructor
 * @param {String} type Tipo de la onda
 * @param {Object} context Contexto de audi
 * @param {JSON} envelope Parametros de la envolvente
 * @param {Object} gain Nodo de la ganancia del oscilador al que pertenece
 */

/**
 * Contexto de audio para la aplicación de la Web Audio API
 * @property context
 * @type Object
 * @private
 */

/**
 * Tipo de onda del oscilador
 * @property type
 * @type String
 * @private
 */

/**
 * Guarda los valores de la envolvente
 * @property envelope
 * @type JSON
 * @private
 */

/**
 * Nodo de ganancia del oscilador
 * @property masterNode
 * @type Object
 * @private
 */

/**
 * Contiene las ganacias particulares de cada voz
 * @property gains
 * @type JSON
 * @private
 */

/**
 * Contiene las voces correspondientes a cada nota
 * @property voices
 * @type JSON
 * @private
 */

/**
 * Contiene las voces que se estan reproduciendo
 * @property activeVoices
 * @type JSON
 * @private
 */

/**
 * Contiene las notas con sus frecuencias
 * @property notes
 * @type JSON
 * @private
 */

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

    /**
     * Método que se encarga de crear una voz para cada una de las notas, es decir,
     * para cada nota se crea un oscilador y lo conecta con un nodo de ganancia para
     * lograr la polifonia
     * 
     * @method createVocies
     */
    createVocies(){
        
        for(var i in this.notes){
            var voice = this.#context.createOscillator();
            voice.type = this.#type;
            voice.frequency.value = this.notes[i];

            var gainVoice =  this.#context.createGain();
            gainVoice.gain.value = 0;
            this.#gains[this.notes[i]] = gainVoice;
            
            voice.connect(gainVoice);
           

            gainVoice.connect(this.#masterNode);
            voice.start(0);

            this.#voices[this.notes[i]] = voice;
            

        }

       
    }

    /**
     * Método que es llamado cuando se toca una nota. Almacena que voz se ha tocado
     * y llama al metodo de la envolvente
     * 
     * @method start 
     * @param {String} key Nota tocada
     * @param {Float} gain  Volumen del oscilador
     */
    start(key,gain){
        this.activeVoices[key] = this.#voices[key]
        this.envelopeGeneratorOn(key,gain)
    }

    //GETTERS

    /** 
     * Getter de los parámetros de la envolvente
     * 
     * @method getEnvolve
     * @return JSON
     * 
     */
    getEnvelope(){
        return this.#envelope;
    }

    /**
     * Getter del tipo de onda de los oscilladores de las voces
     * 
     * @returns String
     */
    getType(){
       
        return this.#type;
    }
    /**
     * Setter del volumen
     * 
     * @method setGain 
     * @param {String} key Nota tocada
     * @param {Float} gain  Volumen del oscilador
     */
    setGain(gain,key){
        this.#gains[key].gain.value = gain;
    }


    //Metodos que modifican los parametros de la envolvente
    /**
     * Setter del Attack
     * 
     * @method setAttack
     * @param {Float} val Valor
     */
    setAttack(val){
        this.#envelope.attack = val;
    }

    /**
     * Setter del Release
     * 
     * @method setRelease
     * @param {Float} val Valor
     */
    setRelease(val){
        this.#envelope.release = val;
    
    }
    /**
     * Setter del Sustain
     * 
     * @method setSustain
     * @param {Float} val Valor
     */
    setSustain(val){
        this.#envelope.sustain = val;
    }

    /**
     * Setter del Decay
     * 
     * @method setDecay
     * @param {Float} val Valor
     */
    setDecay(val){
        this.#envelope.decay = val;
    }
    /**
     * Setter del tipo de onda para cada una de las voces
     * 
     * @method setType
     * @param {String} type Tipo de onda
     */
    setType(type){
        for(var i in this.#voices){
            this.#voices[i].type = type
        }
        this.#type = type
    }

    /**
     * Método que simula el comportamiento de una envolvente sobre una 
     * señal de audio y que es llamado cada vez que se presiona una nota
     * 
     * @method envelopeGeneratorOn
     * @param {String} key Nota presionada
     * @param {Float} gain Volumen actual del oscilador
     */
    envelopeGeneratorOn(key,gain){
        var gainN = this.#gains[key].gain
        var current = gainN.value  = gain //Representa el volumen en cada una de las fases
        var now = this.#context.currentTime
       
        //Se cancelan todos los valores de ganancia del nodo y se establecen a 0
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