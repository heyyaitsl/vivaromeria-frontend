import axios from 'axios';
import { useEffect, useState } from 'react';
import { getDate } from 'src/common/dateUtils'
import { getStatus, getStatusClass } from 'src/common/StatusUtils.jsx'
import { Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';

export function PilgrimageList(){
    const urlBase = import.meta.env.VITE_URL_BASE + 'pilgrimages';
        const[pilgrimages, setPilgrimages] = useState([]);
        const[page, setPage] = useState(0);
        useEffect(() => {
            loadPilgrimages();
        },[page]);
        const[totalPages, setTotalPages] = useState(0);
        const loadPilgrimages = async () => {
            const result = await axios.get(urlBase+"?pageNo="+page);
            console.log("Result:");
            console.log(result.data);
            setTotalPages(result.data.totalPages);
            setPilgrimages(result.data.content);
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
            {pilgrimages
              .map((pilgrimage) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={pilgrimage.id}>
                    {columns.map((column) => {
                      const value = column.id==='date' ? getDate(pilgrimage[column.id]) : 
                      column.id==='status' ? getStatus(pilgrimage[column.id]) : pilgrimage[column.id];
                      return (
                        <TableCell key={column.id} >
                          <span className={ column.id==='status' ? `pilgrimage-status ${getStatusClass(pilgrimage[column.id])}` : ''}>
                            {column.id === 'image' ? img(value) : value}</span>
                          
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