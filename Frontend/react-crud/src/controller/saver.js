
class Saver {
    #envelopes
    #oscilators
    #synth;
    #effects
    #oscillatorA
    #oscillatorB

    constructor(oscA,oscB,synth){
        this.#envelopes = {};
        this.#oscilators = {};
        this.#effects = {};
        this.#oscillatorA = oscA;
        this.#oscillatorB = oscB;
        this.#synth = synth;

    }

    __getEnvelopes(){
        this.#envelopes['A'] = this.#oscillatorA.getEnvelope();
        this.#envelopes['B'] = this.#oscillatorB.getEnvelope(); 
    }

    __getOscillators(){
        
        this.#oscilators['A'] = this.#oscillatorA.getState();
        this.#oscilators['B'] = this.#oscillatorB.getState();

        this.__getEnvelopes();
        this.#oscilators['A']['envelope'] = this.#envelopes['A'];
        this.#oscilators['B']['envelope'] = this.#envelopes['B'];

        

    }

    __getEffects(){
        this.#oscilators['effects'] = this.#synth.getEffects();
    }

    __sendRequest(toSave){
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Migue',
                'Type': 'deafault-save'
            },
            body: JSON.stringify(toSave)
        };

        fetch('http://localhost:8080/save/Migue',requestOptions)
            .then(response => response.json())
            .then(data => console.log(data));
    }
    save(){
        this.__getOscillators();
        this.__getEffects();

        var toSave = {};
        toSave['state'] = this.#oscilators;
        console.log(toSave)
        this.__sendRequest(toSave);
    }
}

export default Saver;