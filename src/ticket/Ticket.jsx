import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { ArrowBack } from '@mui/icons-material';
import { Button, Card, CardContent, Typography, Box } from '@mui/material';

export const Ticket = ({ ticket, onBack }) => {
  return (
    <Card>
      <CardContent>
        <Button startIcon={<ArrowBack />} onClick={onBack} sx={{ mb: 2 }}>
          Volver
        </Button>
        <Typography variant="h5" component="div" gutterBottom>
          {ticket.pilgrimageName}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
          <QRCodeSVG value={ticket.id} size={200} />
        </Box>
        <Typography variant="body1" gutterBottom>
          <strong>Usuario:</strong> {ticket.username}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Carroza:</strong> {ticket.floatsName}
        </Typography>
        <Typography variant="body1">
          <strong>Fecha y Hora:</strong> {new Date(ticket.dateTime).toLocaleString()}
        </Typography>
      </CardContent>
    </Card>
  );
};
