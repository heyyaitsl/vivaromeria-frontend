import './Menu.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

export function Menu() {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <img src="/public/logo.png" alt="Romería Viva" />
            </div>
            <div className="search-container">
                <input type="text" placeholder="Buscar romería" className="search-bar" />
                <button className="search-button">
                    <i className="fas fa-search"></i>
                </button>
            </div>
            <div className="navbar-icons">
                <i className="fas fa-bell"></i>
                <i className="fas fa-cog"></i>
                <div className="profile">
                    <img src="profile.jpg" alt="Usuario" />
                </div>
            </div>
        </nav>
    )

}