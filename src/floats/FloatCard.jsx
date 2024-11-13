import { Button, Card, CardActions, CardContent, CardMedia, Stack, Typography } from "@mui/material";
import "./Float.css"
import { Link } from "react-router-dom";


export function FloatCard({name, image, description, username, price, maxPeople, idPilgrimage, idFloat}) {
    return(
        <>
        <Card>
            <CardMedia className="max-height-img" component="img"
             image={image ? "data:image/png;base64,"+image : "/image-not-available.png"} alt="carroza" />
             <CardContent>
             <Stack spacing={0.5}>
                <Typography sx={{ fontWeight: "600" }}  variant="h5" >{name}</Typography>
                <Typography variant="p"> Dueño: {username}</Typography>
                <Typography variant="p"> Aforo máximo: {maxPeople} personas</Typography>
                <Typography variant="p" sx={{textAlign:"justify"}}> {description} </Typography>

        
                </Stack>
             </CardContent>
             <CardActions sx={{display:"flex", justifyContent:"space-between", alignItems:"center", margin:'1rem'}}>
                <Typography variant="h4" sx={{ fontWeight: "600" }} color="primary" > {price} €</Typography>

                <Button component={Link} 
                to={"/buyticket/"+idPilgrimage+"/"+idFloat} color='secondary'variant="contained" size="medium">Comprar entrada</Button>
    
             </CardActions>
        </Card>
        </>
    )
}