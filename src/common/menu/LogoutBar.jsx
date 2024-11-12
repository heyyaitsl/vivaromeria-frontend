import { AppRegistration, Login, Person, Person2, PersonOutline } from "@mui/icons-material";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";

export function LogoutBar(){
    return (
        <Box sx={{display:'flex', justifyContent:'end'}} >
            <Link to='/login'>
            <PersonOutline/>
            <Login/>
            </Link>
        </Box>
    )
}