import { Box, Button, FormControl, Input, InputLabel, TextField } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useState } from "react";
import axios from "axios";

export function Login() {
    const urlBase = import.meta.env.VITE_URL_BASE + "user/login";
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log(urlBase);
        console.log(username);
            console.log(password);
        try {
            
            const response = await axios.post(urlBase, {
                username, password});
            console.log(response.data);

            const token = response.data.token;

            // Almacenar el token en localStorage o sessionStorage
            localStorage.setItem('token', token);

            // Redirigir a una página protegida o home
            window.location.href = '/';
        } catch (error) {
            setError('Login failed. Please check your credentials.');
        }
    };

    return (
        <>
            <Box component="form"
                sx={{ display: "grid", gap: 1 }} onSubmit={handleLogin}>
                <FormControl>
                    <InputLabel >
                        <Box
                            sx={{ display: "flex", alignItems: "end", gap: "2px" }} >
                            <PersonIcon /> Usuario </Box>
                    </InputLabel>
                    <Input onChange={(e) => setUsername(e.target.value)} required type="text"></Input></FormControl>
                <FormControl>
                    <InputLabel>
                        <Box
                            sx={{ display: "flex", alignItems: "end", gap: "2px" }} >
                            <VisibilityIcon />Contraseña
                        </Box></InputLabel>
                    <Input onChange={(e) => setPassword(e.target.value)} required type="password"></Input>
                </FormControl>
                <Button type="submit" variant="contained">Iniciar sesión</Button>
                <Button component="a" href="/register" color="secondary" variant="contained">Registrarse</Button>
                {error && <Box sx={{ color: "error.main" }}>{error}</Box>}
            </Box>
        </>
    )
}