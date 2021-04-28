import React from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import {sinte} from '../osc-components';


class TableUI extends React.Component{
    constructor(){
        super();
        this.state = {
            metadata: {},
            data: false
        }
       
    }
 
    
    async componentDidMount(){
        const metadata = await sinte.fetchThings('metadata')
        this.setState({metadata: metadata , data: true});
        
    }

    render(){
        return(
            <Paper className='soundTable' style={{width: '100%' , marginTop:'1%', marginBottom: '1%'}}>
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
                   
                    console.log( this.state.metadata)}
                    {
                         this.state.data ? (
                            
                            this.state.metadata.forEach(row => {
                                console.log(row.name);
                                return (
                                    <TableRow>
                                            <TableCell
                                            
                                           
                                            >
                                            <p>HOLA</p>
                                        </TableCell>
                                        <TableCell
                                            key='description'
                                            align= 'center'
                                        
                                        >
                                            <p>{row.description}</p>
                                        </TableCell>
                                        <TableCell
                                            key='category'
                                            align= 'center'
                                        
                                        >
                                            <p>{row.category}</p>
                                        </TableCell>
                                        <TableCell
                                            key='valoration'
                                            align= 'center'
                                        
                                        >
                                            <p>{row.vaLue}</p>
                                        </TableCell>
                       
                                    </TableRow>
                                )
                            }
                        )
                        ): (
                            console.log('ER')
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