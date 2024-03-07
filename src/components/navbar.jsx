import React, { useState } from 'react';
import './navbar.css'
import { Link } from 'react-router-dom'



export default function Navbar() {
    const [query, setQuery] = useState(''); 

    const handleSubmit = (event) => {
        event.preventDefault(); 
        console.log('Searching for:', query); 
    };

    return (
        <>
            <nav className="navbar">
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
                    <form onSubmit={handleSubmit} className="search-form">
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search..."
                            className="search-input"
                        />
                    </form>
                </div>
            </nav>
        </>
    );
}