import { useEffect, useState } from "react";
import { FloatCard } from "./FloatCard";
import axios from "axios";
import { Box, Stack } from "@mui/material";

export function FloatList({id}) {
    const urlBase = import.meta.env.VITE_URL_BASE+"pilgrimages/" + id + "/floats";
    const [floats, setFloat] = useState([]);

    useEffect(() => {loadFloats()},[]);

    const loadFloats = async() => {
        const result = await axios.get(urlBase);
        console.log(result.data);
        setFloat(result.data);
    }

    return(

        <>
        <Stack spacing={1}>
        {floats.map((float, idKey) => (

        <FloatCard key={idKey} name={float.name} description={float.description} username={float.username}
         price={float.price} image={float.image} maxPeople={float.maxPeople} idFloat={float.id} idPilgrimage={id}/>
 ))}
        </Stack>
        </>
    )
}