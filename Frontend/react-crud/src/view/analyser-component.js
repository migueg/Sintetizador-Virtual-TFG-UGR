import  React from 'react';
import { sinte } from './osc-components';

class Analyser extends React.Component{
    constructor(){
        super();
        this.state = {}
        //Para que se llame la función draw
        this.draw = this.draw.bind(this)
        
    }
    componentDidMount(){
        this.createCanva()
        this.draw()

    }

    createCanva(){
        this.state.canva=  document.querySelector('canvas');
        this.state.ctx = this.state.canva.getContext('2d');
        this.state.width = this.state.canva.width;
        this.state.height = this.state.canva.width;
        this.state.bufferSize = sinte.getThingsAnalyser('size');
        this.state.ctx.clearRect(0,0, this.state.width,this.state.height)
    }

    draw(){
        //console.log('AQUI')
        //window.setTimeout(this.draw, 2000 )

        var draw = window.requestAnimationFrame(this.draw)
        this.state.ctx.fillStyle = 'rgb(0,0,0)';
        this.state.ctx.clearRect(0,0,this.state.canva.width,this.state.canva.height)

        var bufferSize = this.state.bufferSize;

        //Calculamos el ancho de la barra que se va a puntar
        var width = (this.state.width / bufferSize )  *2.5;
        var heigth;
        var x = 0;
        var data = sinte.getThingsAnalyser('data');
        //console.log(data)
     
        for(var i = 0; i < bufferSize; i++){
            heigth = data[i]/2
            this.state.ctx.fillStyle = 'rgb(200,0,200)'
             //this.state.ctx.fillStyle = 'rgb(' + (heigth+100) + ',50,50)';
             //this.state.ctx.fillRect(x,this.state.height,width,heigth);
            this.state.ctx.fillRect(10, 10, 100, heigth);
            x  += width + 1;
        }   


        

    }
    render(){
        return(
            <canvas style={{width: '50%', height: '100%' }}>
                Alterantive
            </canvas>
        )
       
    }
}

export default Analyser;