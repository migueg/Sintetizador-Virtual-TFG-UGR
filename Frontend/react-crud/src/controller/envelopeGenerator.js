class Envelope {
    constructor(context, options){
        this.context = context;
        this.settings = {
            curve: "linear",
            attackCurve: "linear",
            decayCurve: "linear",
            releaseCurve: "linear",
            sampleRate: 44100,
            delayTime: 0,
            startLevel: 0,
            maxLevel: 1,
            attackTime: options.attack,
            holdTime: 0,
            decayTime: options.decay,
            sustainLevel: options.sustain,
            releaseTime: options.release

        }
        this.source = this._getOnesBufferSource();
        this.attackDecayNode = context.createGain();
        this.releaseNode = context.createGain();
        this.ampNode = context.createGain();
        this.outputNode = context.createGain();

        this.outputNode.gain.value = this.settings.startLevel;
        this.ampNode.gain.value =  this.settings.startLevel;

        this.source.connect(this.attackDecayNode);
        this.source.connect(this.outputNode);
        this.attackDecayNode.connect(this.releaseNode);
        this.releaseNode.connect(this.ampNode);
        this.ampNode.connect(this.outputNode.gain);

        this.source.start(0);
    }
    _getOnesBufferSource(){
        var context = this.context;

        // Generate buffer, setting its samples to 1
        // Needs to be 2 for safari!
        // Hat tip to https://github.com/mmckegg/adsr
        var onesBuffer = context.createBuffer(1, 2, context.sampleRate);
        var data = onesBuffer.getChannelData(0);
        data[0] = 1;
        data[1] = 1;
  
        // Create a source for the buffer, looping it
        var source = context.createBufferSource();
        source.buffer = onesBuffer;
        source.loop = true;
  
        return source;
    }

    connect(param){
        this.outputNode.connect(param)
    }
    action(now){
        var current =  this.outputNode.gain.value
        this.ampNode.gain.cancelScheduledValues(now);
        this.ampNode.gain.setValueAtTime(current, now);
        this.ampNode.gain.linearRampToValueAtTime(current, now + 0.3);
        this.ampNode.gain.linearRampToValueAtTime(0, now + 0.3 + 0.5)
        this.outputNode.gain.value = 0;
    }

   
    

    release(when){
    
    }

    setAmplitude(level){
        console.log('aqui')
        this.outputNode.gain.value = level;
    }

    getReleaseCompleteTime() {
        if (typeof this.releasedAt !== 'number') {
          throw new Error("Release has not been called.");
        }
        return this.releasedAt + this.settings.releaseTime;
      }
    
}

export default Envelope;