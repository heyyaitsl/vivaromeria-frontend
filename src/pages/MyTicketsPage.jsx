
import { useEffect, useState } from 'react';
import { Ticket } from '../ticket/Ticket.jsx';
import { TicketList } from '../ticket/TicketList.jsx';
import { Container, Typography } from '@mui/material';
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
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'primary.main' }}>
              Mis Tickets de Romerías
            </Typography>
        <Container maxWidth="md" sx={{ mt: 4 }}>
          {selectedTicket ? (
            <Ticket ticket={selectedTicket} onBack={() => setSelectedTicket(null)} />
          ) : (
            <TicketList tickets={tickets} onSelectTicket={setSelectedTicket} />
          )}
        </Container>
        </>
    );
  }
  
