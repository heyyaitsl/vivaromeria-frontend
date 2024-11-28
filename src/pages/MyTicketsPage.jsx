
import { useEffect, useState } from 'react';
import { Ticket } from '../ticket/Ticket.jsx';
import { TicketList } from '../ticket/TicketList.jsx';
import { Container, Stack, Typography } from '@mui/material';
import axios from 'axios';

export function MyTicketsPage(){
    const username = localStorage.getItem('username');
    const urlBase = import.meta.env.VITE_URL_BASE + "tickets/user/" + username;
    const [tickets, setTickets] = useState([]);
    const [selectedTicket, setSelectedTicket] = useState(null);
  
    useEffect(() => {
        loadTickets();
    },[]);
    const loadTickets = async () => {
        const result = await axios.get(urlBase);
        console.log("Result:");
        console.log(result.data);
        setTickets(result.data);
    }

    return (
        <>
        <Stack spacing={1}>
            <Typography variant="h4" sx={{ fontWeight: "600" }}>
              Mis Entradas
            </Typography>
          
            
            <TicketList tickets={tickets} onSelectTicket={setSelectedTicket} />

          </Stack>
        </>
    );
  }
  
