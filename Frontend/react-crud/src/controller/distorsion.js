import Effect from './effect';

/**
 * La clase Distorsion encapsula el comportamiento neceseraio para que
 * se pueda aplicar un efecto de delay sobre el sintetizador
 *
 * @class Distorsion
 * @constructor
 * @param {Object} context AudioContext
 * @param {Object} input Nodo de entrada sobre el que se aplica el efecto
 * @param {Object} output Node de salida con el efecto aplicado
 * @see Effect
 */

class Distorsion extends Effect{
    constructor(context,input,output){
        super(context,input,output);
        this.effect = this.audioctx.createWaveShaper();
        this.effect.oversample = '4x';
        this.effect.curve = this.makeDistortionCurve(400);
    }

    /**
     * Método que se encarga de calcular la curva de distorsion 
     * necesaria para aplicar el efecto de distorsion
     * 
     * @method makeDistortionCurve
     * @param {Float} amount Cantidad de distorsion
     * @returns {Float} Curva de distorsion
     */

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

    /**
     * Setter de la curva de distorsion
     * 
     * @method setDistorsionCurve
     * @param {Float} amount Cantidad de distorsion 
     */
     setDistorsionCurve(amount){
         this.effect.curve = this.makeDistortionCurve(amount);
     }

     /**
     * Metodo que se encarga de aplicar el efecto de distorsion sobre el input
     * @method apply
     */
     apply(){
         super.apply();
         this.effect.connect(this.wet)
     }
}

/**
 * Proporciona el efecto Distorsion
 * 
 * @module Distorsion
 */
export {Distorsion}