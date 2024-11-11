import { Box, Button, Container, Grid2, InputLabel, MenuItem, Select, Stack, Typography } from "@mui/material"
import './Pilgrimage.css'
import { useParams } from "react-router-dom";
import { getDate } from 'src/common/dateUtils'
import { useEffect, useState } from "react";
import axios from "axios";
import { getHour } from "../../common/dateUtils";

export function Pilgrimage({id}) {
    const role = localStorage.getItem('role');
    const urlBase = import.meta.env.VITE_URL_BASE+"pilgrimages";
    const urlBaseFloats = import.meta.env.VITE_URL_BASE+"floats";

    const [pilgrimage, setPilgrimage] = useState([]);
    useEffect(() => {
        loadPilgrimage();
},[])
    const loadPilgrimage = async () => {
        const result = await axios.get(`${urlBase}/${id}`)
        setPilgrimage(result.data);
        console.log(result.data);
    }
    const [floats, setFloats] = useState([]);
    useEffect(() => {
        loadFloats()},[])
    const loadFloats = async() => {
        const result = await axios.get(`${urlBaseFloats}`);
        console.log(result.data);
        setFloats(result.data);
    }
    const username = localStorage.getItem('username');
        const filteredFloats = floats.filter(float => float.username === username);

        const [selectedFloat, setSelectedFloat] = useState('');
    

        const onSubmit = async (e) => {
            e.preventDefault();
                    
              const response = await axios.get(`${urlBase}/${id}/addFloat/${selectedFloat}`);
              console.log(response.data);
              
          };

    return(
        <>
        <Stack spacing={2} component={"section"}>
        <Box sx={{display:"grid"}}>

            <Typography className="title-pilgrimage" align="center" variant="h1" color="secondary">{pilgrimage.name}</Typography>
            {role == "ROLE_FLOATS" ? (
                <>
                <Box component="form" sx={{ display: "flex", gap: 2, maxWidth: 400, margin: 'auto' }} onSubmit={onSubmit}>
                    <Box>
                    <InputLabel id="floats-select-label">Selecciona una carroza</InputLabel>
      <Select
        labelId="floats-select-label"
        value={selectedFloat}
        label="Selecciona una carroza"
        onChange={(e) => setSelectedFloat(e.target.value)}
        required
      >
        {filteredFloats.map((floatItem) => (
          <MenuItem key={floatItem.id} value={floatItem.id}>
            {floatItem.name} {/* O cualquier propiedad relevante de float */}
          </MenuItem>
        ))}
      </Select></Box>
      
                <Button variant='outlined' type="submit">Añadir carroza</Button>
                </Box></>
                
                ) : null}

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