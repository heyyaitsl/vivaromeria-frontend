import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

import { Box, Button, Hidden, TextField, Typography } from "@mui/material";
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import "dayjs/locale/es";
import { Close, CloudUpload, Save } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';


export function CreateFloats() {
    const urlBase = import.meta.env.VITE_URL_BASE + "floats";
    const navigate = useNavigate();
    const {id} = useParams();
    const [floats, setFloats] = useState([]);
    useEffect(() => {
        if(id){loadFloats();}
    }, [])
    const loadFloats = async () => {
        const result = await axios.get(`${urlBase}/${id}`)
        setFloats(result.data);
        console.log(result.data);
    }

    const [formData, setFormData] = useState({
        id: '',
        name: '',
        username: '',
        price:'',
        description: '',
        maxPeople: '',
        image: '',
        pilgrimages: ''
    });

    useEffect(() => {
        if (floats) { // Solo actualiza si floats no es null
            setFormData({
                id: floats.id || '',
                name: floats.name || '',
                username: floats.username || '',
                description: floats.description || '',
                price: floats.price || '',
                maxPeople: floats.maxPeople || '',
                image: floats.image || '',
                pilgrimages: floats.pilgrimages || ''
            });
        }
    }, [floats]);

    const [imageName, setImageName] = useState("No ha seleccionado ninguna imagen");

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
                image: reader.result.split(",")[1]
            })))
            setImageName(file.name);
        }
        if (file) {
            reader.readAsDataURL(file);
        }

    }
    const onSubmit = async (event) => {
        event.preventDefault();
        console.log('onSubmit');
        const response = await axios.post(urlBase, formData);
        console.log("Elemento guardado: ", response.data);
        navigate('/manage-floats')
    }

    return (
        <>
            <Box component={"form"} onSubmit={onSubmit} sx={{ display: "flex", flexDirection: "column", maxWidth: "50rem", gap: "1rem" }}>
                <TextField label="Nombre" name='name' value={formData.name} required onChange={handleInputChange} />
                <TextField label="Propietario" name='username' value={formData.username} onChange={handleInputChange}  required/>
                <TextField label="Máximo personas" type='number' name='maxPeople' value={formData.maxPeople} onChange={handleInputChange} required />
                <TextField label="Precio (en euros)" type='number' name='price' value={formData.price} onChange={handleInputChange} required/>
                <TextField label="Descripción" slotProps={{ input: { inputProps: { maxLength: 500 } } }} helperText={`${formData.description.length}/900`} multiline rows={4} name='description' value={formData.description} onChange={handleInputChange} />
                <Box>
                    <TextField accept="image/*" type='file' id='image-upload' onChange={handleImageChange} sx={{ display: "none" }} />

                    <label htmlFor='image-upload'>
                        <Box sx={{ display: "flex", gap: "1rem" }}>
                            <Typography variant='p'>{imageName}</Typography>
                            <Button variant="contained" color="secondary" component="span" startIcon={<CloudUpload />}>
                                Subir imagen
                            </Button>
                        </Box>
                    </label>
                </Box>
                <Box sx={{display:"grid", gridTemplateColumns:'1fr 1fr', gap: '1rem'}}>
                <Button variant="contained" color='error' component="a" href='/manage-floats' startIcon={<Close />}>Cancel</Button>
                <Button variant="contained" color="primary" type='submit' component="button" startIcon={<Save />}>Guardar</Button>
                </Box>
            </Box>
        </>
    )
}