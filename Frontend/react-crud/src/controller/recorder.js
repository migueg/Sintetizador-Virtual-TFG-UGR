
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
    constructor(master,context){
        this.fragments = []
        this.#source = context.createMediaStreamDestination()
        master.connect(this.#source);
        this.#mediarecorder = new MediaRecorder(this.#source.stream)
        var that = this
        this.#mediarecorder.ondataavailable = function(event) {
            that.fragments.push(event.data);
          };
         
        this.#mediarecorder.onstop = function(evt) {
            // Make blob out of our blobs, and open it.
            var blob = new Blob(that.fragments, { 'type' : 'audio/ogg; codecs=opus' });
            document.querySelector("#audio").src = URL.createObjectURL(blob);
          };
    }

    rec(state){
        console.log(state)

        if(state === 'start'){
            this.#mediarecorder.start()
        }else if(state === 'pause'){
            
            this.#mediarecorder.stop()
          
        }else if(state === 'stop'){
            this.#mediarecorder.stop()
            this.fragments = []
        }
    }
}

export default Recorder;