import { useState } from 'react'
import { Link } from 'react-router-dom'
import './tvshows.css'
import Row from './row.jsx'
import Small from './smallRow.jsx'


export default function TV() {
    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!query.trim()) {
            setSearchResults([]);  // Clear the search results when the query is empty
            return;
        }
        // console.log('Searching for:', query); 
        const API_KEY = "07b8d3f3ad2175d9d7b7c82d3481aae8"
        const SEARCH_API_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`;
        const response = await fetch(SEARCH_API_URL);
        const data = await response.json();
        setSearchResults(data.results);
        console.log('Search results:', data.results);
    };


    return (
        <>
            <nav className="navbar1">
                <Link to="/" className="not-netflix">
                    <p className="title">Not Netflix</p>
                </Link>
                <div className="menu">
                    <Link to="/" className="home">
                        <p>Home</p>
                    </Link>
                    <Link to="/tv-shows" className="tv">
                        <p>TV Shows</p>
                    </Link>
                    <Link to="/movies" className="movies">
                        <p>Movies</p>
                    </Link>
                </div>
                <form onSubmit={handleSubmit} className="search-form">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                            if (!e.target.value.trim()) {
                                setSearchResults([]);  // Clear the search results when the query is empty
                            }
                        }}
                        placeholder="Search..."
                        className="search-input"
                    />
                </form>
            </nav>

            <div className="results-grid">
                {searchResults.map(movie => (
                    <div key={movie.id} className="result-item">
                        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                        <h3>{movie.title}</h3>
                    </div>
                ))}
            </div>
            <div className="posters">
                {!query && <Row title="Noir" fetchURL="https://api.themoviedb.org/3/discover/movie?with_genres=9648" />}
                {!query && <Small title="Gangster Movies" fetchURL="https://api.themoviedb.org/3/discover/movie?with_genres=80" />}
                {!query && <Small title="Superhero" fetchURL="https://api.themoviedb.org/3/discover/movie?with_genres=10770" />}
                {!query && <Small title="Western" fetchURL="https://api.themoviedb.org/3/discover/movie?with_genres=37" />}
                {!query && <Small title="Based on a True Story" fetchURL="https://api.themoviedb.org/3/discover/movie?with_genres=36" />}

            </div>
        </>
    )
}