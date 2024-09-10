import { Box, Container } from "@mui/material";
import { Pilgrimage } from "../pilgrimage/pilgrimageDetails/Pilgrimage";
import { useParams } from "react-router-dom";

export function PilgrimagePage() {
    const {id} = useParams();
    return (
        <>
            
                <Box>

                    <Pilgrimage id={id} />
                </Box>
        </>
    )
}