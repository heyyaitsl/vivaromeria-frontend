import './Menu.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { SearchBar } from './SearchBar'
import { LoggedBar } from './LoggedBar'
import { LogoutBar } from './LogoutBar'
export function Menu({isLogged}) {
    return (
        <header>
            <nav className="navbar">

                <div className="navbar-logo">
                    <a href="/">
                        <img src="/public/logo.png" alt="Romería Viva" />
                    </a>
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