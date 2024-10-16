import { Container, Typography, Button } from '@mui/material';
import { ManageFloatsList } from '../floats/ManageFloatsList';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';


export function ManageFloats() {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
    <Typography className="title-pilgrimage" align="center" variant="h1" color="secondary">
        Mis carrozas
      </Typography>
      <ManageFloatsList/>
      <Button component={Link} to='/floats/edit/' variant="contained" color="primary" sx={{ mt: 2 }}  >
        Añadir nueva carroza
      </Button>
    </Container>
  );
}