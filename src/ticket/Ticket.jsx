import React, { useEffect, useState } from 'react';
import { getDate } from 'src/common/dateUtils'

import {Card, CardContent, Typography, Box, Modal, Stack } from '@mui/material';
import axios from 'axios';
import QRCode from 'react-qr-code';

export const Ticket = ({ open, close, ticket, username }) => {
  const urlBaseUser = import.meta.env.VITE_URL_BASE+"user/" + username;

  const [user, setUser] = useState([]);
    useEffect(() => {loadUser()},[]);    
    const loadUser = async() => {
        const result = await axios.get(urlBaseUser);
        console.log(result.data);
        setUser(result.data);
    }
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 525,
    bgcolor: 'background.paper',
    boxShadow: 24,
  };

  return (
    <Modal open={open} onClose={close}>
    <Card style={style}>
    <Box sx={{ background: 'linear-gradient(50deg, var(--blue), var(--yellow))'}}>
    <Typography color='white' sx={{ padding: '2rem'}}variant='h4'>Entrada digital</Typography>

    </Box>
      <CardContent>
        <Stack spacing={2}>
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
          <QRCode value={String(ticket.id)} size={200} />
        </Box>
        <Stack>
        <Typography variant='h6' sx={{opacity:"70%"}}>Titular</Typography>
        <Typography variant='h5' sx={{fontWeight:'600'}}>{user.name}</Typography>
        </Stack>
        <Stack>
        <Typography variant='h6' sx={{opacity:"70%"}}>Romería</Typography>
        <Typography variant='h5' sx={{fontWeight:'600'}}>{ticket.pilgrimageName}</Typography>
        </Stack>
        <Stack>
        <Typography variant='h6' sx={{opacity:"70%"}}>Carroza</Typography>
        <Typography variant='h5' sx={{fontWeight:'600'}}>{ticket.floatsName}</Typography>
        </Stack>
        <Stack>
        <Typography variant='h6' sx={{opacity:"70%"}}>Fecha de compra</Typography>
        <Typography variant='h5' sx={{fontWeight:'600'}}>{getDate(ticket.date)}</Typography>
        </Stack>
  </Stack>
      </CardContent>
    </Card></Modal>
  );
};
