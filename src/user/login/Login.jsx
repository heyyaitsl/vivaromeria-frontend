import { Box, Button, FormControl, Input, InputLabel, TextField } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import VisibilityIcon from '@mui/icons-material/Visibility';

export function Login() {
    return (
        <>
            <Box component="form"
                sx={{ display: "grid", gap: 1 }}>
                <FormControl>
                    <InputLabel >
                        <Box
                            sx={{ display: "flex", alignItems: "end",gap:"2px" }} >
                            <PersonIcon /> Correo electrónico</Box>
                    </InputLabel>
                    <Input required type="email"></Input></FormControl>
                <FormControl>
                    <InputLabel>
                        <Box
                            sx={{ display: "flex", alignItems: "end", gap:"2px" }} >
                            <VisibilityIcon />Contraseña
                        </Box></InputLabel>
                    <Input required type="password"></Input>
                </FormControl>
                <Button type="submit" variant="contained">Iniciar sesión</Button>
                <Button component="a" href="/register" color="secondary" variant="contained">Registrarse</Button>
            </Box>
        </>
    )
}