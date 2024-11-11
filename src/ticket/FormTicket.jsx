import { Box, Button, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function FormTicket({ idPilgrimage, idFloat }) {
    const navigate = useNavigate();
    const username = localStorage.getItem('username');
    const urlBase = import.meta.env.VITE_URL_BASE + "tickets/buy";
    const urlBasePilgrimage = import.meta.env.VITE_URL_BASE + "pilgrimages/" + idPilgrimage;
    const urlBaseFloat = import.meta.env.VITE_URL_BASE + "floats/" + idFloat;
    const [pilgrimage, setPilgrimage] = useState([]);
    useEffect(() => {
        loadPilgrimage();
    }, []);
    const loadPilgrimage = async () => {
        const result = await axios.get(urlBasePilgrimage)
        setPilgrimage(result.data);
    }
    const [formData, setFormData] = useState({
        username,
        floatsId: '',
        pilgrimageId: ''
    })
    


    const [float, setFloat] = useState([]);
    useEffect(() => {
        loadFloat();
    }, []);
    const loadFloat = async () => {
        const result = await axios.get(urlBaseFloat)
        setFloat(result.data);
    }
    useEffect(() => {
        setFormData({
            username,
            floatsId: float.id || '',
            pilgrimageId: pilgrimage.id || '',
        });
    }
, [username,float,pilgrimage]);

const onSubmit = async (event) => {
    event.preventDefault();
    console.log('onSubmit');
    console.log(formData.status);
    const response = await axios.post(urlBase, formData);
    console.log("Elemento guardado: ", response.data);
    navigate('/myTickets')

}

    return (
        <>
            <Container maxWidth="sm" >
                <Box sx={{ my: 4 }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Compra de Entradas para Romería
                    </Typography>
                    <form  onSubmit={onSubmit}> 
                        <FormControl fullWidth margin="normal">
                            {pilgrimage.name ? (<TextField
                                value={pilgrimage.name}
                                label="Romería"
                                required disabled
                            />) : (<h5>Cargando...</h5>)}
                        </FormControl>
                        <FormControl fullWidth margin="normal">
                            {float.name ? (<TextField
                                value={float.name}
                                label="Carroza"
                                required disabled
                            />) : (<h5>Cargando...</h5>)}
                        </FormControl>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Número de Entradas"
                            type="number"
                            value={1}
                            disabled
                            //InputProps={{ inputProps: { min: 1 } }}
                           // value={entradas}
                           // onChange={(e) => setEntradas(parseInt(e.target.value))}
                            required
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ mt: 2 }}
                        >
                            Comprar
                        </Button>
                    </form>
                </Box>
            </Container>
        </>
    )
}