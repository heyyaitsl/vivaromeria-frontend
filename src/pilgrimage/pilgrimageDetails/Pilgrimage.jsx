import { Box, Grid2, Stack, Typography } from "@mui/material"
import './Pilgrimage.css'
import { useParams } from "react-router-dom";
import { getDate } from 'src/common/dateUtils'
import { useEffect, useState } from "react";
import axios from "axios";
import { getHour } from "../../common/dateUtils";

export function Pilgrimage({id}) {
    const urlBase = import.meta.env.VITE_URL_BASE+"pilgrimages";
    const [pilgrimage, setPilgrimage] = useState([]);
    useEffect(() => {
        loadPilgrimage();
},[])
    const loadPilgrimage = async () => {
        const result = await axios.get(`${urlBase}/${id}`)
        setPilgrimage(result.data);
        console.log(result.data);
    }

    return(
        <>
        <Stack spacing={2} component={"section"}>
        <Box sx={{display:"grid"}}>

            <Typography className="title-pilgrimage" align="center" variant="h1" color="secondary">{pilgrimage.name}</Typography>
            <Box sx={{display:"flex", gap:2, justifyContent:"center"}}>
            <Typography align="center" variant="h5" color="primary">{getDate(pilgrimage.date)}</Typography>
            <img className="icons" src="/sombrero.png" alt="sombrero" />
            <Typography align="center" variant="h5" color="primary">{pilgrimage.place}</Typography>
            <img className="icons" src="/sombrero.png" alt="sombrero" />
            <Typography align="center" variant="h5" color="primary">{getHour(pilgrimage.date)}</Typography>
            </Box>
            </Box> 
            <Grid2 container spacing={2}>
                <Grid2 size={6} sx={{textAlign:"center"}}>
                
                <img  className="pilgrimage-img"src={pilgrimage.image ? "data:image/png;base64,"+pilgrimage.image : "/image-not-available.png"} alt="romeria"></img>
                </Grid2>
                <Grid2 size={6}>
                <Box>
                    <Typography variant="p">{pilgrimage.description}</Typography>
                </Box>
                </Grid2>

            </Grid2>
        
        </Stack>
        </>
    )
}