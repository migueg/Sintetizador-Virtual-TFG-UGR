import  React from 'react';
import {sinte} from './osc-components';
import $ from 'jquery';
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
            this.notes = data.notes[0];
        })
        .catch(console.log)
        
    }
    noNotePress(obj){
        return Object.keys(obj).length === 0;
    }

    //Cambia el nombre de las notas en la interfaz
    changeHtmlNotes(option){
        var that  =this;
        $("ul li").each(function() {
            var note = $(this).text();

            //Sacamos el nombre de la nota sin el numero de octava
            if(note.length === 2){
                note = note[0];
            }else if(note.length === 3){
                note = note[0] + note[1];
            }

            var octUp = false;

            //Se hace esta comprobacion para ver si la nota que hay que
            //cambiar es de la segunda octava
            if($(this).attr('class').split('o2').length > 1){
                octUp = true;
            }
           
        
            if(octUp){
                var aux = that.#octave + 1;
                note = note + aux;
                
            }else{
                note = note + that.#octave ;
                
            }
                
           // console.log( $(this).children())

            $(this).children().text(note);
        })
    }
    upOctave(){
        if(this.#octave === 6){
            this.#octave = 6;
        }else{
            this.#octave += 2;
        }
        
        this.changeHtmlNotes('up');
     
    }

    downOctave(){
        if(this.#octave === 0){
            this.#octave = 0;
        }else{
            this.#octave -= 2;
        }

        this.changeHtmlNotes('down');
    }

    playNote(oct , key){
        if(oct === 'down' || oct=== 'up'){
            
            if(oct === 'down'){
                
                var octave = this.#octave + 1;
                
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
                
                
                var key =  e.id.split("1") 
                
                
                this.playNote('up', key[0]);

            }else{
               
     
                var key =  e.id 
            
                this.playNote('down', key);
            }
            
       }
    }
    
    handleNotesUpEvents(type,note,keyname,octave){
        var aux = note
        if(octave === 'up'){
            aux = note + '1';
        }
            if(type === 'white'){  
                document.getElementById(aux).classList.toggle('white-active');
 
            }

            if(type === 'black'){
                document.getElementById(aux).classList.toggle('black-active');
            }
        
            this.playNote(octave,note)
            this.pressedKeys[keyname] = true;
    }

    render(){
        return(
        <div className="piano">
           
            <ul className="notes">
                <div className="octaves">
                    <button id='down' onClick={()=>{this.downOctave()}} >Down</button>
                    <button id='up' onClick={()=>{this.upOctave()}}>UP</button>
                </div>
                <li className="white" id="C" name = "first" onClick={()=>{this.notePlayed()}}><p>C1</p></li>
                <li className="black" id="C#"onClick={()=>{this.notePlayed()}}><p>C#1</p></li>
                <li className="white" id='D'onClick={()=>{this.notePlayed()}}><p>D1</p></li>
                <li className="black" id="D#"onClick={()=>{this.notePlayed()}}><p>D#1</p></li>
                <li className="white" id='E'onClick={()=>{this.notePlayed()}}><p>E1</p></li>
                <li className="white" id='F'onClick={()=>{this.notePlayed()}}><p>F1</p></li>
                <li className="black" id='F#'onClick={()=>{this.notePlayed()}}><p>F#1</p></li>
                <li className="white" id='G'onClick={()=>{this.notePlayed()}}><p>G1</p></li>
                <li className="black" id='G#'onClick={()=>{this.notePlayed()}}><p>G#1</p></li>
                <li className="white" id='A'onClick={()=>{this.notePlayed()}}><p>A1</p></li>
                <li className="black" id='A#'onClick={()=>{this.notePlayed()}}><p>A#1</p></li>
                <li className="white" id='B'onClick={()=>{this.notePlayed()}}><p>B1</p></li>
                <li className="white o2 C" id='C1'onClick={()=>{this.notePlayed()}}><p>C2</p></li>
                <li className="black o2 CS" id="C#1"onClick={()=>{this.notePlayed()}}><p>C#2</p></li>
                <li className="white o2 D" id='D1'onClick={()=>{this.notePlayed()}}><p>D2</p></li>
                <li className="black o2 DS" id="D#1"onClick={()=>{this.notePlayed()}}><p>D#2</p></li>
                <li className="white o2 E" id='E1'onClick={()=>{this.notePlayed()}}><p>E2</p></li>
                <li className="white o2 F" id='F1'onClick={()=>{this.notePlayed()}}><p>F2</p></li>
                <li className="black o2 FS" id='F#1' onClick={()=>{this.notePlayed()}}><p>F#2</p></li>
                <li className="white o2 G" id='G1' onClick={()=>{this.notePlayed()}}><p>G2</p></li>
                <li className="black o2 GS" id='G#1' onClick={()=>{this.notePlayed()}}><p>G#2</p></li>
                <li className="white o2 A" id='A1' onClick={()=>{this.notePlayed()}}><p>A2</p></li>
                <li className="black o2 AS" id='A#1' onClick={()=>{this.notePlayed()}}><p>A#2</p></li>
                <li className="white o2 B" id='B1' onClick={()=>{this.notePlayed()}}><p>B2</p></li>
               
            </ul>
            
            {
            
                document.addEventListener('keydown', (event) => {
                     const keyName = event.key;
                     
                     switch(keyName.toLowerCase()){
                         case 'z':
                            this.handleNotesUpEvents('white','C',keyName,'down');
                            break;
                        case 's':
                            this.handleNotesUpEvents('black','C#',keyName,'down');
                            break;
                        case 'x':
                            this.handleNotesUpEvents('white','D',keyName,'down');
                            break;
                        case 'd':
                            this.handleNotesUpEvents('black','D#',keyName,'down');
                            break;
                        case 'c':
                            this.handleNotesUpEvents('white','E',keyName,'down');
                            break;
                        case 'v':
                            this.handleNotesUpEvents('white','F',keyName,'down');
                            break;
                        case 'g':
                            this.handleNotesUpEvents('black','F#',keyName,'down');
                            break;
                        case 'b':
                            this.handleNotesUpEvents('white','G',keyName,'down');
                            break;
                        case 'h':
                            this.handleNotesUpEvents('black','G#',keyName,'down');
                            break;
                        case 'n':
                            this.handleNotesUpEvents('white','A',keyName,'down');
                            break;
                        case 'j':
                            this.handleNotesUpEvents('black','A#',keyName,'down');
                            break;
                        case 'm':
                            this.handleNotesUpEvents('white','B',keyName,'down');
                            break;
                         case 'q':
                            this.handleNotesUpEvents('white','C',keyName,'up');
                            break;
                        case '2':
                            this.handleNotesUpEvents('black','C#',keyName,'up');
                            break;
                        case 'w':
                            this.handleNotesUpEvents('white','D',keyName,'up');
                            break;
                        case '3':
                            this.handleNotesUpEvents('black','D#',keyName,'up');
                            break;
                        case 'e':
                            this.handleNotesUpEvents('white','E',keyName,'up');
                            break;
                        case 'r':
                            this.handleNotesUpEvents('white','F',keyName,'up');
                            break;
                        case '5':
                            this.handleNotesUpEvents('black','F#',keyName,'up');
                            break;
                        case 't':
                            this.handleNotesUpEvents('white','G',keyName,'up');
                            break;
                        case '6':
                            this.handleNotesUpEvents('black','G#',keyName,'up');
                            break;
                        case 'y':
                            this.handleNotesUpEvents('white','A',keyName,'up');
                            break;
                        case '7':
                            this.handleNotesUpEvents('black','A#',keyName,'up');
                            break;
                        case 'u':
                            this.handleNotesUpEvents('white','B',keyName,'up');
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

                    switch(event.key){
                        case 'z':
                            $('#C').removeClass('white-active');
                            break;
                        case 's':
                            document.getElementById('C#').classList.remove('black-active');
                            break;
                        case 'x':
                            $('#D').removeClass('white-active');
                            break;
                        case 'd':
                            document.getElementById('D#').classList.remove('black-active');
                            break;
                        case 'c':
                            $('#E').removeClass('white-active');
                            break;
                        case 'v':
                            $('#F').removeClass('white-active');
                            break;
                        case 'g':
                            document.getElementById('F#').classList.remove('black-active');
                            break;
                        case 'b':
                            $('#G').removeClass('white-active');
                            break;
                        case 'h':
                            document.getElementById('G#').classList.remove('black-active');
                            break;
                        case 'n':
                            $('#A').removeClass('white-active');
                            break;
                        case 'j':
                            document.getElementById('A#').classList.remove('black-active');
                            break;
                        case 'm':
                            $('#B').removeClass('white-active');
                            break;
                        case 'q':
                            $('#C1').removeClass('white-active');
                            break;
                        case '2':
                            document.getElementById('C#1').classList.remove('black-active');
                            break;
                        case 'w':
                            $('#D1').removeClass('white-active');
                            break;
                        case '3':
                            document.getElementById('D#1').classList.remove('black-active');
                            break;
                        case 'e':
                            $('#E1').removeClass('white-active');
                            break;
                        case 'r':
                            $('#F1').removeClass('white-active');
                            break;
                        case '5':
                            document.getElementById('F#1').classList.remove('black-active');
                            break;
                        case 't':
                            $('#G1').removeClass('white-active');
                            break;
                        case '6':
                            document.getElementById('G#1').classList.remove('black-active');
                            break;
                        case 'y':
                            $('#A1').removeClass('white-active');
                            break;
                        case '7':
                            document.getElementById('A#1').classList.remove('black-active');
                            break;
                        case 'u':
                            $('#B1').removeClass('white-active');
                            break;
                    }
                })
            }

            {
            
            }
            </div>
        )
    }
}

export default Piano;