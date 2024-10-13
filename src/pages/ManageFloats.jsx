import { Container, Typography, Button } from '@mui/material';
import { ManageFloatsList } from '../floats/ManageFloatsList';

export function ManageFloats() {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
    <Typography className="title-pilgrimage" align="center" variant="h1" color="secondary">
        Mis carrozas
      </Typography>
      <ManageFloatsList/>
      <Button variant="contained" color="primary" sx={{ mt: 2 }}  component='a' href='/floats/edit/'>
        Añadir nueva carroza
      </Button>
    </Container>
  );
}