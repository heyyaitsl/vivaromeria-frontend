import {Register} from '../user/login/Register.jsx';
import { Login } from '../user/login/Login.jsx';
import { useState } from 'react';

export function LoginPage() {
    const [register, setRegister] = useState(false)
    const handleRegister = () => {
        setRegister(!register)
    }
    return(
        <>
        {register? <Register login={handleRegister}></Register> : <Login register={handleRegister}></Login>}
        </>
    )
}