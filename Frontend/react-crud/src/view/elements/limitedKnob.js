
import  React from 'react';
import {Knob} from 'react-rotary-knob';
import {sinte} from '../osc-components';
import * as skins from 'react-rotary-knob-skin-pack';

import {types as knobTypes} from './knobtypes';

//Enumerado con los tipos posibles de knob
const types = knobTypes;

/**
 * Esta clase genera el componente de la interfaz para un knob limitado
 * que puede ser usado para disitintos fines atendiendo a su tipo
 *
 * @class LimitedKnob
 * @constructor
 * @param {Object} props Objeto que contiene las propiedades del componente
 */
/**
 *  Tipo de knob
 * 
 * @property type
 * @type Object
 * @private
 */
/**
 * Tipo de skin del knob
 * 
 * @property skin 
 * @type Object
 * @private
 */
/**
 *  Valor actual del knob
 * 
 * @property value
 * @type Float
 * @private
 */
/**
 * Estado del Knob
 * 
 * @property state 
 * @type Object
 * 
 */

/**
 * Id del oscilador que contiene el Knob
 * 
 * @property osc 
 * @type char
 */

class LimitedKnob extends React.Component {
    #type; 
    #skin;
    #value; 
   
    constructor(props) {
      super();
      this.state = {
        value: props.val
      };

      
      this.#value = props.val;
      
      this.#type = props.type;
   
      if(this.#type === types.OSC_VOLUM || this.#type === types.REVERBWET){
        this.#skin = skins.s10;
      }else{
        this.#skin = skins.s17;
      }

   
      this.osc = props.osc ;
      this.handleOnChange = this.handleOnChange.bind(this); //Le decimos a la funcion que el this de la clase es su this
    }
    
     //METODOS PRIVADOS 

    /**
     * Método que se encarga de llamar al controlador para que 
     * modifque el volumen general del oscilador
     * 
     * @method handleOnChangeOscillator
     * @param {Float} val Valor del Knob
     * @private
     */
   
    __handleOnChangeOscillator(val){
      this.setState({ value: val });
      sinte.setVolum(this.osc,this.state.value);
        
    }

    /**
     * Método que se encarga de llamar al controlador para que 
     * modifque el Attack del oscilador
     * 
     * @method handleOnChangeAttack
     * @param {Float} val Valor del Knob
     * @private
     */
    __handleOnChangeAttack(val){
      this.setState({ value: val });
      var attack = (2 * val ) /100;
      sinte.setEnvolve(this.osc,attack,'attack');
    

    }
    /**
     * Método que se encarga de llamar al controlador para que 
     * modifque el Decay del oscilador
     * 
     * @method handleOnChangeDecay
     * @param {Float} val Valor del Knob
     * @private
     */
    __handleOnChangeDecay(val){
      this.setState({ value: val });
      var decay = (2 * val ) /100;
      sinte.setEnvolve(this.osc,decay,'decay');
    }
    /**
     * Método que se encarga de llamar al controlador para que 
     * modifque el volumen Master de la aplicacion
     * 
     * @method handleOnChangeMaster
     * @param {Float} val Valor del Knob
     * @private
     */
    __handleOnChangeMaster(val){
      this.setState({ value: val });
      var master = ( val ) /100;
      sinte.setMaster(master)
    }
    
    /**
     * Método que se encarga de llamar al controlador para que 
     * modifque el Sustain del oscilador
     * 
     * @method handleOnChangeSustain
     * @param {Float} val Valor del Knob
     * @private
     */
    __handleOnChangeSustain(val){
      this.setState({ value: val });
      var sustain = ( val ) /100;
      sinte.setEnvolve(this.osc,sustain,'sustain');
    }
    /**
     * Método que se encarga de llamar al controlador para que 
     * modifque el Release del oscilador
     * 
     * @method handleOnChangeRelease
     * @param {Float} val Valor del Knob
     * @private
     */
    __handleOnChangeRelease(val){
      this.setState({ value: val });
      var release = ( 5 * val)/100
      sinte.setEnvolve(this.osc,release,'release')
    }

    /**
     * Método que se encarga de llamar al controlador para que 
     * modifque el nivel de Decay del Reverb aplicado
     * 
     * @method handelOnChangeReverbDecay
     * @param {Float} val Valor del Knob
     * @private
     */
    __handelOnChangeReverbDecay(val){
      this.setState({ value: val });
      var decay = (100 - val) / 10; //se resta el valor a 100 porque el valor es inverso a mas nivel de dacay se necesita menos valor
      sinte.setReverb(decay,"decay");
    }
    /**
     * Método que se encarga de llamar al controlador para que 
     * modifque el filtro pasa alto del Reverb aplicado
     * 
     * @method handelOnChangeReverbHP
     * @param {Float} val Valor del Knob
     * @private
     */
    __handleOnChangeReverbHP(val){
      this.setState({ value: val });
      sinte.setReverb(val,"hpf")
    }

    /**
     * Método que se encarga de llamar al controlador para que 
     * modifque el filtro pasa bajos del Reverb aplicado
     * 
     * @method handelOnChangeReverbLP
     * @param {Float} val Valor del Knob
     * @private
     */
     __handleOnChangeReverbLP(val){
      this.setState({ value: val });
      sinte.setReverb(val,"lpf")
    }
    
    /**
     * Método que se encarga de llamar al controlador para que 
     * modifque el nivel de Reverb aplicado
     * 
     * @method handleOnChangeReverbWet
     * @param {Float} val Valor del Knob
     * @private
     */
    __handleOnChangeReverbWet(val){
      this.setState({ value: val });
      var wet = ( val ) /100;
      sinte.setReverb(wet,"wet");

    }

    //MÉTODOS PÚBLICOS

    /**
     * Método que es llamado cada vez que un Knob es alterado y que redirige la llamada
     * al método adecuado para modificar el parámetro que esta modificando el usuario al 
     * mover el Knob
     * 
     * @method handleOnChange
     * @param {Float} val Valor del Knob
     * 
     */
    handleOnChange(val) {
      
      this.#value = val;
      var maxDistance = 10
      if(this.#type === types.REVERBHPF || this.#type === types.REVERBLPF){
         maxDistance = 2300;
      }else{
         maxDistance = 10;
      }
      
      let distance = Math.abs(val - this.state.value);
      if (distance > maxDistance) {
        
        return;
      } else {
       
        switch(this.#type){
          case types.OSC_VOLUM:
            this.__handleOnChangeOscillator(val);
            break;
          case types.ATTACK:
            this.__handleOnChangeAttack(val);
            break;
          case types.DECAY:
            this.__handleOnChangeDecay(val);
            break;
          case types.SUSTAIN:
            this.__handleOnChangeSustain(val);
            break;
          case types.RELEASE:
            this.__handleOnChangeRelease(val);
            break;
          case types.MASTER:
            this.__handleOnChangeMaster(val);
            break;
          case types.REVERBWET:
            this.__handleOnChangeReverbWet(val);
            break;
          case types.REVERBDECAY:
            this.__handelOnChangeReverbDecay(val);
            break;
          case types.REVERBHPF:
            this.__handleOnChangeReverbHP(val);
            break;
          case types.REVERBLPF:
            this.__handleOnChangeReverbLP(val);
          default:
            break;
        }
        
         
      }
    }

   /**
     * Getter del estado del Knob
     * 
     * @method getState
     * @return Estado del Knob
     * 
     */

    getState(){
      return this.state;
    }
  
    /**
     * Método que devuelve el componente Knob para ser renderizado
     * 
     * @method render
     * @return Código html del componente Knob
     * 
     */
    render() {
    let { value, ...rest } = this.props;
  
      return (
        
       <Knob value={this.state.value} onChange={this.handleOnChange} rotateDegrees={180} skin={this.#skin}  {...rest} />
       
      );
    }
  }


/**
 * Proporciona los elementos de la interfaz para los knobs
 * 
 * @module Knob
 */
export {LimitedKnob as Knob} ;

