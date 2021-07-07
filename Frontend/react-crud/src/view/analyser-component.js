import  React from 'react';
import { sinte } from './osc-components';
import '../css/analyser.css';
import $ from 'jquery';

/**
 * La clase Analyser contiene el componente de la interfaz que proporciona los gráficos 
 *
 * @class Anlyser
 * @constructor
 */

class Analyser extends React.Component{
    constructor(){
        super();
        this.state = {}
        //Para que se llame la función draw
        this.draw = this.draw.bind(this)
        this.state.separation= sinte.getThingsAnalyser('separation')
        console.log( this.state.separation)
    }

    /**
     * Método del ciclo de vida de React que se encarga de simular un click
     * 
     * @method componentDidMount
     */
    componentDidMount(){
        document.querySelector('canvas').click()
    }

    /**
     * Método del ciclo de vida de React 
     * 
     * @method componentDidUpdate
     */
    componentDidUpdate(){
        this.translateCanva()
    }

    /**
     * Se encarga de crear el canva
     * 
     * @method createCanva
     * @param {Event} event 
     */
    createCanva(event){
        //event.target.clie
        
        this.state.canva=  document.querySelector('canvas');
        console.log()

        
        this.state.ctx = this.state.canva.getContext('2d');
        this.state.bufferSize = sinte.getThingsAnalyser('size');
      
        this.translateCanva()
        this.draw()
        
    }
     
   /**
     * Se encarga de transladar el canva
     * 
     * @method translateCanva
     */
    translateCanva(){
        
        
        this.state.width = this.state.canva.width;
        this.state.height = this.state.canva.height;

        var centery =  this.state.height/2;
        var centerx =  this.state.width/ 2;
        
        this.state.ctx.translate(centerx, centery);
        this.state.ctx.rotate(180  * Math.PI / 180)

        this.state.ctx.scale(-1,1)
        this.state.ctx.translate(-centerx,-centery)
        
        this.state.ctx.fillStyle = 'rgb(0,0,0)';
        this.state.ctx.clearRect(0,0, this.state.width , this.state.height)
     
    }

    /**
     * Detecta la frecuencia en el gráfico
     * 
     * @method  detectFreq
     * @param {Evento} event 
     */
    detectFreq(event){
        document.getElementById('freq-indicator').style.display = '';

        document.getElementById('canva-cont').style.cursor = 'crosshair'
        var x = event.pageX - $('#canva-cont').offset().left;
        var y =  event.pageY - $('#canva-cont').offset().top;
      
       // var offset =   (this.state.separation/ (( this.state.width/ this.state.bufferSize )  *2.5))//Relacion de frecuencias por cada pixels
        var pixelPerValue = document.querySelector('canvas').width / this.state.bufferSize
        var freqPerPixel = this.state.separation / pixelPerValue
        if( x >= 0){
            var freq = (x * freqPerPixel) / 2.5
           // var freq =  x *  offset//divido lo que ocupa cada casilla
            var div = document.getElementById('freq-indicator')
            div.innerText = freq + 'hz';
            $('#freq-indicator').css("transform","translate3d("+x+"px,"+y+"px,0px)")
        }else{
            this.hideIndicator()
        }
        
    }

    /**
     * Se encarga de dibujar el canva
     * 
     * @method draw
     */
    draw(){

        var d  = window.requestAnimationFrame(this.draw)

        this.state.ctx.clearRect(0,0, this.state.width, this.state.height)

        var bufferSize = this.state.bufferSize;

        //Calculamos el ancho  de la barra que se va a puntar
        var width = ( this.state.width/ bufferSize )  *2.5 ;
        var heigth;
        var x = 0;
        var data = sinte.getThingsAnalyser('data');

        for(var i = 0; i < bufferSize; i++){
            heigth = data[i]/2
            if(data[i] <= 210){
                this.state.ctx.fillStyle = 'rgb(' + (heigth+20) + ',172,46)';

            }else if (data[i] > 85 && data[i] <= 240){
                this.state.ctx.fillStyle = 'rgb(' + (heigth+192) + ',174,114)';

            }else{
                this.state.ctx.fillStyle = 'rgb(' + (heigth+100) + ',50,50)';

            }

             this.state.ctx.fillRect(x,0,width, heigth);
            x  += width + 1;
            

        }   

    }

    hideIndicator(){
        document.getElementById('freq-indicator').style.display = 'none';
    }
    equalize(freq, event){
        var value = event.target.value;
        sinte.equalize(freq,value)
        var parent = event.target.parentElement
        var grandad = parent.parentElement;
        var span = grandad.getElementsByTagName('span')[0];
        span.innerText = value

    }

    /**
     * Método que devuelve el componente Analyser para ser renderizado
     * 
     * @method render
     * @return Código html del componente Analyser
     * 
     */
    render(){
        
        return(
            <div className='cont' >

                <div className='colum' onMouseLeave={()=>{this.hideIndicator()}} onMouseMove={(event)=>this.detectFreq(event)} id='canva-cont' style={{width: '50%', height: '100%',order:1 }} >
                    <div className='freqs'>
                        <p id='0k'>200hz</p>
                        <p id='1k'>12khz</p>
                        <p id='20k'>24khz</p>
                    </div>
                    <div id='freq-indicator' style={{
                        display: 'none',
                        margin: 0, 
                        padding: 5, 
                        backgroundColor: 'whitesmoke',
                        width: '10vh',
                        textAlign: 'center',
                        borderRadius: '60%'}}>

                    </div>
                    
                    <canvas id='canva'  onClick={(e)=>this.createCanva(e)}  style={{width: '100%', height: '100%' }}>
                        Alterantive
                        
                    </canvas>
                    
                </div>
                <div className='colum' id='eq' style={{width: '100%', order:2 }}>
                    
                    <div id='eq-cont'>
                        <h3 style={{order: 1}}>Ecualizador</h3>
                        <div id='sliders' style={{order: 2}}>
                        <div className='section'>
                            <div className="title">LWF</div>
                            <div className='range-slider'>

                                <input className='input-range' aria-orientation='vertical'
                                type='range' step='0.5' defaultValue='0' min='-25' max='25' 
                                onChange={(event)=>this.equalize('lw',event)}
                                />
                             
                            </div>
                            <span className="scope scope-min">0</span>
                            <span className="param">dB</span> 
                        </div>
                         
                        <div className='section'>
                            <div className="title">LWMF</div>
                            <div className='range-slider'>

                                <input className='input-range' aria-orientation='vertical'
                                type='range' step='0.5' defaultValue='0' min='-25' max='25'
                                onChange={(event)=>this.equalize('lwm',event)}
                            />

                            </div>
                            <span className="scope scope-min">0</span>
                            <span className="param">dB</span> 
                        </div>
                        <div className='section'>
                            <div className="title">MF</div>
                            <div className='range-slider'>

                                <input className='input-range' aria-orientation='vertical'
                                type='range' step='0.5' defaultValue='0' min='-25' max='25'
                                onChange={(event)=>this.equalize('mid',event)}

                            />

                            </div>
                            <span className="scope scope-min">0</span>
                            <span className="param">dB</span> 
                        </div>
                        <div className='section'>
                            <div className="title">MHF</div>
                            <div className='range-slider'>

                                <input className='input-range' aria-orientation='vertical'
                                type='range' step='0.5' defaultValue='0' min='-25' max='25'
                                onChange={(event)=>this.equalize('mhg',event)}

                            />

                            </div>
                            <span className="scope scope-min">0</span>
                            <span className="param">dB</span> 
                        </div>
                        <div className='section'>
                            <div className="title">HF</div>
                            <div className='range-slider'>

                                <input className='input-range' aria-orientation='vertical'
                                type='range' step='0.5' defaultValue='0' min='-25' max='25'
                                onChange={(event)=>this.equalize('hg',event)}

                            />

                            </div>
                            <span className="scope scope-min">0</span>
                            <span className="param">dB</span> 
                        </div>
                        </div>
                        
                        </div>





                </div>
            
            </div>

        )
       
    }
}

export default Analyser;