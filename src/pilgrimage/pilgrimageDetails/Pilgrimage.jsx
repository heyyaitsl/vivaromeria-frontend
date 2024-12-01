import { Avatar, Box, Button, Card, CardContent, Container, Fab, Grid2, IconButton, InputLabel, MenuItem, Modal, Rating, Select, Stack, Typography } from "@mui/material"
import './Pilgrimage.css'
import { useParams } from "react-router-dom";
import { getDate } from 'src/common/dateUtils'
import { useEffect, useState } from "react";
import axios from "axios";
import { getHour } from "../../common/dateUtils";
import { AccessTimeOutlined, Add, CalendarTodayOutlined, Delete, Edit, LanguageOutlined, Padding, PlaceOutlined } from "@mui/icons-material";
import { FloatList } from "../../floats/FloatList";
import { SelectFloat } from "../../floats/SelectFloat";
import { CreatePilgrimage } from "../CreatePilgrimage";
import { CreateComment } from "./CreateComment";
import { useAuth } from "../../AuthContext";

export function Pilgrimage({ id }) {
    const role = localStorage.getItem('role');
    const { isLogged } = useAuth();
    const urlBase = import.meta.env.VITE_URL_BASE + "pilgrimages";
    const urlBaseFloats = import.meta.env.VITE_URL_BASE + "floats";
    const urlBaseComments = import.meta.env.VITE_URL_BASE + "comments";
    const urlBaseUser = import.meta.env.VITE_URL_BASE + "user";
    const [openModalFloat, setOpenModalFloat] = useState(false);
    const [userComment, setUserComment] = useState();
    const handleModalFloatOpen = () => setOpenModalFloat(true);
    const handleModalFloatClose = () => setOpenModalFloat(false);

    const [openModalPilgrimage, setOpenModalPilgrimage] = useState(false);
  const handleModalPilgrimageOpen = () => setOpenModalPilgrimage(true);
  const handleModalPilgrimageClose = () => setOpenModalPilgrimage(false);
  const [openModalComment, setOpenModalComment] = useState(false);
  const handleModalCommentOpen = () => setOpenModalComment(true);
  const handleModalPCommentClose = () => setOpenModalComment(false);
  const [keyComment, setKeyComment] = useState(0);

  const reloadComment = () => {
    console.log('reloading comment');
    setKeyComment(keyComment + 1);
  };

  const [keyPilgrimage, setKeyPilgrimage] = useState(0);

  const reloadComponentPilgrimage = () => {
    setKeyPilgrimage(prevKey => prevKey + 1);
  };

    const [pilgrimage, setPilgrimage] = useState([]);
    useEffect(() => {
        loadPilgrimage();
    }, [keyPilgrimage])
    const [comments, setComments] = useState([]);
    useEffect(() => {
        console.log('Entro useEffect')
        loadComments();
    }, [keyComment])
    const loadPilgrimage = async () => {
        const result = await axios.get(`${urlBase}/${id}`)
        setPilgrimage(result.data);
        console.log(result.data);
    }
    const loadComments = async () => {
        const result = await axios.get(`${urlBaseComments}/pilgrimage/${id}`)
        setComments(result.data);
        console.log(result.data);
        const usernames = result.data.map(comment => comment.username);
        loadUsers(usernames);
    }

    const loadUsers = async (usernames) => {
        const userRequests = usernames.map(username => axios.get(`${urlBaseUser}/${username}`));
        const usersData = await Promise.all(userRequests);

        const users = usersData.map(user => user.data);
        setUserComment(users);
    }
    const [floats, setFloats] = useState([]);
    const onSubmit = async (e) => {
        e.preventDefault();

        const response = await axios.get(`${urlBase}/${id}/addFloat/${selectedFloat}`);
        console.log(response.data);
        handleModalFloatClose();
        reloadComponent();

    };
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

    const [key, setKey] = useState(0);

    const reloadComponent = () => {
        setKey(prevKey => prevKey + 1);
    };


    return (
        <>
            <Container >
                <Stack  spacing={3}>
                    <Box sx={{position:"relative", display:"inline-block"}}>
                    <img className="pilgrimage-details-img" 
                    src={pilgrimage.image ? "data:image/png;base64," + pilgrimage.image : "/image-not-available.png"} 
                    alt="romeria"></img>
                    {role === 'ROLE_ADMIN' &&(
                    <Box sx={{position:"absolute", right:"1rem", top: "1rem", display:"flex", gap:"0.5rem"}}>
                    <Fab size="small" color="primary" onClick={handleModalPilgrimageOpen}><Edit/></Fab>
                    <Fab  size="small" color="error"><Delete/></Fab></Box>)}
                </Box>
                    <Stack spacing={1}>
                        <Typography sx={{ fontWeight: "600" }} variant="h3"> {pilgrimage.name}</Typography>
                        <Stack sx={{ opacity: '90%' }} direction="row" spacing={2}>
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
                        <Typography sx={{ opacity: '90%' }} variant="h5">{pilgrimage.description}</Typography>
                    </Stack>
                    <Stack spacing={1}>
                        <Typography sx={{ fontWeight: "600" }} variant="h4"> Ruta</Typography>
                        <Typography sx={{ opacity: '90%' }} variant="h5">{pilgrimage.route}</Typography>
                    </Stack>

                    <Stack spacing={1}>
                        <Box sx={{display:'flex', gap:'1rem', alignItems:'center'}}>
                        <Typography sx={{ fontWeight: "600" }} variant="h4"> Comentarios </Typography>
                        {isLogged &&
                        <Fab size='small' color="primary" aria-label="add" onClick={handleModalCommentOpen}>
                            <Add />
                        </Fab>}
                        </Box>
                        {comments.length > 0 ? comments.map(comment => {
                            const user = userComment && userComment.length > 0
                                ? userComment.find(user => user.username === comment.username)
                                : null; return (
                                    <Card key={comment.id}>
                                        <CardContent sx={{ display: 'flex', gap: '1rem' }}>

                                            <Avatar  className="profile-img" src={user? "data:image/png;base64,"+user.photo : ""} alt="Usuario" ></Avatar>
                                            <Stack spacing={0.5} sx={{ width: '100%' }}>
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <Typography sx={{ fontWeight: "600" }} variant="h6">{user ? user.name : "Cargando..."}</Typography>
                                                    <Rating name="read-only" value={comment.valoration} readOnly /></Box>
                                                <Typography sx={{ opacity: '80%' }} variant="p">{getDate(comment.date)+ " | " + getHour(comment.date)}</Typography>
                                                <Typography sx={{ textAlign: "justify" }} variant="p">{comment.description}</Typography>
                                            </Stack>
                                        </CardContent>
                                    </Card>)
                        })
                            : <Typography sx={{ opacity: '90%' }} variant="h5">No hay comentarios aún</Typography>}
                    </Stack>
                    <Stack spacing={1}>
                        <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <Typography sx={{ fontWeight: "600" }} variant="h4"> Carrozas disponibles </Typography>
                            {role == 'ROLE_FLOATS' ? <>
                                <Fab size='small' color="primary" aria-label="add" onClick={handleModalFloatOpen}>
                                    <Add />
                                </Fab>
                                <Modal open={openModalFloat} onClose={handleModalFloatClose}
                                >
                                    <SelectFloat floats={filteredFloats} selectFloat={setSelectedFloat} onSubmit={onSubmit} />
                                </Modal></> : <></>}</Box>
                        <FloatList key={key} id={id} />
                    </Stack>
                </Stack>
                <CreatePilgrimage open={openModalPilgrimage} id={id} close={handleModalPilgrimageClose} reload={reloadComponentPilgrimage}/>
                <CreateComment open={openModalComment} close={handleModalPCommentClose} reload={reloadComment} pilgrimageId={id}/>
            </Container>

        </>
    )
}