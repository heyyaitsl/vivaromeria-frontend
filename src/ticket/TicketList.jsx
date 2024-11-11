import React from 'react';
import { List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';


export function TicketList ({ tickets, onSelectTicket }) {


  return (
    <List>
      {tickets.map((ticket) => (
        <ListItem key={ticket.id} disablePadding>
          <ListItemButton onClick={() => onSelectTicket(ticket)}>
            <ListItemText
              primary={ticket.pilgrimageName}
              secondary={
                <>
                  <Typography component="span" variant="body2" color="text.primary">
                    {ticket.floatsName}
                  </Typography>
                  {" — " + new Date(ticket.date).toLocaleString()}
                </>
              }
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};