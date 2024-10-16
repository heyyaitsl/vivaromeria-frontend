import { useNavigate, useParams } from "react-router-dom";
import { FormTicket } from "../ticket/FormTicket";
import { useEffect } from "react";

export function BuyTicketPage({isLogged}) {
    const navigate = useNavigate();
    const {idPilgrimage, idFloat} = useParams();
    console.log(isLogged);

    /*useEffect(() => {
        if (!isLogged) {
            console.log("estoy dentro")
            //navigate('/login'); // Redirige al login si no está logueado
        }
    }, [isLogged]); */

    // Renderiza solo si el usuario está logueado
    
    return(
        <>
        
        {isLogged ? (
            <FormTicket idPilgrimage={idPilgrimage} idFloat={idFloat}></FormTicket>
            ) : 
                navigate('/login')
            
        }
        </>
    )
}