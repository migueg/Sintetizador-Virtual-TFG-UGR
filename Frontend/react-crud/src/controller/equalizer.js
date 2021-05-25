
class Equalizer{
    #lw
    #lwm
    #mid
    #hgm
    #hg
    constructor(master,context){
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

        this.#lw.connect(context.destination)


        this.__setProperties();

    }

    __setProperties(){
        this.#hg.type = 'highshelf';
        this.#hg.frequency.value = 19201; //19201hz-2400hz
        this.#hg.gain.value = 0;

        this.#hgm.type = 'peaking';
        this.#hgm.frequency.value = 16800; //14401hz-19200hz
        this.#hgm.gain.value = 0;
        this.#hgm.Q.value = 100;

        this.#mid.type = 'peaking';
        this.#mid.frequency.value = 12000; //9601hz-19200hz
        this.#mid.gain.value = 0;
        this.#mid.Q.value = 100;

        this.#lwm.type = 'peaking';
        this.#lwm.frequency.value = 7201; //4801hz-9600hz
        this.#lwm.gain.value = 0;
        this.#lwm.Q.value = 100;

        this.#lwm.type = 'lowshelf';
        this.#lwm.frequency.value = 4800; //0hz-4800hz
        this.#lwm.gain.value = 0;


    }
}

export default Equalizer;