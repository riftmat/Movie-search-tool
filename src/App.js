import './App.css';
import { useState, useEffect } from 'react';
import MovieDis from './MovieDis';
import icon from './searchicon.svg';

const API_URL = "http://www.omdbapi.com?apikey=b6003d8a";

const App = () => {

  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  }

  return (
    <div className='main-app'>
      <h1>Wyszukiwarka Filmów</h1>
      <div className='search'>
        <input 
        placeholder='Szukaj...' 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} />
        <img 
        src={icon} 
        alt='Ikona wyszukiwania'
        onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies?.length > 0
        ? (
          <div className='container'>
            {movies.map((movie) => (
              <MovieDis movie={movie}/>
            ))}
          </div>
        ) : (
          <div className='empty'>
            <h2>Nie znaleziono filmów</h2>
          </div>
        )
      }
    </div>
  );
};

export default App;