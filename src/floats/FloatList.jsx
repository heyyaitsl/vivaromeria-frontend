import { useEffect, useState } from "react";
import { FloatCard } from "./FloatCard";
import axios from "axios";
import { Box, Stack } from "@mui/material";

export function FloatList({id}) {
    const urlBase = "http://localhost:8080/pilgrimages/" + id + "/floats";
    const [floats, setFloat] = useState([]);

    useEffect(() => {loadFloats()},[]);

    const loadFloats = async() => {
        const result = await axios.get(urlBase);
        console.log(result.data);
        setFloat(result.data);
    }

    return(

        <>
        <Box sx={{display:"flex", gap:"1rem"}}>
        {floats.map((float, id) => (

        <FloatCard key={id} name={float.name} description={float.description} price={float.price} maxPeople={float.maxPeople} />
 ))}
        </Box>
        </>
    )
}