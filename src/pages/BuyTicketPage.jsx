import { useParams } from "react-router-dom";
import { FormTicket } from "../ticket/FormTicket";

export function BuyTicketPage() {
    const {idPilgrimage, idFloat} = useParams();
    return(
        <>
            <FormTicket idPilgrimage={idPilgrimage} idFloat={idFloat}></FormTicket>
        </>
    )
}