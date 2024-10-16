import React, { useState } from 'react';
import {  Box,  Button,  FormControl,  InputLabel,  Input,  TextField,  FormControlLabel,  Checkbox,  Typography, InputAdornment} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import BadgeIcon from '@mui/icons-material/Badge';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


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
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <Box component="form" sx={{ display: "grid", gap: 2, maxWidth: 400, margin: 'auto' }} onSubmit={handleRegister}>
      <Typography variant="h4" align="center" color='primary'gutterBottom>
        Register
      </Typography>
    
      <TextField
        label={"Nombre de usuario"}
        onChange={(e) => setUsername(e.target.value)}
        required
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
       <TextField
        label={"Contraseña"}
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
      <TextField
        label="Nombre completo"
        onChange={(e) => setName(e.target.value)}
        required
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
      <TextField
        label="Correo electrónico"
        onChange={(e) => setEmail(e.target.value)}
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
      <TextField
        label="Número de teléfono"
        onChange={(e) => setPhoneNumber(e.target.value)}
        required
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
      />
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
          Selected file: {imageName}
        </Typography>
      )}
      <Button type="submit" variant="contained" color="primary">
        Registrarse
      </Button>
      <Button onClick={login} color="secondary">
       ¿Ya tienes una cuenta? Inicia sesión
      </Button>
      {error && <Typography color="error">{error}</Typography>}
    </Box>
  );
}