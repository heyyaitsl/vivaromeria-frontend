import './Menu.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { SearchBar } from './SearchBar'
import { LoggedBar } from './LoggedBar'
import { LogoutBar } from './LogoutBar'
import { useAuth } from '../../AuthContext'
import { Link } from 'react-router-dom'
export function Menu() {
    const { isLogged } = useAuth();

    return (
        <header className='header'>
            <nav className="navbar">

                <div className="navbar-logo">
                    <Link to = "/">
                        <img src="/logo.png" alt="Romería Viva" />
                    </Link>
                </div>
                <SearchBar/>
                
                {isLogged
                ? <LoggedBar/>
                : <LogoutBar/>
                }

            </nav>
        </header>
    )

}