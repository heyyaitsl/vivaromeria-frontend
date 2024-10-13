export function IconBox(){
    const logout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
      };
    return(
        <div className="icon-box">
            <ul className="profile-list">
                <li className="profile-element">Configuración</li>
                <li className="profile-element">Ver entradas</li>
                <li onClick={logout} className="profile-element">Cerrar sesión</li>
            </ul>
        </div>
    )
}