import { Button, Stack } from "@mui/material";
import { PilgrimageList } from "../pilgrimage/pilgrimageList/PilgrimageList";
import { Add } from "@mui/icons-material";
import { useState } from "react";
import { CreatePilgrimage } from "../pilgrimage/CreatePilgrimage";

export function Home({filter}) {

  const role = localStorage.getItem('role');

    const [openModalPilgrimage, setOpenModalPilgrimage] = useState(false);
    const handleModalPilgrimageOpen = () => setOpenModalPilgrimage(true);
    const handleModalPilgrimageClose = () => setOpenModalPilgrimage(false);
  
    const [key, setKey] = useState(0);
    
  
    const reloadComponent = () => {
      setKey(prevKey => prevKey + 1);
    };
  
    return(
        <>
        <Stack spacing={1}>
        {role === 'ROLE_ADMIN' &&(<Button sx={{maxWidth:"15rem", alignSelf:"end"}} startIcon={<Add/>} variant="contained" color="primary" onClick={() => {handleModalPilgrimageOpen()}}  >
        Nueva romería
      </Button>)}
        <PilgrimageList key={key} filter={filter}/>
        
        </Stack>
        <CreatePilgrimage open={openModalPilgrimage} close={handleModalPilgrimageClose} reload={reloadComponent} />
        </>
    )
}