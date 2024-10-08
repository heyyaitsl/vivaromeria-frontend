import { IconBox } from "./IconBox";

export function LoggedBar() {
    return (
        <>
            <div className="left-fields">
                <img className="icons-nav" src="/conversacion.png" alt="mensaje" />
                <img className="icons-nav" src="/notificacion.png" alt="mensaje" />
                <div>
                    <div className="profile">
                        <img className="profile-img" src="https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/e40b6ea6361a1abe28f32e7910f63b66/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg" alt="Usuario" />
                        <img className="icons" src="/flecha-hacia-abajo-para-navegar.png" alt="opciones" />
                    </div>
                    <IconBox />
                </div>
            </div>
        </>
    )
}