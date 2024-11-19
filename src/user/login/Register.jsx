import React, { useState } from 'react';
import {  Box,  Button,  FormControl,  InputLabel,  Input,  TextField,  FormControlLabel,  Checkbox,  Typography, InputAdornment, Stack, Card, CardContent} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import BadgeIcon from '@mui/icons-material/Badge';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CelebrationOutlined } from '@mui/icons-material';


export function Register({login}) {
  const navigate = useNavigate();
  const urlBase = import.meta.env.VITE_URL_BASE + "user/register";
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isFloathandler , setIsFloathandler ] = useState(false);
  const [imageName, setImageName] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [error, setError] = useState(null);
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
        setProfilePicture(reader.result.split(",")[1]);
        setImageName(file.name);
    }
    if (file) {
        reader.readAsDataURL(file);
    }

}
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const formData = {
      username: username,
      password: password,
      email: email,
      name: name,
      phoneNumber: phoneNumber,
      role: isFloathandler  ? 'ROLE_FLOATS' : 'ROLE_USER',
      photo: profilePicture,
      floats: null}
      console.log(formData);

      const response = await axios.post(urlBase, formData);

      console.log(response.data);
      navigate('/')
      // Handle successful registration (e.g., show success message, redirect to login)
      // Redirect to login page after successful registration
    } catch (error) {
      setError('Registro fallido. Por favor, prueba otra vez.');
    }
  };

  return (
    <Stack spacing={1} sx={{justifyContent: "center", alignItems: "center"}}>
    <CelebrationOutlined color="white" sx={{fontSize:'4rem'}} />
    <Typography sx={{fontWeight:'600'}} color="white" variant="h3">
        Crear una cuenta
    </Typography>
    <Typography color="white" variant="h5">
        Únete a nuestra comunidad de romerías
    </Typography>
    <Card sx={{minWidth:"50rem"}}>
        <CardContent sx={{margin:"2rem"}}>
    <Box component="form" sx={{ display: "grid", gap: 3, maxWidth: 400, margin: 'auto' }} onSubmit={handleRegister}>
<Stack spacing={1}>
    <Typography sx={{opacity:"90%"}} variant="p"> Nombre de usuario </Typography>
      <TextField
        onChange={(e) => setUsername(e.target.value)}
        required
        placeholder='mariarodriguez'
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              ),
            },
          }}
      /> 
      </Stack>
      <Stack spacing={1}>
        <Typography sx={{opacity:"90%"}} variant="p"> Contraseña </Typography>
       <TextField
       placeholder='••••••••'
        onChange={(e) => setPassword(e.target.value)}
        required
        type='password'
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                  <VisibilityIcon />
                </InputAdornment>
              ),
            },
          }}
          />
          </Stack>
          <Stack spacing={1}>
            <Typography sx={{opacity:"90%"}} variant="p"> Nombre completo </Typography>
      <TextField
        onChange={(e) => setName(e.target.value)}
        required
        placeholder='María Rodriguez Rodriguez'
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                  <BadgeIcon />
                </InputAdornment>
              ),
            },
          }}
          />
        </Stack>
          <Stack spacing={1}>
            <Typography sx={{opacity:"90%"}} variant="p"> Correo electróniico </Typography>
            <TextField
        onChange={(e) => setEmail(e.target.value)}
        placeholder='ejemplo@gmail.com'

        required
        type="email"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            },
          }}
          />
          </Stack>
          <Stack spacing={1}>
            <Typography sx={{opacity:"90%"}} variant="p"> Número de teléfono </Typography>
      <TextField
        onChange={(e) => setPhoneNumber(e.target.value)}
        required
        placeholder='666777888'

        type='tel'
        slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneIcon />
                </InputAdornment>
              ),
            },
          }}
      /></Stack>
      <FormControlLabel
        control={
          <Checkbox
            checked={isFloathandler }
            onChange={(e) => setIsFloathandler (e.target.checked)}
            icon={<DirectionsBusIcon />}
            checkedIcon={<DirectionsBusIcon />}
          />
        }
        label="¿Eres carrocero?"
      />
      <Button
        variant="contained"
        color='secondary'
        component="label"
        startIcon={<PhotoCameraIcon />}>
        Subir imagen de perfil
        <input
          type="file"
          hidden
          accept="image/*"
          onChange={handleImageChange}
        />
      </Button>
      {profilePicture && (
        <Typography variant="body2">
          Archivo seleccionado: {imageName}
        </Typography>
      )}
      <Button type="submit" variant="contained" color="primary">
        Registrarse
      </Button>
      <Box sx={{display:"flex", alignItems:"center", justifyContent:"center"}}><Typography> ¿Ya tienes cuenta? </Typography>
      <Button onClick={login} color="primary"variant='text'>
       Inicia sesión
      </Button></Box>
      {error && <Typography color="error">{error}</Typography>}
    </Box></CardContent></Card></Stack>
  );
}