import  React from 'react';
import { sinte } from './osc-components';
import $ from 'jquery';
class Analyser extends React.Component{
    constructor(){
        super();
        this.state = {}
        //Para que se llame la función draw
        this.draw = this.draw.bind(this)
      
        
    }
    componentDidMount(){
        document.querySelector('canvas').click()
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
        var width = ( this.state.width/ bufferSize )  *2.5;
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
    render(){
        
        return(
            <div id='canva-cont' style={{rotate: '45deg' }}>

            <canvas id='canva' onClick={(e)=>this.createCanva(e)}  style={{width: '50%', height: '100%' }}>
                Alterantive
                
            </canvas>
            
            </div>
            
        )
       
    }
}

export default Analyser;