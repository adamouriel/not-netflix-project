import { useState, useEffect } from 'react'
import './App.css'

export default function App(){
  const [movies, setMovies] = useState([])

  useEffect(() => {
    const fetchMovies = async () => {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwN2I4ZDNmM2FkMjE3NWQ5ZDdiN2M4MmQzNDgxYWFlOCIsInN1YiI6IjY1ZTkwZjM1NmJlYWVhMDE2Mzc4NmIwZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pOMjRaQM9P-538JiHTh5Sicu5Cpjkwf7MvgbPjmdSe8'
        }
      }
      const response = await fetch('https://api.themoviedb.org/3/discover/movie?with_genres=27', options)
      const data = await response.json();
      setMovies(data.results);
    };

    fetchMovies();
  }, [])

  function MovieCard({ movie }) {
    return (
      <div className="movie-card">
        <img src={'https://image.tmdb.org/t/p/w500'+movie['poster_path']} alt={movie.title} className="movie-poster"/>
      </div>
    )
  }


  return (
    <>
    <div className='movie-row'> 
      <h2>Horror Movies</h2>
      <div className="movie-container">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
    </>
  )
}



