import { useNavigate, useParams } from "react-router-dom";
import { FormTicket } from "../ticket/FormTicket";
import { useEffect } from "react";
import { useAuth } from "../AuthContext";
import { Box, Card, CardContent, Modal, Typography } from "@mui/material";

export function BuyTicketPage({open, close, idPilgrimage, idFloat}) {
    const { isLogged } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLogged) {
            navigate('/login'); // Redirige al login si no está logueado
        }
    }, [isLogged]);
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        height: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
      }; 

    // Renderiza solo si el usuario está logueado
    if(!isLogged) {return null;}
    return(
        <>
        <Modal open={open} onClose={close}>

<Card style={style}>
<Box sx={{backgroundColor: "var(--blue)"}}>
    <Typography color='white' sx={{ padding: '2rem'}}variant='h4'>Comprar entrada</Typography>

    </Box>
    <CardContent sx={{overflow:'scroll', height: 450, display:'flex', flexDirection:'column', gap:'1rem'}}>
        
            <FormTicket idPilgrimage={idPilgrimage} idFloat={idFloat}></FormTicket>
            </CardContent>
            </Card>
            </Modal>
            
            
        </>
    )
}