import axios from 'axios';
import { useEffect, useState } from 'react';
import { PilgrimageListElement } from './PilgrimageListElement';
import { Box, Button, Link } from '@mui/material';
import { PilgrimagePage } from '../../pages/PilgrimagePage';
import { generatePath, useNavigate } from 'react-router-dom';

export function PilgrimageList(){
    const urlBase = import.meta.env.VITE_URL_BASE + 'pilgrimages';
        const[pilgrimages, setPilgrimages] = useState([]);
        useEffect(() => {
            loadPilgrimages();
        },[]);
        const loadPilgrimages = async () => {
            const result = await axios.get(urlBase);
            console.log("Result:");
            console.log(result.data);
            setPilgrimages(result.data);
        }




    
    
    return (
        <>
        {pilgrimages.map((pilgrimage, id) => (
            <Link key={id} href={generatePath("/:id", {id: pilgrimage.id})} sx={{textDecoration:"none"}}>
            <PilgrimageListElement name={pilgrimage.name} place={pilgrimage.place}
            date={pilgrimage.date} status={pilgrimage.status} image={pilgrimage.image}/></Link>
        ))}
        </>
    )
}