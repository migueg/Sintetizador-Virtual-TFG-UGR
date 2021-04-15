import Effect from './effect';


class Distorsion extends Effect{
    constructor(context,input,output){
        super(context,input,output);
        this.effect = this.audioctx.createWaveShaper();
        this.effect.oversample = '4x';
        this.effect.curve = this.makeDistortionCurve(400);
    }


    makeDistortionCurve(amount) {
        var k = typeof amount === 'number' ? amount : 50,
          n_samples = 44100,
          curve = new Float32Array(n_samples),
          deg = Math.PI / 180,
          i = 0,
          x;
        for ( ; i < n_samples; ++i ) {
          x = i * 2 / n_samples - 1;
          curve[i] = ( 3 + k ) * x * 20 * deg / ( Math.PI + k * Math.abs(x) );
        }
        return curve;
      };

     setDistorsionCurve(amount){
         this.effect.curve = this.makeDistortionCurve(amount);
     }
     apply(){
         super.apply();
         this.effect.connect(this.wet)
     }
}

export {Distorsion}