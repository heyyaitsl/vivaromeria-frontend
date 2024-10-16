import { useEffect, useState } from "react";
import { IconBox } from "./IconBox";
import axios from "axios";

export function LoggedBar() {
    const [isIconBoxOpen, setIsIconBoxOpen] = useState(false);

    const urlBase = import.meta.env.VITE_URL_BASE+"user/"+localStorage.getItem('username');
    const [user, setUser] = useState([]);
    useEffect(() => {
        loadUser();
},[])
    const loadUser = async () => {
        const result = await axios.get(urlBase);
        setUser(result.data);
    }
  const toggleIconBox = () => {
    setIsIconBoxOpen(!isIconBoxOpen);
  };
    return (
        <>
            <div className="left-fields">
                <img className="icons-nav" src="/conversacion.png" alt="mensaje" />
                <img className="icons-nav" src="/notificacion.png" alt="mensaje" />
                <div>
                    <div className="profile">
                    <button onClick={toggleIconBox} className="user-menu-button">
                        <img className="profile-img" src={user.photo ? "data:image/png;base64,"+user.photo : "/image-not-available.png"} alt="Usuario" />
                        <img className={`icons user-menu-icon ${isIconBoxOpen ? 'open' : ''}`} src="/flecha-hacia-abajo-para-navegar.png" alt="opciones" />
                        </button>
                    </div>

                    {isIconBoxOpen && <IconBox closeMenu={toggleIconBox}/>}
                </div>
            </div>
        </>
    )
}