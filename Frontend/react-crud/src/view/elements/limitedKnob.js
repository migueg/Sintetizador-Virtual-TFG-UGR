
import  React from 'react';
import {Knob} from 'react-rotary-knob';
import {sinte} from '../osc-components';
import * as skins from 'react-rotary-knob-skin-pack';
import { AutoFilter } from 'tone';

export const types = {
  OSC_VOLUM: "oscVol",
}

class LimitedKnob extends React.Component {
    #type;
    #skin; 
    constructor(props) {
      super();
      this.state = {
        value: 0
      };
      
      this.#type = props.type;
      if(this.#type === types.OSC_VOLUM){
        this.#skin = skins.s10;
      }
   
      this.osc = props.osc ;
      this.handleOnChange = this.handleOnChange.bind(this); //Le decimos a la funcion que el this de la clase es su this
    }
  
    handleOnChange(val) {
      //ignore change if distance is greater than defined
      //here we use a distance of 200 because our max value is 1000
      //change if needed
      const maxDistance = 10;
      let distance = Math.abs(val - this.state.value);
      if (distance > maxDistance) {
        return;
      } else {
       
        switch(this.#type){
          case types.OSC_VOLUM:
            this.setState({ value: val });
            switch(this.osc){
              case 'A':
                sinte.setVolum('A',this.state.value);
                break;

              case 'B':
                sinte.setVolum('B',this.state.value);
                break;

              default:
                break;
            }

          break;

          default:
            break;
        }
        
         
      }
    }

    getSatate(){
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

