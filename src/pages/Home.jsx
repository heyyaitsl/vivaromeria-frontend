import { PilgrimageList } from "../pilgrimage/pilgrimageList/PilgrimageList";

export function Home({filter}) {
    return(
        <>
        <PilgrimageList filter={filter}/>
        </>
    )
}