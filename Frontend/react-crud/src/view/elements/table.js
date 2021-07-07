import React from 'react';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';


import  $ from 'jquery';
import {Row} from 'react-bootstrap'

import filtrar from '../../img/filtrar.png'
import search from '../../img/search.png'
import {sinte} from '../osc-components';
import Rating from './rating';
import ModalLoad from '../elements/modals/modal-load';
import ModalDelete from '../elements/modals/modal-delete';


/**
 * Representa el componente para la tabla de sonidos
 * 
 * @class TableUI
 * @constructor
 */
class TableUI extends React.Component{
    constructor(){
        super();
        
        /**
         * @property state
         * @type Object
         */
            this.state = {
            metadata: {},
            categories: [],
            data: false,
            collapse: false,
            rating: 3
        }
        this.modalRef = React.createRef();
        this.modalDeleteRef = React.createRef();
        this.newState = {};
       
    }

    /**
     * Colapsa la zona de filtros
     * 
     * @method collapse
     */
   collapse(){
        if(this.state.collapse){
            $('.collapse').slideUp()
            this.state.collapse = false
        }else{
            $('.collapse').slideDown()
            this.state.collapse = true 
        }
   }

   /**
    * Filtra por rango
    * 
    * @method checkRange
    * @param {string} range Rango
    * @param {Float} rating Valoración 
    * @param {Float} ratingfilter Filtro de valoración
    * @returns Boolean
    * @private
    */
    __checkRange(range,rating,ratingfilter){
        var show = false;
        switch(range){
            case '=':
                if( rating.toUpperCase().indexOf(ratingfilter.toString()) > -1){
                    show = true;
                }else{
                    show = false
                }
                break;
            case '>':
                if( rating > ratingfilter){
                    show = true;
                }else{
                    show = false
                }
                break;
            case '<':
                if( rating < ratingfilter){
                    show = true;
                }else{
                    show = false
                }
                break;
            default:
                show= false;
                break;
            }

        return show;
   }
   /**
    * Filtra la tabla
    * 
    * @method filterTable
    * @param {string} name 
    * @param {string} toSearch 
    * @param {string} category 
    * @param {string} filter 
    * @param {string} rating 
    * @param {Object} tr 
    * @param {string} range 
    */
   filterTable(name,toSearch,category,filter,rating, tr,range){
       var ratingfilter = $('#rating').val();
       
        var show = false
        if(name){
            if( name.toUpperCase().indexOf(toSearch) > -1 && category.toUpperCase().indexOf(filter) > -1 ){
                
                show = this.__checkRange(range,rating,ratingfilter)
            }else{
                show = false;
            }    
        }else{
            if( category.toUpperCase().indexOf(filter) > -1 ){
                show = this.__checkRange(range,rating,ratingfilter)
            
            }else{
                show = false
            }
            
        }

        if(show){
            tr.style.display = "";
        }else{
            tr.style.display = "none";
        }
      
   }

   /**
    * Busca un elemento en la tabla
    * 
    * @method searchInTable
    */
   searchInTable(){
        var  td,name,category,rating;
        var table = document.getElementById('tableBody')
        var toSearch = document.getElementById('toSearch').value.toUpperCase();
        var tr = table.getElementsByTagName('tr')
        var withFilters = document.getElementById('flexCheckChecked').checked;

        var range = $('#rangeRating').val();
        var categoryFilter = $('#categoryFilter option:selected').text();

        for(var i = 0; i < tr.length; i++){
            td = tr[i].getElementsByTagName('td');
            name = td[1]
            category = td[3]
            rating = td[4].getElementsByTagName('p')[0]
            
            if(category && rating && name){
                name = name.textContent || name.innerText;
                if(withFilters){
                    category = category.textContent || category.innerText;
                    rating = rating.textContent || rating.innerText;
                    if(toSearch){
                        
                    
                  
                        this.filterTable(name,toSearch,category, categoryFilter,rating,tr[i], range)
                    }else{
                        this.filterTable('',toSearch,category, categoryFilter,rating,tr[i], range)
                    }
                    
                    

                }else{
                    if(name){
                        if(name.toUpperCase().indexOf(toSearch) > -1 ){
                            tr[i].style.display = "";
                        }else{
                            tr[i].style.display = "none";
                        }
                    }else{
                        tr[i].style.display = "";
                    }
                    
                }
                
            }
        }
   }

   /**
    * Actualiza el contenido de la tabla
    * 
    * @method updateTable
    * @async
    */
    async updateTable(){
        const metadata = await sinte.fetchThings('metadata');
        if(metadata){
            this.setState({metadata: metadata , data: true});

        }else{
            this.setState({ data: false});

        }
       
    }

    /**
     * Método que se ejecuta antes de renderizar el componente. Actauliza la tabla
     * y obtiene las notas
     * 
     * @method componentDidMount
     * @async
     */
    async componentDidMount(){
        
        await this.updateTable();
        const categories = await sinte.fetchThings('categories');
        this.setState({categories: categories})
    }

    /**
     * Manda un mensajae a la fachada para cargar un sonido
     * 
     * @method loadSound
     * @returns {Object} respuesta
     * @async
     */
    async loadSound(){

        const state = await sinte.load(this.modalRef.current.id);
        this.newState = state;
        var resp = this.props.parentCallback() //envio el nuevo estado al padre

        return resp;
    }

    /**
     * Manda un mensajae a la fachada para eliminar un sonido
     * 
     * @method deleteSound
     * @returns {Object} respuesta
     * @async
     */
    async deleteSound(){
        const state = await sinte.delete(this.modalDeleteRef.current.id);
        return state;
    }

    /**
     * Manda la orden para enseñar un modal 
     * 
     * @method showModal
     * @param {String} id 
     */
    showModal(id){
        this.modalRef.current.show(id)
    }

    /**
     * Manda la orden para enseñar un modal 
     * 
     * @method showModalDelete
     * @param {String} id 
     */
    showModalDelete(id){

        this.modalDeleteRef.current.show(id)
    }

    /**
     * Método que devuelve el componente TableUI para ser renderizado
     * 
     * @method render
     * @return Código html del componente Distorsion
     * 
     */
    render(){
        if(this.state)
        return(
            <Paper className='soundTable' style={{width: '100%' , marginTop:'1%', marginBottom: '1%'}}>
                <ModalLoad ref={this.modalRef} parentCallback={()=>this.loadSound()}/>
                <ModalDelete ref={this.modalDeleteRef} parentCallback2={()=>this.deleteSound()}/>
                <Row style={{width: '100%'}}>
                    <div id='searchBar' style={{width: '100%'}}>
                        <img alt='search-icon' src={search} style={{width: '5vh', marginLeft: '3%',  marginTop: '1%',float: 'left'}}></img>
                        <input type="text" id='toSearch' onKeyUp={()=>this.searchInTable() }  placeholder='Introduce tu búsqueda aqui' style={{float: 'left', marginLeft: '2%',marginBottom: '1%', marginTop: '2%', width: '75%'}}></input>
                        <Tooltip title='Filtros'>
                           
                                <img alt='filter-icon' src={filtrar} onClick={()=>this.collapse()}  data-bs-toggle='collapse' href="#collapseExample"
                                    role="button" aria-expanded="false" aria-controls="collapseExample" 
                                        style={{width: '3vh' , float:'left', marginLeft: '2%', marginTop: '2%'}}/>
                           
                        </Tooltip>
                    </div>
                </Row>
                    <div className="collapse" id="collapseExample" style={{width: '100%'}}>
                        <div className="card card-body" style={{width: '100%'}}>
                        <Row style={{width: '100%', marginLeft: 0, marginRight: 0}}>

                           
                                <label className='col-form-label' htmlFor='recipient-name'>Categoría: </label>
                                <select className="form-select" id='categoryFilter' onClick={()=>this.searchInTable()} style={{marginLeft: '1%' ,marginRight: '1%'}}>
                                        {
                                            this.state.categories.map(function(category,index){
                                                return <option key={index} value={index}>{category}</option>
                                            })
                                        }
                                </select>
                                <label className='col-form-label' htmlFor='recipient-name'>Valoración: </label>
                                
                                <select id='rangeRating' className="form-select"style={{marginLeft: '3%'}} onClick={()=>this.searchInTable()}>
                                    <option value='='>Igual</option>
                                    <option value='>'>Mayor</option>
                                    <option value='<'>Menor</option>
                                </select>

                                <select id='rating' className="form-select"style={{marginLeft: '3%'}}  onClick={()=>this.searchInTable()} style={{marginLeft: '1%' ,marginRight: '10%'}}>
                                    <option value='3'>3</option>
                                    <option value='0'> 0</option>
                                    <option value='0.5'>0.5</option>
                                    <option value='1'>1</option>
                                    <option value='1.5'>1.5</option>
                                    <option value='2'>2</option>
                                    <option value='2.5'>2.5</option>
                                    <option value='3.5'>3.5</option>
                                    <option value='4'>4</option>
                                    <option value='4.5'>4.5</option>
                                    <option value='5'>5</option>

                                </select>
                                
                               
                           
                                
                                <div className="form-check" id='apply' style={{display: 'flex',float: 'right'}}>
                                    <div  style={{ float:'left', marginTop: '0.5%'}} >
                                    <input className="toggle-switch-checkbox" onClick={()=>this.searchInTable()}type="checkbox" value="" id="flexCheckChecked" />

                                    </div>
                                    <div style={{float: 'right' , marginLeft:'20%'}} >
                                        <p className="form-check-label" htmlFor="flexCheckChecked" >
                                        Aplicar 
                                        </p>
                                    </div>
                                    
                                </div>
                            </Row>
                        </div>
                    </div>
                    
                    
               
                <TableContainer className='' style={{height: '50vh', width: '100%'}}>
                <Table stickyHeader aria-label="sticky table" style={{width: '100%'}}>
                <TableHead>
                    <TableRow style={{width:'100%'}}>
                        <TableCell>

                        </TableCell>
                        <TableCell
                            key='name'
                            align= 'center'
                            style={{minWidth: '20%'}}
                        >
                            <h4>Nombre</h4>
                        </TableCell>
                        <TableCell
                            key='description'
                            align= 'center'
                            style={{minWidth: '35%'}}
                        >
                            <h4>Descripción</h4>
                        </TableCell>
                        <TableCell
                            key='valoration'
                            align= 'center'
                            style={{minWidth: '20%'}}
                        >
                            <h4>Categoría</h4>
                        </TableCell>
                        <TableCell
                            key='rating'
                            align= 'center'
                            style={{minWidth: '20%' }}
                        >
                            <h4 >Valoración</h4>
                        </TableCell>
                       
                        
                    </TableRow>
                </TableHead>
                <TableBody id='tableBody'>
                    {
                         this.state.data ? (
                        
                            this.state.metadata.map((row) => {
                              
                                return (
                                    <TableRow key={row.name}>
                                        <TableCell align='center'> 
                                            <button type='button' onClick={()=>this.showModal(row.name)} className='btn btn-success'>Cargar</button>
                                            <button type='button' onClick={()=>this.showModalDelete(row.name)} style={{marginLeft: '1%'}}  className='btn btn-danger'>Eliminar</button>
                                        </TableCell>
                                        <TableCell
                                            align='center'
                                        >
                                            <p>{row.name}</p>
                                        </TableCell>
                                        <TableCell
                                            key='description'
                                            align='center'
                                            style={{maxWidth: '5%'}}
                                        >
                                            <p>{row.description}</p>
                                        </TableCell>
                                        <TableCell
                                            key='category'
                                            align='center'
                                        >
                                            <p>{row.category.category}</p>
                                        </TableCell>
                                        <TableCell
                                            key='valoration'
                                            align='center'
                                        >
                                            <p style={{display: 'none'}}>{row.value}</p>
                                            <Rating value={row.value}/>
                                        </TableCell>
                                    </TableRow>
                                )
                                
                            }
                        )
                        ): (
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell><h4 style={{color: 'red'}}>Parece que tenemos problemas..</h4></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        )
                    }
                   
                </TableBody>
                </Table>   
                </TableContainer>
            </Paper>
        )
    }
}

export default TableUI ;