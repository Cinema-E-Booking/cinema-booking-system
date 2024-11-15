import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Head from "next/head";


const RatedMovie = () => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [synopsis, setSynopsis] = useState('');
    const [trailer_url, setTrailer] = useState('');
    const [image_url, setImage] = useState('');
    const [duration, setDuration] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [movies, setMovies] = useState([]);
    const [movieIndex, setMovieIndex] = useState(0);

    const router = useRouter();
    const rating = router.query.rating;
    console.log('rated page check 1:', router.query);
    console.log('rated page check 2:', router.query.rating);
    //console.log('rated page check:', data);

    useEffect(() => {
        const fetchRatedMovies = async () => {
            try {
                const response = await fetch(`/api/searchRatings?rating=${rating}`);
                const result = await response.json();
                console.log('rating check:', result);
                console.log('rating check 2:', result.result.movies);
                //console.log('index check 2:', result.data.movies[0]);
                //console.log('index check 3:', result.data.movies[0][2]);
                
                // Assuming the response structure is `{ data: Array(3) }`
                if (result.result && Array.isArray(result.result.movies)) {
                  //setRatedMovies(result.result.movies); // Set the fetched movies data
                  //setRowCount(result.result.rowCount);
                  setMovies(result.result.movies);
                } else {
                    setError("Error while getting rated movies");
                }
            } catch (error) {
                setError("An error occurred while fetching movies.");
            }
          };

          fetchRatedMovies();
    }, []);

    useEffect(() => {
        console.log('manage check 4:', movies);
    }, [movies]);

    const goToMoviePage = (movieId: string) => {
        const id: number = parseInt(movieId, 10);
        router.push({
          pathname: '/moviePage',
          query: {id},
        });
      };

    const nextNowShowing = () => {
        setMovieIndex((prevIndex) => (prevIndex + 3) % movies.length);
    };
      
    const prevNowShowing = () => {
        setMovieIndex((prevIndex) => (prevIndex - 3 + movies.length) % movies.length);
    };

    return(
        <>
        <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Cinema E-Booking</title>
      </Head>
      <header className="header-blue-part">
        <div className="header-content">
          <div className="booking-name">Rated Movies</div>
        </div>
      </header>
      <main>
        <h2>Rated: {rating}</h2>
        <div id="now-showing" className="movie-grid">
          <div className="slider-container">
            <span className="prev-btn arrow" onClick={prevNowShowing}>&#10094;</span>
            <div className="movie-slider">
                <div className="movie-slide">
                {movies.slice(movieIndex, movieIndex + 3).map((movie, index) => (
                    <div className="movie" key={index}>
                      <img src={movie[6]} width="300" height="450" />
                      <h3>{movie[1]}</h3>
                      <p>Rated: {movie[3]}</p>
                      <button onClick={() => goToMoviePage(movie[2])}>View Movie</button>
                    </div>
                ))}
                </div>
            </div>
          <span className="next-btn arrow" onClick={nextNowShowing}>&#10095;</span> 
          </div>
        </div>
      </main>
      <footer>
        <p>© 2024 Cinema E-Booking</p>
      </footer>
        </>
    );

};

export default RatedMovie;