import React from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Rating from './rating';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

import {Row} from 'react-bootstrap'

import filtrar from '../../img/filtrar.png'
import search from '../../img/search.png'
import {sinte} from '../osc-components';


class TableUI extends React.Component{
    constructor(){
        super();
        this.state = {
            metadata: {},
            data: false
        }
       
    }
   
    async updateTable(){
        const metadata = await sinte.fetchThings('metadata')
        this.setState({metadata: metadata , data: true});
       
    }
    async componentDidMount(){
        
        await this.updateTable();
    }

    render(){
        return(
            <Paper className='soundTable' style={{width: '100%' , marginTop:'1%', marginBottom: '1%'}}>
                <Row style={{width: '100%'}}>
                    <div id='searchBar' style={{width: '100%'}}>
                        <img src={search} style={{width: '5vh', marginLeft: '3%',  marginTop: '1%',float: 'left'}}></img>
                        <input type="text" placeholder='Introduce tu búsqueda aqui' style={{float: 'left', marginLeft: '2%', marginTop: '2%', width: '75%'}}></input>
                        
                            <img src={filtrar} style={{width: '3vh'}}></img>
                            <select className="form-select" aria-label="Default select example">
                                
                                <option value="1"></option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        
                    </div>
                </Row>
                <TableContainer className='container' style={{height: '50vh'}}>
                <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        <TableCell
                            key='name'
                            align= 'left'
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
                            style={{minWidth: '20%'}}
                        >
                            <h4>Valoración</h4>
                        </TableCell>
                       
                        
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                         this.state.data ? (
                        
                            this.state.metadata.map((row) => {
                              
                                return (
                                    <TableRow key={row.name}>
                                        <TableCell>
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
                                            align='right'
                                        >
                                            <Rating value={row.value}/>
                                        </TableCell>
                                    </TableRow>
                                )
                                
                            }
                        )
                        ): (
                            this.state.data
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