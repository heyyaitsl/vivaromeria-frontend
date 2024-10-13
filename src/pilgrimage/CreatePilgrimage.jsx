import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

import { Box, Button, Hidden, MenuItem, Select, TextField, Typography } from "@mui/material";
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import "dayjs/locale/es";
import { Close, CloudUpload, Save } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';


export function CreatePilgrimage() {
    const token = localStorage.getItem('token'); 
    const urlBase = import.meta.env.VITE_URL_BASE + "pilgrimages";
    const navigate = useNavigate();
    const { id } = useParams();
    const [pilgrimage, setPilgrimage] = useState([]);
    useEffect(() => {
        if (id) { loadPilgrimage(); }
    }, [])
    const loadPilgrimage = async () => {
        const result = await axios.get(`${urlBase}/${id}`)
        setPilgrimage(result.data);
        console.log(result.data);
    }

    const [formData, setFormData] = useState({
        id: '',
        name: '',
        status: '',
        date: dayjs(),
        description: '',
        place: '',
        route: '',
        url: '',
        image: '',
        floatsId: ''
    });

    useEffect(() => {
        if (pilgrimage) { // Solo actualiza si pilgrimage no es null
            setFormData({
                id: pilgrimage.id || '',
                name: pilgrimage.name || '',
                status: pilgrimage.status || '',
                date: dayjs(pilgrimage.date) || dayjs(),
                description: pilgrimage.description || '',
                place: pilgrimage.place || '',
                route: pilgrimage.route || '',
                url: pilgrimage.url || '',
                image: pilgrimage.image || '',
                floatsId: pilgrimage.floatsId || ''
            });
        }
    }, [pilgrimage]);

    const [imageName, setImageName] = useState("No ha seleccionado ninguna imagen");

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState => ({
            ...prevState,
            [name]: value,
        })))
    };

    const handleDateChange = (newDate) => {
        setFormData((prevState => ({
            ...prevState,
            date: newDate
        })))
        console.log(formData.date.toISOString())
    }

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
        console.log(formData.status);
        const response = await axios.post(urlBase, formData, {headers: {
            'Authorization': `Bearer ${token}` // Incluye el token en el header
          }});
        console.log("Elemento guardado: ", response.data);
        navigate('/manage-pilgrimages')

    }

    return (
        <>
            <Box component={"form"} onSubmit={onSubmit} sx={{ display: "flex", flexDirection: "column", maxWidth: "50rem", gap: "1rem" }}>
                <TextField label="Nombre" name='name' value={formData.name} required onChange={handleInputChange} />
                <Select
                    label="Estado"
                    name='status'
                    value={formData.status}
                    onChange={handleInputChange}
                >
                    <MenuItem value={1}>Realizado</MenuItem>
                    <MenuItem value={2}>Cancelado</MenuItem>
                    <MenuItem value={3}>Pendiente</MenuItem>
                </Select>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='es' >
                    <Box sx={{ display: "flex", gap: "1rem" }}>
                        <DatePicker label='Fecha' value={formData.date} onChange={handleDateChange} />
                        <TimePicker label='Hora' value={formData.date} onChange={handleDateChange} /> </Box>
                </LocalizationProvider>

                <TextField label="Municipio" name='place' value={formData.place} onChange={handleInputChange} required />
                <TextField label="Descripción" slotProps={{ input: { inputProps: { maxLength: 900 } } }} helperText={`${formData.description.length}/900`} multiline rows={4} name='description' value={formData.description} onChange={handleInputChange} />
                <TextField label="Página web (opcional)" name='url' value={formData.url} onChange={handleInputChange} />
                <TextField label="Ruta (ej. Desde la iglesia hasta el edificio del cabildo)" name='route' value={formData.route} onChange={handleInputChange} />
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
                <Button variant="contained" color='error' component="a" href='/manage-pilgrimages' startIcon={<Close />}>Cancel</Button>
                <Button variant="contained" color="primary" type='submit' component="button" startIcon={<Save />}>Guardar</Button>
                </Box>
            </Box>
        </>
    )
}