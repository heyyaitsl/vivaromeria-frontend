import { Box, Button, Card, CardContent, Modal, TextField, Typography } from "@mui/material";
import "dayjs/locale/es";
import { Close, CloudUpload, Save } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';


export function CreateFloats({open, close, reload, id}) {
    const urlBase = import.meta.env.VITE_URL_BASE + "floats";
    const token = localStorage.getItem('token'); 
    const username= localStorage.getItem('username');
    const [floats, setFloats] = useState([]);
    const [title, setTitle] = useState("Añadir carroza");
    const [imageName, setImageName] = useState("No ha seleccionado ninguna imagen");


    useEffect(() => {
        if(id){loadFloats();}else{setFloats([]);setTitle("Añadir carroza");}
    }, [id])
    const loadFloats = async () => {
        const result = await axios.get(`${urlBase}/${id}`)
        setFloats(result.data);
        setTitle("Editar carroza")
        console.log(result.data);
    }

    const loadFormData = () =>{
        setFormData({
            id: '',
            name: '',
            username: username,
            price:'',
            description: '',
            maxPeople: '',
            image: '',
            pilgrimages: {} 
        });
        
    }

    const [formData, setFormData] = useState({
        id: '',
        name: '',
        username: username,
        price:'',
        description: '',
        maxPeople: '',
        image: '',
        pilgrimages: {}
    });


    useEffect(() => {
        if (floats) { // Solo actualiza si floats no es null
            setFormData({
                id: floats.id || '',
                name: floats.name || '',
                username: floats.username || username,
                description: floats.description || '',
                price: floats.price || '',
                maxPeople: floats.maxPeople || '',
                image: floats.image || '',
                pilgrimages: floats.pilgrimages || {}
            });
            setImageName(floats.image? "Imagen seleccionada" : "No se ha seleccionado ninguna imagen");
        }else{
            loadFormData();
        }
    }, [floats]);


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
        console.log('onSubmit llega');
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
            <Typography  color="white" sx={{ padding: '2rem'}}variant='h4'>{title}</Typography>

            </Box>
            <CardContent sx={{overflow:'scroll', height: 450, display:'flex', flexDirection:'column', gap:'1rem'}}>
            <Box component={"form"} onSubmit={onSubmit} sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <Box sx={{ display: "flex", gap: "1rem"}}>
                <TextField sx={{flexGrow:'0.5'}} label="Nombre" name='name' value={formData.name} required onChange={handleInputChange} />
                <TextField sx={{flexGrow:'0.5'}} label="Propietario" name='username' value={formData.username}  disabled/></Box>
                <Box sx={{ display: "flex", gap: "1rem"}}>
                <TextField sx={{flexGrow:'0.5'}} label="Precio (en euros)" type='number' name='price' value={formData.price} onChange={handleInputChange} required/> 
                <TextField sx={{flexGrow:'0.5'}} label="Aforo máximo" type='number' name='maxPeople' value={formData.maxPeople} onChange={handleInputChange} required />
                </Box>
                <Box>
                    <TextField accept="image/*" type='file' id='image-upload' onChange={handleImageChange} sx={{ display: "none" }} />

                    
                </Box>
                <TextField label="Descripción" slotProps={{ input: { inputProps: { maxLength: 1000 } } }} helperText={`${formData.description.length}/1000`} multiline rows={10} name='description' value={formData.description} onChange={handleInputChange} />
                <label htmlFor='image-upload'>
                        <Box sx={{ display: "flex", gap: "1rem", alignItems:'center' }}>
                            <Button variant="outlined" color="secondary" component="span" startIcon={<CloudUpload />}>
                                Subir imagen
                            </Button>
                            <Typography variant='p'>{imageName}</Typography>

                        </Box>
                    </label>
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