import { Box, FormControl, InputLabel, MenuItem, NativeSelect, Select, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

export function FormTicket({ idPilgrimage, idFloat }) {

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
            <Box>
                <Typography variant="h2" color="primary">Compra de entrada</Typography>
                <Box>
                    {pilgrimage.name &&
                        <TextField disabled label="Romería" defaultValue={pilgrimage.name}></TextField>}
                    {float.name &&
                    <TextField disabled label="Carroza" defaultValue={float.name}></TextField>}
                </Box>
            </Box>
        </>
    )
}