import { Box, Button, Card,  CardContent,  CardMedia,  Stack,  Typography } from "@mui/material";
import { FloatCard } from "./FloatCard";
import { Height } from "@mui/icons-material";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
  };
export function SelectFloat({floats, selectFloat, onSubmit}) {
    
    return(
        <>
        <Card sx={style }>
            <Box sx={{backgroundColor: "var(--blue)"}}>
            <Typography sx={{ padding: '2rem',color:'white'}}variant='h4'>Seleccionar carroza</Typography>
            </Box>
            <CardContent sx={{overflow:'scroll', height: 380, display:'flex', flexDirection:'column', gap:'1rem'}}>
                {floats.map(float => {
                    return(

                            <Box  className="box-hover"sx={{  border:"1px solid #c4c2c2", borderRadius:'0.5rem'}} key={float.id} onClick={() => selectFloat(float.id)}>
                                <Box sx={{display:'flex',  gap:'1rem', alignItems:'center', padding:'2rem'}}>
                                <CardMedia sx={{maxWidth: '6rem', maxHeight:'4rem', borderRadius:'10%'}} component="img"
             image={float.image ? "data:image/png;base64,"+float.image : "/image-not-available.png"} alt="carroza" />
                                
                                <Stack spacing={0.5}>
                                <Typography sx={{ fontWeight: "600" }} variant="h6">{float.name}</Typography>
                                <Typography  color='primary'variant="h6">{float.price} €</Typography>
                                </Stack>

                                </Box>
                        </Box>
                    )
                })}

            </CardContent>
            <Box sx={{display:'flex', justifyContent:'end', mt:'1rem', mr:'2rem'}}>
            <Button color='primary'variant="contained" onClick={onSubmit} size="medium">Añadir carroza</Button>
            </Box>

                
            

        </Card>
        </>
    )
}