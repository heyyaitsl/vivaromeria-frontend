import { Box, Container } from "@mui/material";
import { Pilgrimage } from "../pilgrimage/pilgrimageDetails/Pilgrimage";
import { useParams } from "react-router-dom";
import { FloatList } from "../floats/FloatList";

export function PilgrimagePage() {
    const {id} = useParams();
    return (
        <>
            
                <Box sx={{display:"grid", gap:3}}>
                    <Pilgrimage id={id} />
                </Box>
        </>
    )
}