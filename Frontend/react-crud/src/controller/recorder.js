
/**
 * Objeto que se va a encargar de crear un canal stream
 * con el audio saliente
 * 
 * @property source
 * @type Object
 * @private
 */

/**
 * Objeto que se va a encargar de grabar el sonido
 * 
 * @property mediarecorder
 * @type Object
 * @private
 */

class Recorder{
    #source
    #mediarecorder
    #pause;
    #start
    constructor(master,context){
        this.fragments = []
        this.#start = false;
        this.#pause = false;

        this.#source = context.createMediaStreamDestination()
        master.connect(this.#source);
        this.#mediarecorder = new MediaRecorder(this.#source.stream)
        var that = this
        this.#mediarecorder.ondataavailable = function(event) {
            that.fragments.push(event.data);
          };
         
        this.#mediarecorder.onstop = function(evt) {
            // Make blob out of our blobs, and open it.
            var blob = new Blob(that.fragments, { 'type' : 'audio/mp3; codecs=opus' });
            document.querySelector("#audio").src = URL.createObjectURL(blob);
          };


    }

    rec(state){

        if(state === 'start'){
            this.#start = true;
            this.#pause = false;
            this.#mediarecorder.start()
        }else if(state === 'pause'){
            if(!this.#pause){
                this.#start = false;
                this.#pause = true;
                this.#mediarecorder.stop()
            }
            
            
          
        }else if(state === 'stop'){
            if(this.#start){
                this.#mediarecorder.stop()
            }
            this.fragments = []
            
        }
    }
}

export default Recorder;