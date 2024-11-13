import { Box, Button, Card, CardActions, CardContent, CardMedia, Divider, Stack, Typography } from "@mui/material";
import "./Float.css"
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";


export function FloatCard({name, image, description, username, price, maxPeople, idPilgrimage, idFloat}) {
    const urlBaseUser = import.meta.env.VITE_URL_BASE+"user/" + username;

    const [user, setUser] = useState([]);
    useEffect(() => {loadUser()},[]);    
    const loadUser = async() => {
        const result = await axios.get(urlBaseUser);
        console.log(result.data);
        setUser(result.data);
    }
    
    return(
        <>
        <Card>
            <CardMedia className="max-height-img" component="img"
             image={image ? "data:image/png;base64,"+image : "/image-not-available.png"} alt="carroza" />
             <CardContent>
             <Stack spacing={1.5}>
                <Stack>

                <Box sx={{display:'flex', justifyContent:'space-between'}}>
                <Typography sx={{ fontWeight: "600" }}  variant="h5" >{name}</Typography>
                <Typography variant="h4" sx={{ fontWeight: "600" }} color="primary" > {price} €</Typography>
                </Box>
                <Typography variant="h6" sx={{ opacity:'70%' }} > Dueño: {user.name}</Typography>
                </Stack>
                <Stack spacing={0.5}>

                <Typography sx={{ fontWeight: "600" }}  variant="h6" >Decripción:</Typography>

                <Typography variant="p" sx={{textAlign:"justify"}}> {description} </Typography>
                </Stack>

        
                </Stack>
             </CardContent>
             <Divider sx={{margin:'0 1rem'}}/>

             <CardActions sx={{display:"flex", justifyContent:"space-between", alignItems:"center", margin:'1rem'}}>
                <Stack>
                <Typography sx={{ opacity:'70%' }}variant="p"> Aforo máximo</Typography>
                <Typography sx={{ fontWeight: "600" }} variant="h6"> {maxPeople} personas</Typography>
                </Stack>

                <Button component={Link} 
                to={"/buyticket/"+idPilgrimage+"/"+idFloat} color='secondary'variant="contained" size="medium">Comprar entrada</Button>

             </CardActions>

        </Card>
        </>
    )
}