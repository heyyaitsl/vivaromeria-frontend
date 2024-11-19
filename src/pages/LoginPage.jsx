import {Register} from '../user/login/Register.jsx';
import { Login } from '../user/login/Login.jsx';
import { useState } from 'react';
import { Container } from '@mui/material';

export function LoginPage() {
    const [register, setRegister] = useState(false)
    
    const handleRegister = () => {
        setRegister(!register)
    }
    return(
        <>
        <Container sx={{ backgroundColor: 'var(--blue)', padding:"3rem"}}>
        {register? <Register login={handleRegister}></Register> : <Login register={handleRegister}></Login>}
        </Container>
        </>
    )
}