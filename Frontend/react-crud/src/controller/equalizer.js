
class Equalizer{
    #lw
    #lwm
    #mid
    #hgm
    #hg
    #context
    constructor(master,context,eqGain){
        this.#context = context;

        this.#lw = context.createBiquadFilter();
        this.#lwm = context.createBiquadFilter();
        this.#mid = context.createBiquadFilter();
        this.#hgm = context.createBiquadFilter();
        this.#hg = context.createBiquadFilter();

        /* master.connect(this.#lw);
        this.#lw.connect(this.#lwm);
        this.#lwm.connect(this.#mid);
        this.#mid.connect(this.#hgm);
        this.#hgm.connect(this.#hg);

        this.#hg.connect(context.destination)
 */
        master.connect(this.#hg);
        this.#hg.connect(this.#hgm);
        this.#hgm.connect(this.#mid);
        this.#mid.connect(this.#lwm);
        this.#lwm.connect(this.#lw);


        this.#lw.connect(eqGain)
        eqGain.connect(context.destination)

        this.__setProperties();

    }

    __setProperties(){
        this.#hg.type = 'highshelf';
        this.#hg.frequency.value = 19201; //19201hz-2400hz
        this.#hg.gain.value = 0;

        this.#hgm.type = 'peaking';
        this.#hgm.frequency.value = 15600; //12001hz-19200hz
        this.#hgm.gain.value = 0;
        this.#hgm.Q.value = 0.7;

        this.#mid.type = 'peaking';
        this.#mid.frequency.value = 10000; //8001hz-12000hz
        this.#mid.gain.value = 0;
        this.#mid.Q.value = 0.7;

        this.#lwm.type = 'peaking';
        this.#lwm.frequency.value = 5000; //2001hz-8000hz
        this.#lwm.gain.value = 0;
        this.#lwm.Q.value = 0.7;

        this.#lw.type = "lowshelf";
        this.#lw.frequency.value = 2000; //0hz-2000hz
        this.#lw.gain.value = 0;


    }

    equalize(freq,value){
        switch(freq){
            case 'lw':
                this.#lw.gain.value = value;
                break;
            case 'lwm':
                this.#lwm.gain.value = value;
                break;
            case 'mid':
                this.#mid.gain.value = value;
                break;
            case 'mhg':
                this.#hgm.gain.value = value;
                break;
            case 'hg':
                this.#hg.gain.value = value;
                break;
            default:
                console.error('ERROR: Banda Incorrecta');
                break;    
        }
    }
}

export default Equalizer;