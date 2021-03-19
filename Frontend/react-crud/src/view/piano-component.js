import  React from 'react';
import {sinte} from './osc-components';
import 'bootstrap/dist/css/bootstrap.css';
import '../css/piano.css';


class Piano extends React.Component{
    #octave
    constructor(){
        super();
        this.#octave = 0;
        this.pressedKeys = {}
        this.notes = this.fetchNotes();

    }

    fetchNotes(){
        fetch('http://localhost:8080/notes')
        .then(res => res.json())
        .then((data) => {
            this.notes = data.notes[0]
        })
        .catch(console.log)
        
    }
    noNotePress(obj){
        return Object.keys(obj).length === 0;
    }
    upOctave(){
        if(this.#octave === 6){
            this.#octave = 6;
        }else{
            this.#octave += 2;
        }

     
    }

    downOctave(){
        if(this.#octave === 0){
            this.#octave = 0;
        }else{
            this.#octave -= 2;
        }

    }

    playNote(oct , key){
        if(oct === 'down' || oct=== 'up'){
            if(oct === 'down'){
            
                var octave = this.#octave + 1
                
                if(octave === 7 ){
                    octave = 6;
                }
            }
    
            if(oct === 'up'){
                var octave = this.#octave + 2
               
                    if(octave === 8){
                        octave = 7;
                    }
            }
    
            key = key + octave
            sinte.playNote(this.notes[key])
        }
        
    }
    notePlayed(e){
        e = e || window.event;
        e = e.target || e.srcElement; // obtenemos el elemento que lanzo el evento

    
       if(e.nodeName === 'LI'){
            //(e.textContent)
            if(e.className != "white" && e.className != "black" ){
                
                
                var key =  e.id 
                this.playNote('up', key);

            }else{
               
     
                var key =  e.id 
            
                this.playNote('down', key);
            }
            
       }
    }

    render(){
        return(
        <div className="piano">
            
            <ul className="notes">
                <div className="octaves">
                    <button id='down' onClick={()=>{this.downOctave()}} >Down</button>
                    <button id='up' onClick={()=>{this.upOctave()}}>UP</button>
                </div>
                <li className="white" id="C" name = "first" onClick={()=>{this.notePlayed()}}><p>C{this.#octave}</p></li>
                <li className="black" id="C#"onClick={()=>{this.notePlayed()}}><p>C#{this.#octave}</p></li>
                <li className="white" id='D'onClick={()=>{this.notePlayed()}}><p>D{this.#octave}</p></li>
                <li className="black" id="D#"onClick={()=>{this.notePlayed()}}><p>D#{this.#octave}</p></li>
                <li className="white" id='E'onClick={()=>{this.notePlayed()}}><p>E{this.#octave}</p></li>
                <li className="white" id='F'onClick={()=>{this.notePlayed()}}><p>F{this.#octave}</p></li>
                <li className="black" id='F#'onClick={()=>{this.notePlayed()}}><p>F#{this.#octave}</p></li>
                <li className="white" id='G'onClick={()=>{this.notePlayed()}}><p>C{this.#octave}</p></li>
                <li className="black" id='G#'onClick={()=>{this.notePlayed()}}><p>G#{this.#octave}</p></li>
                <li className="white" id='A'onClick={()=>{this.notePlayed()}}><p>A{this.#octave}</p></li>
                <li className="black" id='A#'onClick={()=>{this.notePlayed()}}><p>A#{this.#octave}</p></li>
                <li className="white" id='B'onClick={()=>{this.notePlayed()}}><p>B{this.#octave}</p></li>
                <li className="white o2 C" id='C'onClick={()=>{this.notePlayed()}}><p>C{this.#octave + 1}</p></li>
                <li className="black o2 CS" id="C#"onClick={()=>{this.notePlayed()}}><p>C#{this.#octave + 1}</p></li>
                <li className="white o2 D" id='D'onClick={()=>{this.notePlayed()}}><p>D{this.#octave + 1}</p></li>
                <li className="black o2 DS" id="D#"onClick={()=>{this.notePlayed()}}><p>D#{this.#octave + 1}</p></li>
                <li className="white o2 E" id='E'onClick={()=>{this.notePlayed()}}><p>E{this.#octave + 1}</p></li>
                <li className="white o2 F" id='F'onClick={()=>{this.notePlayed()}}><p>F{this.#octave + 1}</p></li>
                <li className="black o2 FS" id='F#' onClick={()=>{this.notePlayed()}}><p>F#{this.#octave + 1}</p></li>
                <li className="white o2 G" id='G' onClick={()=>{this.notePlayed()}}><p>G{this.#octave + 1}</p></li>
                <li className="black o2 GS" id='G#' onClick={()=>{this.notePlayed()}}><p>G#{this.#octave + 1}</p></li>
                <li className="white o2 A" id='A' onClick={()=>{this.notePlayed()}}><p>A{this.#octave + 1}</p></li>
                <li className="black o2 AS" id='A#' onClick={()=>{this.notePlayed()}}><p>A#{this.#octave + 1}</p></li>
                <li className="white o2 B" id='B' onClick={()=>{this.notePlayed()}}><p>B{this.#octave + 1}</p></li>
                <li className="white o2 C1" id='C' onClick={()=>{this.notePlayed()}}><p>C{this.#octave + 1}</p></li>
            </ul>
           
            {
            
                document.addEventListener('keydown', (event) => {
                     const keyName = event.key;
                     switch(keyName){
                         case 'z':
                          
                            this.playNote('down','C')
                            this.pressedKeys[keyName] = true;
                            break;
                             
                        case 'b':
                            sinte.playNote(this.notes.D6)
                            this.pressedKeys[keyName] = true;
                            break;
                          
                     }
             
                 }
                )

            
            }

            {
                document.addEventListener('keyup', (event) =>{
                    delete this.pressedKeys[event.key]
                    if(this.noNotePress(this.pressedKeys)){
                        sinte.keyUp()

                    }
                })
            }

            </div>
        )
    }
}

export default Piano;