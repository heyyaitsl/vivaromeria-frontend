import axios from 'axios';
import { useEffect, useState } from 'react';
import { PilgrimageListElement } from './PilgrimageListElement';

export function PilgrimageList(){
    const urlBase = "http://localhost:8080/pilgrimages";
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
            <PilgrimageListElement name={pilgrimage.name} place={pilgrimage.place}
            date={pilgrimage.date} status={pilgrimage.status}/>
        ))}
        </>
    )
}