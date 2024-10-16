import { Box, Button, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

export function FormTicket({ idPilgrimage, idFloat }) {
    const username = localStorage.getItem('username');
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


    const [float, setFloat] = useState([]);
    useEffect(() => {
        loadFloat();
    }, []);
    const loadFloat = async () => {
        const result = await axios.get(urlBaseFloat)
        setFloat(result.data);
    }


    return (
        <>
            <Container maxWidth="sm" >
                <Box sx={{ my: 4 }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Compra de Entradas para Romería
                    </Typography>
                    <form>
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