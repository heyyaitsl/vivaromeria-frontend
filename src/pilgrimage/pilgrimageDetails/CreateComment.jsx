import { Box, Button, Card, CardContent, Modal, Rating, TextField, Typography } from "@mui/material";
import "dayjs/locale/es";
import { Close, CloudUpload, Save } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';

import { useNavigate, useParams } from 'react-router-dom';


export function CreateComment({open, close, pilgrimageId, reload}) {
    const urlBase = import.meta.env.VITE_URL_BASE + "comments";
    const username= localStorage.getItem('username');

    const [formData, setFormData] = useState({
        pilgrimageId: pilgrimageId || '',
        valoration: 0,
        description:'',
        username: username || '',
        date: '',
    });

    useEffect(() => {
        setFormData({
            pilgrimageId: pilgrimageId || '',
            valoration: 0,
            description:'',
            username: username || '',
            date: '',
        });
    }, []);


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState => ({
            ...prevState,
            [name]: value,
            
        })))
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        const currentDate = dayjs();

        const updatedData = {
            ...formData,
            date: currentDate,
        };

        await sendData(updatedData);
    };


    const sendData = async (dataToSend) => {
       
        console.log('onSubmit');
        console.log(dataToSend);
        const response = await axios.post(urlBase, dataToSend);
        console.log("Elemento guardado: ", response.data);
        close();
        reload();

    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        height: 420,
        bgcolor: 'background.paper',
        boxShadow: 24,
      };
    return (
        <>  
              <Modal open={open} onClose={close}>

        <Card style={style}>
        <Box sx={{backgroundColor: "var(--blue)"}}>
            <Typography  color="white" sx={{ padding: '2rem'}}variant='h4'>Añadir comentario</Typography>

            </Box>
            <CardContent >
            <Box component={"form"} onSubmit={onSubmit} sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              
                <Typography variant="h6" sx={{color:"#292929"}}>Calificación</Typography>
                {console.log('FormData: ' + formData)}
                <Rating label='Valoración' name='valoration' value={formData.valoration}
                 onChange={handleInputChange} size="large" required/>
                <Typography variant="h6" sx={{color:"#292929"}}>Comentario</Typography>

                <TextField slotProps={{ input: { inputProps: { maxLength: 500 } } }} helperText={`${formData.description.length}/500`} multiline rows={10} name='description' value={formData.description} onChange={handleInputChange} />
            
                <Box sx={{display:"flex", gap: '1rem', justifyContent:'end'}}>
                <Button variant="text" onClick={close}>Cancelar</Button>
                <Button variant="contained" color="primary" type='submit' component="button" >Publicar</Button>
                </Box>
            </Box>
            </CardContent>
            </Card>
            </Modal>
        </>
    )
}