import { useState, useEffect} from 'react'
import movieTrailer from 'movie-trailer'
import YouTube from 'react-youtube'
import './row.css'


export default function Row({title, fetchURL}){
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("")
    const [selectedMovie, setSelectedMovie] = useState("")

    useEffect(() => {
        const fetchMovies = async () => {
          const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwN2I4ZDNmM2FkMjE3NWQ5ZDdiN2M4MmQzNDgxYWFlOCIsInN1YiI6IjY1ZTkwZjM1NmJlYWVhMDE2Mzc4NmIwZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pOMjRaQM9P-538JiHTh5Sicu5Cpjkwf7MvgbPjmdSe8'
            }
          }
          const response = await fetch(fetchURL, options)
          const data = await response.json();
          console.log(data)
          setMovies(data.results);
        };
        fetchMovies();
      }, [])

      const handleClick = (movie) => {
        console.log("clicked")
        if (selectedMovie && selectedMovie.id === movie.id) {
          setSelectedMovie(null); // Deselect the movie
          setTrailerUrl('');
        } else {
          setSelectedMovie(movie)
          movieTrailer(movie.title)
            .then((url) => {
              //https://www.youtube.com/watch?v=KqtS_Vr2rqw
              if (url) setTrailerUrl(url.split('v=')[1]);
            }).catch(error => console.log(error));
        }
      };

      const opts = {
        height: "300px",
        width: "60%",
        playerVars: { 
          autoplay: 1, 
          controls: 0
        }
      }

    return (
        <div className='movie-row'>
        <h2>{title}</h2>
        <div className="movie-container">
          {movies.map(movie => (
            <MovieCard key={movie.id} movie={movie} clickHandler={(() => handleClick(movie))}/>
          ))}
        </div>
        {selectedMovie && (
                <div className="movie-details">
                    <h3>{selectedMovie.title}</h3>
                    <p>{selectedMovie.overview}</p>
                </div>
            )}
          {trailerUrl &&
          (<div className="movie-trailer">
            <YouTube videoId={trailerUrl} opts={opts} />
          </div>
          )}
        </div>
    )
}

function MovieCard({ movie, clickHandler }) {
  return (
    <div className="movie-card">
      <img src={'https://image.tmdb.org/t/p/w500' + movie['poster_path']} alt={movie.title} className="movie-poster"
        onClick={() => clickHandler(movie)} />
    </div>
  )
}