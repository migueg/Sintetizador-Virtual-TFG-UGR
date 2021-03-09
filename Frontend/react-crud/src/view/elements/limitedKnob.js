
import  React from 'react';
import {Knob} from 'react-rotary-knob';
import {sinte} from '../osc-components';
import * as skins from 'react-rotary-knob-skin-pack';

import {types as knobTypes} from './knobtypes';

const types = knobTypes;
class LimitedKnob extends React.Component {
    #type; //tipo de knob
    #skin;
    #value; //valor del knob
    constructor(props) {
      super();
      this.state = {
        value: props.val
      };

      
      this.#value = props.val;
      
      this.#type = props.type;
   
      if(this.#type === types.OSC_VOLUM){
        this.#skin = skins.s10;
      }else{
        this.#skin = skins.s17;
      }
      
/*       if(this.#type === types.RELEASE){
        this.handleOnChangeRelease(50)
      } */
   
      this.osc = props.osc ;
      this.handleOnChange = this.handleOnChange.bind(this); //Le decimos a la funcion que el this de la clase es su this
    }
  
    handleOnChangeOscillator(val){
      this.setState({ value: val });
      sinte.setVolum(this.osc,this.state.value);
        
    }


    handleOnChangeAttack(val){
      this.setState({ value: val });
      var attack = (2 * val ) /100;
      sinte.setEnvolve(this.osc,attack,'attack');
    

    }
    handleOnChangeDecay(val){
      this.setState({ value: val });
      var decay = (2 * val ) /100;
      sinte.setEnvolve(this.osc,decay,'decay');
    }
    handleOnChangeSustain(val){
      this.setState({ value: val });
      var sustain = ( val ) /100;
      sinte.setEnvolve(this.osc,sustain,'sustain');
    }
    handleOnChangeRelease(val){
      this.setState({ value: val });
      var release = ( 5 * val)/100
      sinte.setEnvolve(this.osc,release,'release')
    }
    handleOnChange(val) {
      
      this.#value = val;
      const maxDistance = 10;
      let distance = Math.abs(val - this.state.value);
      if (distance > maxDistance) {
        
        return;
      } else {
       
        switch(this.#type){
          case types.OSC_VOLUM:
            this.handleOnChangeOscillator(val);
            break;
          case types.ATTACK:
            this.handleOnChangeAttack(val);
            break;
          case types.DECAY:
            this.handleOnChangeDecay(val);
            break;
          case types.SUSTAIN:
            this.handleOnChangeSustain(val);
            break;
          case types.RELEASE:
            this.handleOnChangeRelease(val);
            break;
          
          default:
            break;
        }
        
         
      }
    }

    //Cambia el volumen cuando se hace pulsando en los simbolos
    changeVolume(option){
     
      if(option === 'add' || option === 'rest'){
     
        if(option === 'add'){
          if(this.#value > 98){
            this.#value = 99;
          }else{
            this.#value = this.#value + 2;
          }
        }else{
          if(this.#value < 2){
            this.#value = 0;
          }else{
            this.#value = this.#value - 2;
          }
        }

        this.setState({value: this.#value});
        sinte.setVolum(this.osc,this.state.value);
           

      }
    }

    getState(){
      return this.state;
    }
  
    render() {
    let { value, ...rest } = this.props;
  
      return (
        
       <Knob value={this.state.value} onChange={this.handleOnChange} rotateDegrees={180} skin={this.#skin}  {...rest} />
       
      );
    }
  }

export {LimitedKnob as Knob} ;

