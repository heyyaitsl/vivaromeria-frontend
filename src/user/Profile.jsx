import { Alert, Avatar, Box, Button, Card, CardContent, Collapse, IconButton, Modal, Stack, TextField, Typography } from "@mui/material";
import "dayjs/locale/es";
import { Close, CloudUpload, Password, Save } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';


export function Profile() {
    const urlBase = import.meta.env.VITE_URL_BASE + "user";
    const username = localStorage.getItem('username');
    const [user, setUser] = useState([]);
    const [imageName, setImageName] = useState("No ha seleccionado ninguna imagen");


    useEffect(() => {
        loadUser();
    }, [username])
    const loadUser = async () => {
        const result = await axios.get(`${urlBase}/${username}`)
        setUser(result.data);
        console.log(result.data);
    }
    const [formData, setFormData] = useState({
        role: '',
        email: '',
        name: '',
        username: '',
        password: '',
        phoneNumber: '',
        photo: '',
        floats: {},
        comments: {},
    });
    useEffect(() => {
        setFormData({
            role: user.role || '',
            email: user.email || '',
            name: user.name || '',
            username: user.username || '',
            password: user.password || '',
            phoneNumber: user.phoneNumber || '',
            photo: user.photo,
            floats: user.floats || {},
            comments: user.comments || {},
        })
    }, [user])



    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState => ({
            ...prevState,
            [name]: value,

        })))
    };


    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setFormData((prevState => ({
                ...prevState,
                photo: reader.result.split(",")[1]
            })))
            setImageName(file.name);
        }
        if (file) {
            reader.readAsDataURL(file);
        }

    }
    const [open, setOpen] = useState(false);

    const onSubmit = async (event) => {
        event.preventDefault();
        console.log('onSubmit');
        const response = await axios.put(`${urlBase}/${username}`, formData);
        console.log("Elemento guardado: ", response.data);
        setOpen(true)

    }
    


    return (
        <>

            <Card >
                <Box sx={{ backgroundColor: "var(--lightBlue)" }}>
                    <Typography color="primary" sx={{ padding: '2rem' }} variant='h4'>Editar perfil</Typography>

                </Box>
                <CardContent>
                    <Box component={"form"} onSubmit={onSubmit} sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                        <Avatar sx={{ width: 80, height: 80 }} src={user ? "data:image/png;base64," + formData.photo : ""} alt="user" />
                        <Stack spacing={2}>
                            <Stack spacing={1}>
                                <Typography variant="h6">Nombre completo</Typography>
                                <TextField name='name' value={formData.name} required onChange={handleInputChange} />
                            </Stack>
                            <Stack spacing={1}>
                                <Typography variant="h6">Nombre de usuario</Typography>
                                <TextField name='username' value={formData.username} disabled/>
                            </Stack>

                            <Stack spacing={1}>
                                <Typography variant="h6">Correo electrónico</Typography>
                                <TextField name='email' value={formData.email} required onChange={handleInputChange} />
                            </Stack>

                            <Stack spacing={1}>
                                <Typography variant="h6">Número de teléfono</Typography>
                                <TextField name='phoneNumbebr' type="tel" value={formData.phoneNumber} required onChange={handleInputChange} />
                            </Stack>

                        </Stack>

                        <Box>
                            <TextField accept="image/*" type='file' id='image-upload' onChange={handleImageChange} sx={{ display: "none" }} />


                        </Box>
                        <label htmlFor='image-upload'>
                            <Box sx={{ display: "flex", gap: "1rem", alignItems: 'center' }}>
                                <Button variant="outlined" color="secondary" component="span" startIcon={<CloudUpload />}>
                                    Subir imagen
                                </Button>
                                <Typography variant='p'>{imageName}</Typography>

                            </Box>
                        </label>
                        <Box sx={{ display: "flex", gap: '1rem', justifyContent: 'end' }}>
                            <Button variant="contained" color="primary" type='submit' component="button" startIcon={<Save />}>Guardar</Button>
                        </Box>
                        <Collapse in={open}>
                            <Alert
                                action={
                                    <IconButton
                                        aria-label="close"
                                        color="inherit"
                                        size="small"
                                        onClick={() => {
                                            setOpen(false);
                                        }}
                                    >
                                        <Close fontSize="inherit" />
                                    </IconButton>
                                }
                                sx={{ mb: 2 }}
                            >
                                Perfil correctamente actualizado
                            </Alert>
                        </Collapse>

                    </Box>

                </CardContent>
            </Card>
        </>
    )
}