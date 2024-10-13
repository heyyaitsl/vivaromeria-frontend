import { useState } from "react";
import { IconBox } from "./IconBox";

export function LoggedBar() {
    const [isIconBoxOpen, setIsIconBoxOpen] = useState(false);

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
                        <img className="profile-img" src="https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/e40b6ea6361a1abe28f32e7910f63b66/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg" alt="Usuario" />
                        <img className={`icons user-menu-icon ${isIconBoxOpen ? 'open' : ''}`} src="/flecha-hacia-abajo-para-navegar.png" alt="opciones" />
                        </button>
                    </div>

                    {isIconBoxOpen && <IconBox closeMenu={toggleIconBox}/>}
                </div>
            </div>
        </>
    )
}