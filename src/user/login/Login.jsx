import { Box, Button, Card, CardContent, FormControl, Input, InputLabel, Stack, TextField, Typography } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../AuthContext";
import { useNavigate } from "react-router-dom";
import { CelebrationOutlined } from "@mui/icons-material";

export function Login({register}) {
    const urlBase = import.meta.env.VITE_URL_BASE + "user/login";
    const navigate = useNavigate();
    const { logIn } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            
            const response = await axios.post(urlBase, {
                username, password});
            console.log(response.data);

            const token = response.data.token;
            const user = response.data.username;
            const role = response.data.role;

            // Almacenar el token en localStorage o sessionStorage
            localStorage.setItem('token', token);
            localStorage.setItem('username', user);
            localStorage.setItem('role', role);
            logIn();
            // Redirigir a una página protegida o home
            navigate('/')
        } catch (error) {
            setError('Inicio de sesión fallido. Por favor, revise sus credenciales.');
        }
    };

    return (
        <>
        <Stack spacing={1} sx={{justifyContent: "center", alignItems: "center"}}>
            <CelebrationOutlined color="white" sx={{fontSize:'4rem'}} />
            <Typography sx={{fontWeight:'600'}} color="white" variant="h3">
                Bienvenido de nuevo
            </Typography>
            <Typography color="white" variant="h5">
                Inicia sesión para continuar
            </Typography>
            <Card sx={{minWidth:"50rem"}}>
                <CardContent sx={{margin:"2rem"}}>
            <Box component="form"
                sx={{ display: "grid", gap:3 }} onSubmit={handleLogin}>
                
                    <Stack spacing={1}>
                        <Box
                            sx={{ display: "flex", alignItems: "end", gap: "0.5rem", opacity:"90%" }} >
                            <PersonIcon /><Typography variant="p"> Usuario </Typography></Box>
                    
                    <TextField variant="outlined" onChange={(e) => setUsername(e.target.value)} required type="text" placeholder="mariarodriguez"></TextField>
                    </Stack>
                    <Stack spacing={1}>

                    
                        <Box
                            sx={{ display: "flex", alignItems: "end", gap: "0.5rem", opacity:"90%" }} >
                            <VisibilityIcon /><Typography>Contraseña</Typography>
                        </Box>
                    <TextField variant="outlined" onChange={(e) => setPassword(e.target.value)} placeholder="••••••••"required type="password"></TextField>
                    </Stack>

                <Button type="submit" variant="contained">Iniciar sesión</Button>
                <Box sx={{display:"flex", alignItems:"center", justifyContent:"center"}}><Typography> ¿No tienes cuenta? </Typography>
                <Button component='a' onClick={register} color="primary" variant="text">Regístrate</Button></Box>
                {error && <Box sx={{ color: "error.main" }}>{error}</Box>}
            </Box></CardContent></Card></Stack>
        </>
    )
}