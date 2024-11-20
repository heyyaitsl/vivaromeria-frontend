import axios from 'axios';
import { useEffect, useState } from 'react';
import { getDate } from 'src/common/dateUtils'
import { getStatus, getStatusClass } from 'src/common/StatusUtils.jsx'
import { Button, Container, Pagination, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import { Link } from 'react-router-dom';
import { Add } from '@mui/icons-material';

export function PilgrimageList({filter}){
    const urlBase = import.meta.env.VITE_URL_BASE + 'pilgrimages';
        const[pilgrimages, setPilgrimages] = useState([]);
        const[page, setPage] = useState(0);
        useEffect(() => {
            loadPilgrimages();
        },[page,filter]);
        const[totalPages, setTotalPages] = useState(0);
        const loadPilgrimages = async () => {
            if(filter!=''){
              const result = await axios.get(urlBase+"/all");
              console.log("Result:");
              console.log(result.data);
              setTotalPages(1);
              setPilgrimages(result.data);
            }else{
            const result = await axios.get(urlBase+"?pageNo="+page);
            console.log("Result:");
            console.log(result.data);
            setTotalPages(result.data.totalPages);
            setPilgrimages(result.data.content);}
        }
    const columns = [
            { id: 'image', label: 'Imagen', minWidth: 100 },
            { id: 'name', label: 'Nombre', minWidth: 100 },
            { id: 'status', label: 'Estado', minWidth: 100 },
            { id: 'date', label: 'Fecha', minWidth: 100 },
            { id: 'place', label: 'Lugar', minWidth: 100 },
          ];

    const img = (value) => {
        return (<img className='pilgrimage-img-list' alt="imagen romeria" src={value ? "data:image/png;base64,"+value : "/image-not-available.png"} />);
    }
    const handlePageChange = (event,page) => {
        setPage(page-1);
    }
    const removeAccents = str =>
      str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const filteredPilgrimage = pilgrimages.filter((value) => {
      if (filter==null||filter=='') {
        return value;
      }else{
        return removeAccents(value.name.toLowerCase()).includes(removeAccents(filter.toLowerCase())) 
        || removeAccents(getStatus(value.status).toLowerCase()).includes(removeAccents(filter.toLowerCase())) 
        || removeAccents(getDate(value.date).toLowerCase()).includes(removeAccents(filter.toLowerCase())) 
        || removeAccents(value.place.toLowerCase()).includes(removeAccents(filter.toLowerCase()));
      }
    })
    
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
            {filteredPilgrimage
              .map((pilgrimage) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={pilgrimage.id}>
                    {columns.map((column) => {
                      const value = column.id==='date' ? getDate(pilgrimage[column.id]) : 
                      column.id==='status' ? getStatus(pilgrimage[column.id]) : pilgrimage[column.id];
                      return (
                        <TableCell key={column.id} > <Link to={"/"+pilgrimage.id}  style={{ textDecoration: "none" }}>
                          <span className={ column.id==='status' ? `pilgrimage-status ${getStatusClass(pilgrimage[column.id])}` : ''}>
                            {column.id === 'image' ? img(value) : value}</span></Link>
                          
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination count={totalPages} shape="rounded" color='primary' page={page+1} 
      onChange={handlePageChange}/>
     
    </Paper>

        </>
    )
}