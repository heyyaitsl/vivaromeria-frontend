import { Box, Grid2, Stack, Typography } from "@mui/material"
import './Pilgrimage.css'

export function Pilgrimage() {
    return(
        <>
        <Stack spacing={2} component={"section"}>
        <Box sx={{display:"grid"}}>

            <Typography align="center" variant="h1" color="secondary">Romeria</Typography>
            <Box sx={{display:"flex", gap:2, justifyContent:"center"}}>
            <Typography align="center" variant="h5" color="primary">Fecha</Typography>
            <img className="icons" src="/sombrero.png" alt="sombrero" />
            <Typography align="center" variant="h5" color="primary">Lugar</Typography>
            <img className="icons" src="/sombrero.png" alt="sombrero" />
            <Typography align="center" variant="h5" color="primary">Hora</Typography>
            </Box>
            </Box> 
            <Grid2 container spacing={2}>
                <Grid2 size={6} sx={{textAlign:"center"}}>
                <img  className="pilgrimage-img"src="https://acortar.link/B8si1U" alt="romeria"></img>
                </Grid2>
                <Grid2 size={6}>
                <Box>
                    <Typography variant="p">Lo que sea</Typography>
                </Box>
                </Grid2>

            </Grid2>
        
        </Stack>
        </>
    )
}