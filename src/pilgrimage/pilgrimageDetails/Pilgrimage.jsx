import { Avatar, Box, Button, Card, CardContent, Container, Grid2, InputLabel, MenuItem, Rating, Select, Stack, Typography } from "@mui/material"
import './Pilgrimage.css'
import { useParams } from "react-router-dom";
import { getDate } from 'src/common/dateUtils'
import { useEffect, useState } from "react";
import axios from "axios";
import { getHour } from "../../common/dateUtils";
import { AccessTimeOutlined, CalendarTodayOutlined, LanguageOutlined, PlaceOutlined } from "@mui/icons-material";
import { FloatList } from "../../floats/FloatList";

export function Pilgrimage({ id }) {
    const role = localStorage.getItem('role');
    const urlBase = import.meta.env.VITE_URL_BASE + "pilgrimages";
    const urlBaseFloats = import.meta.env.VITE_URL_BASE + "floats";
    const urlBaseComments = import.meta.env.VITE_URL_BASE + "comments";

    const [pilgrimage, setPilgrimage] = useState([]);
    useEffect(() => {
        loadPilgrimage();
    }, [])
    const [comments, setComments] = useState([]);
    useEffect(() => {
        loadComments();
    }, [])
    const loadPilgrimage = async () => {
        const result = await axios.get(`${urlBase}/${id}`)
        setPilgrimage(result.data);
        console.log(result.data);
    }
    const loadComments = async () => {
        const result = await axios.get(`${urlBaseComments}/pilgrimage/${id}`)
        setComments(result.data);
        console.log(result.data);
    }
    const [floats, setFloats] = useState([]);
    useEffect(() => {
        loadFloats()
    }, [])
    const loadFloats = async () => {
        const result = await axios.get(`${urlBaseFloats}`);
        console.log(result.data);
        setFloats(result.data);
    }
    const username = localStorage.getItem('username');
    const filteredFloats = floats.filter(float => float.username === username);

    const [selectedFloat, setSelectedFloat] = useState('');


    const onSubmit = async (e) => {
        e.preventDefault();

        const response = await axios.get(`${urlBase}/${id}/addFloat/${selectedFloat}`);
        console.log(response.data);

    };

    return (
        <>
            <Container >
                <Stack spacing={3}>
                    <img className="pilgrimage-details-img" src={pilgrimage.image ? "data:image/png;base64," + pilgrimage.image : "/image-not-available.png"} alt="romeria"></img>
                    <Stack spacing={1}>
                        <Typography sx={{ fontWeight: "600" }} variant="h3"> {pilgrimage.name}</Typography>
                        <Stack sx={{opacity:'90%'}} direction="row" spacing={2}>
                            <Box sx={{ display: 'flex', gap: '0.8rem' }}>
                                <CalendarTodayOutlined />
                                <Typography variant="h5">{getDate(pilgrimage.date)}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', gap: '0.8rem' }}>

                                <AccessTimeOutlined />
                                <Typography variant="h5">{getHour(pilgrimage.date)}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', gap: '0.8rem' }}>

                                <PlaceOutlined />
                                <Typography variant="h5">{pilgrimage.place}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', gap: '0.8rem' }}>

                                <LanguageOutlined />
                                <Typography color="primary" variant="h5"><a href={pilgrimage.url}>Sitio web oficial</a></Typography>
                            </Box>
                           

                        </Stack>
                        
                    </Stack>
                    <Stack spacing={1}>
                    <Typography sx={{ fontWeight: "600" }} variant="h4"> Descripción</Typography>
                    <Typography sx={{opacity:'90%'}} variant="h5">{pilgrimage.description}</Typography>
                    </Stack>
                    <Stack spacing={1}>
                    <Typography sx={{ fontWeight: "600" }} variant="h4"> Ruta</Typography>
                    <Typography sx={{opacity:'90%'}} variant="h5">{pilgrimage.route}</Typography>
                    </Stack>

                    <Stack spacing={1}>
                        <Typography sx={{ fontWeight: "600" }} variant="h4"> Comentarios </Typography>
                        <Card >
                                <CardContent sx={{display:'flex',  gap:'1rem'}}>

                                <Avatar></Avatar>
                                <Stack spacing={0.5}>
                                <Box sx={{display:'flex', justifyContent:'space-between'}}>
                                <Typography sx={{ fontWeight: "600" }} variant="h6">Ana Santana</Typography>
                                <Rating name="read-only" value='3' readOnly /></Box>
                                <Typography sx={{opacity:'80%'}} variant="p">20 de noviembre de 2023</Typography>
                                <Typography sx={{textAlign:"justify"}} variant="p">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam et tempus mi. Quisque feugiat quam magna. Morbi neque nisl, tincidunt vel ex vitae, efficitur volutpat sem. Morbi dictum iaculis egestas. Proin dignissim blandit nunc eu scelerisque. Donec rutrum lorem eu augue congue, non mollis arcu auctor. Curabitur ultrices sem ut metus porttitor cursus. Nulla eget dui est. Aliquam erat volutpat.</Typography>
                                </Stack>
                                </CardContent>
                        </Card>
                    </Stack>
                    <Stack spacing={1}>
                        <Typography sx={{ fontWeight: "600" }} variant="h4"> Carrozas disponibles </Typography>
                        <FloatList id={id}/>
                    </Stack>
                </Stack>
            </Container>

        </>
    )
}