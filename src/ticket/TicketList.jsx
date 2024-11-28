import React, { useState } from 'react';
import { Box, Card, CardContent, Grid2, List, ListItem, ListItemButton, ListItemText, Stack, Typography } from '@mui/material';
import { getDate } from 'src/common/dateUtils'
import { ConfirmationNumberOutlined } from '@mui/icons-material';
import { Ticket } from './Ticket';


export function TicketList ({ tickets }) {
  const [selectedTicket, setSelectedTicket] = useState('');
  const username= localStorage.getItem('username');

  const [openModal, setOpenModal] = useState(false);
    const handleModalOpen = () => setOpenModal(true);
    const handleModalClose = () => setOpenModal(false);
  return (
    <>
    <Grid2 container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      {tickets.map((ticket) => (
<>
<Grid2 size={4}>
<Card key={ticket.id} variant='outlined' 
 sx={{
  background: 'linear-gradient(10deg, var(--yellow), var(--blue))', 
  
}}>
<ListItemButton onClick={() => {setSelectedTicket(ticket); handleModalOpen()}}>
  
  <CardContent sx={{width:'100%', backgroundColor:'var(--white)'}}>
  <Stack spacing={1}>
    <Box  sx={{ display: 'flex', justifyContent: 'space-between' }}>
  <Typography variant='h5' sx={{fontWeight:'600'}}>{ticket.pilgrimageName}</Typography>
  <ConfirmationNumberOutlined color='primary'/>
  </Box>
  <Typography variant='h6' sx={{opacity:"70%"}}>{ticket.floatsName}</Typography>
  <Stack>
  <Typography sx={{opacity:"70%"}}>Fecha de compra</Typography>
  <Typography>{getDate(ticket.date)}</Typography></Stack>
  </Stack>
  </CardContent>
</ListItemButton>
</Card>
        
        </Grid2>
        </>

      ))}
    </Grid2>
    <Ticket open={openModal} close={handleModalClose} ticket={selectedTicket} username={username}/>
    </>
  );
};