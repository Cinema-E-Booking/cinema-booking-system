import Head from "next/head";
import { useState, useEffect } from 'react';
import Script from "next/script";
import { useRouter } from 'next/router';

const Home = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [movies, setMovies] = useState([]);
  const [nsMovies, setNSMovies] = useState([]);
  const [csMovies, setCSMovies] = useState([]);
  const [rowCount, setRowCount] = useState();
  const router = useRouter();


  useEffect(() => {
    const fetchMovies = async () => {
        try {
            const response = await fetch("/api/allMovies");
            const result = await response.json();
            console.log('index check:', result.data);
            console.log('index check 2:', result.data.movies[0]);
            console.log('index check 3:', result.data.movies[0][2]);
            
            // Assuming the response structure is `{ data: Array(3) }`
            if (result.data && Array.isArray(result.data.movies)) {
                setMovies(result.data.movies); // Set the fetched movies data
                setRowCount(result.data.rowCount);
                setSuccess("Movies loaded");
            } else {
                setError("Failed to load movies.");
            }
        } catch (error) {
            setError("An error occurred while fetching movies.");
        }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    console.log('Movies check:', movies);
    console.log('Movies check 2:', movies[0]);
    const divideMovies = async () => {
      try {
        for (let i = 0; movies[i] !== undefined; i++) {
          if (movies[i][2] === 'Now Showing') {
            console.log('Now showing check:', movies[i][1]);
            setNSMovies(prevNSMovies => [...prevNSMovies, movies[i]]);
          } else if (movies[i][2] === 'Coming Soon') {
            console.log('Coming soon check:', movies[i][1]);
            setCSMovies(prevCSMovies => [...prevCSMovies, movies[i]]);
          } else {
            setError("Error when dividing movies");
          }
        }
      } catch (err) {
        setError('Error while dividing movies');
      }
    };

    divideMovies();
  }, [movies]);

  const goToMoviePage = (movieId: string) => {
    const id: number = parseInt(movieId, 10);
    router.push({
      pathname: '/moviePage',
      query: {id},
    });
  };


  useEffect(() => {
    console.log('nsMovies check:', nsMovies);
  }, [nsMovies]);

  useEffect(() => {
    console.log('csMovies check:', csMovies);
  }, [csMovies]);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Cinema E-Booking</title>
        <Script src="@/public/search.js" defer />
      </Head>
      <header className="header-blue-part">
        <div className="header-content">
          <div className="booking-name">Cinema E-Booking</div>
          <div className="search-bar-container">
            <input
              type="text"
              id="search-bar"
              placeholder="Search for a movie..."
            />
            <select id="genre-dropdown">
              <option value="all">All Genres</option>
              <option value="Action">Action</option>
              <option value="Romance">Romance</option>
              <option value="Comedy">Comedy</option>
              <option value="Animation">Animation</option>
              <option value="Mystery">Mystery</option>
            </select>
            <button id="search-btn" className="btn">
             Search
            </button>
          </div>
        </div>
      </header>
      <main>
        <h2>Now Showing</h2>
        <div id="now-showing" className="movie-grid">
          <div className="slider-container">
            <span className="prev-btn arrow">&#10094;</span>
            <div className="movie-slider">
                <div className="movie-slide">
                {nsMovies.map((movie, index) => (
                    <div className="movie" key={index}>
                      <img src={movie[6]} width="300" height="450" />
                      <h3>{movie[1]}</h3>
                      <p>Rated: {movie[3]}</p>
                      <button onClick={() => goToMoviePage(movie[0])}>View Movie</button>
                    </div>
                ))}
                </div>
            </div>
          <span className="next-btn arrow">&#10095;</span> 
          </div>
        </div>
        <h2>Coming Soon</h2>
        <div id="coming-soon" className="movie-grid">
          <div className="slider-container">
            <span className="prev-btn arrow">&#10094;</span>
            <div className="movie-slider">
                <div className="movie-slide">
                {csMovies.map((movie, index) => (
                    <div className="movie" key={index}>
                      <img src={movie[6]} width="300" height="450" />
                      <h3>{movie[1]}</h3>
                      <p>Rated: {movie[3]}</p>
                      <button onClick={() => goToMoviePage(movie[0])}>View Movie</button>
                    </div>
                ))}
                </div>
            </div>
          <span className="next-btn arrow">&#10095;</span> 
          </div>
        </div>
      </main>
      <footer>
        <p>© 2024 Cinema E-Booking</p>
      </footer>
    </>
  );
};

export default Home;
