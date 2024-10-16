import { useNavigate, useParams } from "react-router-dom";
import { FormTicket } from "../ticket/FormTicket";
import { useEffect } from "react";
import { useAuth } from "../AuthContext";

export function BuyTicketPage() {
    const { isLogged } = useAuth();

    const navigate = useNavigate();
    const {idPilgrimage, idFloat} = useParams();

    useEffect(() => {
        if (!isLogged) {
            navigate('/login'); // Redirige al login si no está logueado
        }
    }, [isLogged]); 

    // Renderiza solo si el usuario está logueado
    if(!isLogged) {return null;}
    return(
        <>
        
        
            <FormTicket idPilgrimage={idPilgrimage} idFloat={idFloat}></FormTicket>
            
        </>
    )
}