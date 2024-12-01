import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

import { Box, Button, Card, CardContent, FormControl, InputLabel, MenuItem, Modal, Select, TextField, Typography } from "@mui/material";
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import "dayjs/locale/es";
import { Close, CloudUpload, Save } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';


export function CreatePilgrimage({open, close, reload, id}) {
    const token = localStorage.getItem('token'); 
    const urlBase = import.meta.env.VITE_URL_BASE + "pilgrimages";
    const navigate = useNavigate();
    const [pilgrimage, setPilgrimage] = useState([]);
    const [title, setTitle] = useState("Añadir romería");
    const [imageName, setImageName] = useState("No ha seleccionado ninguna imagen");

    useEffect(() => {
        if (id) { loadPilgrimage(); }else{setPilgrimage([]); setTitle("Añadir romería")}
    }, [id])
    const loadPilgrimage = async () => {
        const result = await axios.get(`${urlBase}/${id}`)
        setPilgrimage(result.data);
        setTitle("Editar romería")
        console.log(result.data);
    }
    const loadFormData = () =>{
        setFormData({
            id: '',
        name: '',
        status: '',
        date: dayjs(),
        description: '',
        place: '',
        route: '',
        url: '',
        image: '',
        floatsId: [], 
        commentsId: []
        })
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
        floatsId: [],
        commentsId: []

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
                floatsId: pilgrimage.floatsId || [],
                commentsId: pilgrimage.commentsId ||  []
            
            });
            setImageName(pilgrimage.image? "Imagen seleccionada" : "No se ha seleccionado ninguna imagen");

        }else{
            loadFormData();
        }
    }, [pilgrimage]);


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
        close();
        reload();
        loadFormData();

    }
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 700,
        height: 500,
        bgcolor: 'background.paper',
        boxShadow: 24,
      };

    return (
        <>
        <Modal open={open} onClose={close}>

<Card style={style}>
<Box sx={{backgroundColor: "var(--blue)"}}>
    <Typography color='white' sx={{ padding: '2rem'}}variant='h4'>{title}</Typography>

    </Box>
    <CardContent sx={{overflow:'scroll', height: 450, display:'flex', flexDirection:'column', gap:'1rem'}}>
            <Box component={"form"} onSubmit={onSubmit} sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <Box sx={{ display: "grid", gap: "1rem", gridTemplateColumns: "1fr 1fr"}}>

                <TextField  label="Nombre" name='name' value={formData.name} required onChange={handleInputChange} />
                <FormControl >
                <InputLabel id="status-label">Estado*</InputLabel>
                <Select 
                    labelId="status-label"
                    label="Estado"
                    name='status'
                    value={formData.status}
                    onChange={handleInputChange}
                    required
                >
                    <MenuItem value={1}>Finalizada</MenuItem>
                    <MenuItem value={2}>Cancelada</MenuItem>
                    <MenuItem value={3}>Próximamente</MenuItem>
                </Select></FormControl>
                </Box>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='es' >
                    <Box sx={{ display: "flex", gap: "1rem" }}>
                        <DatePicker sx={{flexGrow:'0.5'}} label='Fecha*' value={formData.date} onChange={handleDateChange} />
                        <TimePicker sx={{flexGrow:'0.5'}} label='Hora*' value={formData.date} onChange={handleDateChange} /> </Box>
                </LocalizationProvider>
                <Box sx={{ display: "flex", gap: "1rem"}}>

                <TextField sx={{flexGrow:'0.5'}}  label="Municipio" name='place' value={formData.place} onChange={handleInputChange} required />
                <TextField sx={{flexGrow:'0.5'}} label="Página web (opcional)" name='url' value={formData.url} onChange={handleInputChange} />
                </Box>
                <TextField label="Descripción" slotProps={{ input: { inputProps: { maxLength: 3000 } } }} helperText={`${formData.description.length}/3000`} multiline rows={10} name='description' value={formData.description} onChange={handleInputChange} />
                <Box  sx={{ display: "grid", gap: "1rem", gridTemplateColumns: "1fr 1fr", alignItems:"center"}}>

                <TextField label="Ruta (ej. Desde la iglesia hasta el edificio del cabildo)" name='route' value={formData.route} onChange={handleInputChange} />
                <Box  >
                    <TextField accept="image/*" type='file' id='image-upload' onChange={handleImageChange} sx={{ display: "none" }} />

                    <label htmlFor='image-upload'>
                        <Box sx={{ display: "flex", gap: "1rem", alignItems:'center' }}>
                            <Button variant="outlined" color="secondary" component="span" startIcon={<CloudUpload />}>
                                Subir imagen
                            </Button>
                            <Typography variant='p'>{imageName}</Typography>

                        </Box>
                    </label>
                </Box></Box>
                
                <Box sx={{display:"flex", gap: '1rem', justifyContent:'end'}}>
                <Button variant="text" onClick={close}>Cancelar</Button>
                <Button variant="contained" color="primary" type='submit' component="button" startIcon={<Save />}>Guardar</Button>
                </Box>
            </Box>
            </CardContent>
            </Card>
            </Modal>
        </>
    )
}