import axios from 'axios';
import { useEffect, useState } from 'react';
import { Box, Button, IconButton, List, ListItem, ListItemText, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { AgricultureOutlined, Delete, Edit } from '@mui/icons-material';
import { CreateFloats } from './CreateFloats';

export function ManageFloatsList({click, setId}){
    const urlBase = import.meta.env.VITE_URL_BASE + 'floats';
        const[floats, setFloats] = useState([]);
        useEffect(() => {
            loadFloats();
        },[]);
        const loadFloats = async () => {
            const result = await axios.get(urlBase);
            console.log("Result:");
            console.log(result.data);
            setFloats(result.data);
        }
        const username = localStorage.getItem('username');
        const filteredFloats = floats.filter(float => float.username === username);


        const columns = [
          { id: 'image', label: 'Imagen', minWidth: 100 },
          { id: 'name', label: 'Nombre', minWidth: 100 },
          { id: 'price', label: 'Precio', minWidth: 100 },
          { id: 'maxPeople', label: 'Aforo', minWidth: 100 },
          { id: 'actions', label: 'Acciones', minWidth: 100 },
        ];
        const img = (value) => {
          return (<img className='pilgrimage-img-list' alt="imagen romeria" src={value ? "data:image/png;base64,"+value : "/image-not-available.png"} />);
      }
    
    
    return (
            <>
  

            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
              
        <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredFloats
              .map((float) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={float.id}>
                    {columns.map((column) => {
                      const value = column.id==='actions' ? column.id : float[column.id];
                      return (
                        <TableCell key={column.id} > 
                          <span>
                            {column.id === 'image' ? img(value) 
                            : column.id==='actions' ? 
                            <><IconButton color='primary' aria-label='edit' onClick={() => {setId(float.id); click()}}><Edit/></IconButton>

                            <IconButton aria-label='delete' color='error'><Delete/></IconButton></>
                            : column.id==='price' ? value+"€" 
                            : column.id==='maxPeople' ? value+ " personas"
                            : value}</span>

                          
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>


     
    </Paper>
            </>
          
    )
}