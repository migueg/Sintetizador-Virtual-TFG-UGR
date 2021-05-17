import  React from 'react';
import {sinte} from './osc-components';
import $ from 'jquery';


import 'bootstrap/dist/css/bootstrap.css';
import '../css/piano.css';


/**
 * La clase piano contiene el componente de la interfaz que simula
 * un piano real, de manera que el usuario pueda repodrucir sonidos 
 * clicando en este.
 *
 * @class Piano
 * @constructor
 */

/**
 * Octava en la que se encuentra el piano
 * 
 * @property #octave 
 * @type String
 * @private
 */

/**
 * Lista de las teclas presionadas por el usuario
 * 
 * @property pressedKeys 
 * @type JSON
 * 
 */

/**
 * Lista con las notas y sus frecuencias
 * 
 * @property notes 
 * @type JSON
 * 
 */

class Piano extends React.Component{
    #octave
    constructor(){
        super();
        this.#octave = 0;
        this.pressedKeys = {}
        this.notes = this.fetchNotes();

        
    }
    //METODOS PRIVADOS 

    /**
     * Método que se encarga de identificar que nota ha sido accionada por el usuario
     * y una vez identificada, mandarla al controlador para que se reproduzca.
     * 
     * @method playNote
     * @param {String} oct Inidica si la nota es de la octava de arriba o de abajo del piano
     * @param {String} key Nota presionada
     * @private
     */
      __playNote(oct , key){
        var octave;
        if(oct === 'down' || oct=== 'up'){
            
            if(oct === 'down'){
                
                 octave = this.#octave + 1;
                
                if(octave === 7 ){
                    octave = 6;
                }
            }
    
            if(oct === 'up'){
                 octave = this.#octave + 2
               
                    if(octave === 8){
                        octave = 7;
                    }
            }
    
            key = key + octave 
            
            sinte.playNote(this.notes[key])
      
            
        }
        
    }

    componentDidMount(){
        document.getElementById('up').click()

    }
    //MÉTODOS PUBLICOS

    /**
     * Método que realiza una petición a la base de datos para obtener un listado
     * de las notas con sus frecuencias. Este listado lo almacena en una variable de clase
     * @method fetchNotes
     */

    fetchNotes(){
        fetch('http://localhost:8080/notes')
        .then(res => res.json())
        .then((data) => {
            this.notes = data.notes[0];
        })
        .catch(function(error){
            throw error;
        })
        
    }

  
    /**
     * Este método cambia el número de la octava que aparece junto a cada nota
     * en el piano.
     * @method changeHtmlNotes 
     * 
     */
    changeHtmlNotes(){
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
    /**
     * Cuando el usuario pulsa en el botón de subir octava, se llama a este método
     * para que actualice la octava de las notas.
     * @method upOctave
     */
    upOctave(){
        if(this.#octave === 6){
            this.#octave = 6;
        }else{
            this.#octave += 2;
        }
   
        sinte.setOctave(this.#octave)
        this.changeHtmlNotes();
     
    }

    /**
     * Cuando el usuario pulsa en el botón de bajar octava, se llama a este método
     * para que actualice la octava de las notas.
     * @method downOctave
     */
    downOctave(){
        if(this.#octave === 0){
            this.#octave = 0;
        }else{
            this.#octave -= 2;
        }
        sinte.setOctave(this.#octave)

        this.changeHtmlNotes();
    }

   /**
    * Método que recibe como argumento el evento que se produce cuando el usuario clica en una
    * nota del piano y que se encarga de identificar esta nota e indicarsela al método que se encarga de 
    * enviarsela al controlador 
    * 
    * @method notePlayed
    * @param {Event} e Evento que se corresponde con el click en una nota
    */
    notePlayed(e){
        e = e || window.event;
        e = e.target || e.srcElement; // obtenemos el elemento que lanzo el evento

    
       if(e.nodeName === 'LI'){
            //(e.textContent)
            var key;
            if(e.className !== "white" && e.className !== "black" ){
                
                
                 key =  e.id.split("1") 
                
                
                this.__playNote('up', key[0]);

            }else{
               
     
                 key =  e.id 
            
                this.__playNote('down', key);
            }
            
       }
    }
    
   /**
    * Método que se llama cuando el usuario presiona una de tecla del teclado asiganada a una
    * nota del piano y que se encarga de identificar esta nota para simular que se clica en ella 
    * e indicarsela al método que se encarga de enviarsela al controlador 
    * 
    * @method notePlayed
    * @param {String} type Tipo de la not, si es negra o blanca
    * @param {String} note Nota presionada
    * @param {Char} keyname Tecla presionada
    * @param {String} octave  Octava del piano de la nota presionada
    */
   
    handleKeydownEvent(type,note,keyname,octave){
        var aux = note
        if(octave === 'up'){
            aux = note + '1';
        }
            //Se activa el elemento HTML de la nota para emular que se ha pulsado una nota
            if(type === 'white'){  
                document.getElementById(aux).classList.toggle('white-active');
 
            }

            if(type === 'black'){
                document.getElementById(aux).classList.toggle('black-active');
            }
        
            this.__playNote(octave,note)
            this.pressedKeys[keyname] = true;
    }
   
   /**
    * Método que devuelve el código necesario para renderizar el componente
    * 
    * @method render
    * @returns Código html del componente piano y escuchadores de eventos
    */

    render(){
        return(
        <div className="piano-container">
           
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
              /**
               * Se acciona cada vez que se pulsa una tecla del teclado
               * 
               * @event keydown
               */
                document.addEventListener('keydown', (event) => {
                     const keyName = event.key;
                     
                     switch(keyName.toLowerCase()){
                         case 'z':
                            if(!this.pressedKeys['z'])
                                this.handleKeydownEvent('white','C',keyName,'down');
                            break;
                        case 's':
                            if(!this.pressedKeys['s'])
                                this.handleKeydownEvent('black','C#',keyName,'down');
                            break;
                        case 'x':
                            if(!this.pressedKeys['x'])
                                this.handleKeydownEvent('white','D',keyName,'down');
                            break;
                        case 'd':
                            if(!this.pressedKeys['d'])
                                this.handleKeydownEvent('black','D#',keyName,'down');
                            break;
                        case 'c':
                            if(!this.pressedKeys['c'])
                                this.handleKeydownEvent('white','E',keyName,'down');
                            break;
                        case 'v':
                            if(!this.pressedKeys['v'])
                                this.handleKeydownEvent('white','F',keyName,'down');
                            break;
                        case 'g':
                            if(!this.pressedKeys['g'])
                                this.handleKeydownEvent('black','F#',keyName,'down');
                            break;
                        case 'b':
                            if(!this.pressedKeys['b'])
                                this.handleKeydownEvent('white','G',keyName,'down');
                            break;
                        case 'h':
                            if(!this.pressedKeys['h'])
                                this.handleKeydownEvent('black','G#',keyName,'down');
                            break;
                        case 'n':
                            if(!this.pressedKeys['n'])
                                this.handleKeydownEvent('white','A',keyName,'down');
                            break;
                        case 'j':
                            if(!this.pressedKeys['j'])
                                this.handleKeydownEvent('black','A#',keyName,'down');
                            break;
                        case 'm':
                            if(!this.pressedKeys['m'])
                                this.handleKeydownEvent('white','B',keyName,'down');
                            break;
                         case 'q':
                            if(!this.pressedKeys['q'])
                                this.handleKeydownEvent('white','C',keyName,'up');
                            break;
                        case '2':
                            if(!this.pressedKeys['2'])
                                this.handleKeydownEvent('black','C#',keyName,'up');
                            break;
                        case 'w':
                            if(!this.pressedKeys['w'])
                                this.handleKeydownEvent('white','D',keyName,'up');
                            break;
                        case '3':
                            if(!this.pressedKeys['3'])
                                this.handleKeydownEvent('black','D#',keyName,'up');
                            break;
                        case 'e':
                            if(!this.pressedKeys['e'])
                                this.handleKeydownEvent('white','E',keyName,'up');
                            break;
                        case 'r':
                            if(!this.pressedKeys['r'])
                                this.handleKeydownEvent('white','F',keyName,'up');
                            break;
                        case '5':
                            if(!this.pressedKeys['5'])
                                this.handleKeydownEvent('black','F#',keyName,'up');
                            break;
                        case 't':
                            if(!this.pressedKeys['t'])
                                this.handleKeydownEvent('white','G',keyName,'up');
                            break;
                        case '6':
                            if(!this.pressedKeys['6'])
                                this.handleKeydownEvent('black','G#',keyName,'up');
                            break;
                        case 'y':
                            if(!this.pressedKeys['y'])
                                this.handleKeydownEvent('white','A',keyName,'up');
                            break;
                        case '7':
                            if(!this.pressedKeys['d'])
                                this.handleKeydownEvent('black','A#',keyName,'up');
                            break;
                        case 'u':
                            if(!this.pressedKeys['u'])
                                this.handleKeydownEvent('white','B',keyName,'up');
                            break;
                        default:
                            break;
                         
                     }
                    
                 }
                )

            
            }

            {
              /**
               * Se acciona cuando se levanta una tecla del teclado presionada
               * 
               * @event keyup
               */
                document.addEventListener('keyup', (event) =>{
                    delete this.pressedKeys[event.key]
                   

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
                        default:
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


/**
 * Proporciona la interfaz correspondiente a el piano
 * 
 * @module Piano
 */

export default Piano;