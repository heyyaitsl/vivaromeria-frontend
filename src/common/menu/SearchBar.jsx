export function SearchBar(options) {
    return (
        <div className="search-container">
            <input type="text" placeholder="Buscar romería" className="search-bar" />
            <button className="search-button">
                <img className="icons" src="/public/lupa.png" alt="lupa" />
            </button>
        </div>
    )
}