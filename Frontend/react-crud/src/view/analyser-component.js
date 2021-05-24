import  React from 'react';
import { sinte } from './osc-components';
import '../css/analyser.css';
import $ from 'jquery';
class Analyser extends React.Component{
    constructor(){
        super();
        this.state = {}
        //Para que se llame la función draw
        this.draw = this.draw.bind(this)
        this.state.separation= sinte.getThingsAnalyser('separation')
        console.log( this.state.separation)
    }
    componentDidMount(){
        document.querySelector('canvas').click()
    }

    componentDidUpdate(){
        this.translateCanva()
    }
    createCanva(event){
        //event.target.clie
        
        this.state.canva=  document.querySelector('canvas');
        console.log()

        
        this.state.ctx = this.state.canva.getContext('2d');
        this.state.bufferSize = sinte.getThingsAnalyser('size');
      
        this.translateCanva()
        this.draw()
        
    }
     
   
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

    detectFreq(event){
        document.getElementById('freq-indicator').style.display = '';

        document.getElementById('canva-cont').style.cursor = 'crosshair'
        var x = event.pageX - $('#canva-cont').offset().left;
        var y =  event.pageY - $('#canva-cont').offset().top;
      
        var offset =   (this.state.separation/ (( this.state.width/ this.state.bufferSize )  *2.5))//Relacion de frecuencias por cada pixels

        if( x >= 0){
            var freq =  x *  offset//divido lo que ocupa cada casilla
            var div = document.getElementById('freq-indicator')
            div.innerText = freq + 'hz';
            $('#freq-indicator').css("transform","translate3d("+x+"px,"+y+"px,0px)")
        }else{
            this.hideIndicator()
        }
        
    }
    draw(){
        //console.log('AQUI')
        //window.setTimeout(this.draw, 2000 )
        //thi s.setState({update:true})
        var d  = window.requestAnimationFrame(this.draw)

        //
        //this.translateCanva()
        this.state.ctx.clearRect(0,0, this.state.width, this.state.height)

        var bufferSize = this.state.bufferSize;

        //Calculamos el ancho  de la barra que se va a puntar
        var width = ( this.state.width/ bufferSize )  *2.5 ;
        var heigth;
        var x = 0;
        var data = sinte.getThingsAnalyser('data');
        //console.log(data)
     
        for(var i = 0; i < bufferSize; i++){
            heigth = data[i]/2
            if(data[i] <= 210){
                this.state.ctx.fillStyle = 'rgb(' + (heigth+20) + ',172,46)';

            }else if (data[i] > 85 && data[i] <= 240){
                this.state.ctx.fillStyle = 'rgb(' + (heigth+192) + ',174,114)';

            }else{
                this.state.ctx.fillStyle = 'rgb(' + (heigth+100) + ',50,50)';

            }
            //this.state.ctx.fillStyle = 'rgb(200,0,200)'
             //thi s.state.ctx.fillRect(x,this.state.height,width,heigth);
           
             this.state.ctx.fillRect(x,0,width, heigth);
            x  += width + 1;
            

        }   


    

    }

    hideIndicator(){
        document.getElementById('freq-indicator').style.display = 'none';
    }
    render(){
        
        return(
            <div>

            <div onMouseLeave={()=>{this.hideIndicator()}} onMouseMove={(event)=>this.detectFreq(event)} id='canva-cont' style={{width: '50%', height: '100%' }} >
            <div className='freqs'>
                <p id='0k'>200hz</p>
                <p id='1k'>10khz</p>
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
            </div>

        )
       
    }
}

export default Analyser;