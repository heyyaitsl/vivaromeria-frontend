import { Container, Typography, Button, Box, Stack, Modal } from '@mui/material';
import { ManageFloatsList } from '../floats/ManageFloatsList';
import { CreateFloats} from '../floats/CreateFloats';

import { Add, AgricultureOutlined, DirectionsBusOutlined } from '@mui/icons-material';
import { useState } from 'react';


export function ManageFloats() {

  const [openModalFloat, setOpenModalFloat] = useState(false);
  const handleModalFloatOpen = () => setOpenModalFloat(true);
  const handleModalFloatClose = () => setOpenModalFloat(false);

  const [key, setKey] = useState(0);
  const [id, setId] = useState(null);

  const reloadComponent = () => {
    setKey(prevKey => prevKey + 1);
  };

  return (
    <Container>
      <Stack spacing={3}>
            <Box sx={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>

      <Box sx={{display:'flex', gap:'2rem', alignItems:'center'}}>
              <DirectionsBusOutlined fontSize='large' color='primary'/>
              <Typography sx={{fontWeight:'600'}}variant='h3'>Mis carrozas</Typography></Box>
              
              <Button startIcon={<Add/>} variant="contained" color="primary" onClick={() => {setId(null); handleModalFloatOpen()}}  >
        Nueva carroza
      </Button></Box>
      <ManageFloatsList key={key} click={handleModalFloatOpen} setId={setId} />
      </Stack>

        <CreateFloats open={openModalFloat} id={id} close={handleModalFloatClose} reload={reloadComponent}/>
    </Container>
  );
}