import { Container, Typography, List, ListItem, ListItemText, Button, IconButton, ListItemIcon } from '@mui/material';
import { ManagePilgrimageList} from 'src/pilgrimage/ManagePilgrimageList.jsx'

export function ManagePilgrimage() {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
    <Typography className="title-pilgrimage" align="center" variant="h1" color="secondary">

        Gestión de romerías
      </Typography>
      <ManagePilgrimageList/>
      <Button variant="contained" color="primary" sx={{ mt: 2 }}  component='a' href='/pilgrimage/edit/'>
        Añadir Nueva Romería
      </Button>
    </Container>
  );
}