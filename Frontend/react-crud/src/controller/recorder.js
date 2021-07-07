
/**
 * La clase Recorder se encarga de convertir las señales de audio en archivos  mp3
 * legibles por el navegador
 *
 * @class Recorder
 * @constructor
 * @param {BaseAudioContext} context Contexto
 * @param {AudioNode} master Ganancia master
 * 
 */

/**
 * Objeto que se va a encargar de crear un canal stream
 * con el audio saliente
 * 
 * @property source
 * @type MediaStreamDestinationNode
 * @private
 */

/**
 * Objeto que se va a encargar de grabar el sonido
 * 
 * @property mediarecorder
 * @type MediaRecorder
 * @private
 */

/**
 * @property pause
 * @type Boolean
 * @private
 */

/**
 * @property start
 * @type Boolean
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

    /**
     * Método que gestiona el proceso de grabación
     * 
     * @method rec
     * @param {String} state Acción a realizar
     */
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