import { Box, Button, Card, CardActions, CardContent, CardMedia, Stack, Typography } from "@mui/material";
import "./Float.css"

export function FloatCard({name, image, description, username, price, maxPeople, idPilgrimage, idFloat}) {
    return(
        <>
        <Card sx={{maxWidth:400}}>
            <CardMedia component="img"
             image={image ? "data:image/png;base64,"+image : "/image-not-available.png"} alt="carroza" />
             <CardContent sx={{display:"grid", gap:1, justifyContent:"center"}}>
                <Typography variant="h5" sx={{textAlign:"center"}}>{name}</Typography>
                <Stack direction="row" spacing={1} sx={{color:"text.secondary", justifyContent:"center"}}>
                <Typography variant="p" sx={{fontSize:"1rem"}}>Máx. {maxPeople} personas </Typography>
                <img className="img-gorro" src="public/sombrero.png" alt="sombrero"/>
                <Typography variant="p"> {username}</Typography>
                </Stack>
                <Typography variant="p" sx={{fontSize:"1.2rem", textAlign:"justify"}}> {description} </Typography>
             </CardContent>
             <CardActions sx={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
        
                <Button  href={"/buyticket/"+idPilgrimage+"/"+idFloat} variant="outlined" size="medium">Comprar entrada</Button>
                <Typography variant="h4" color="primary" > {price} €</Typography>
    
             </CardActions>
        </Card>
        </>
    )
}