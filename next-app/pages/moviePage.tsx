import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";
import Head from "next/head";
import Script from "next/script";
import { getMovie, getScreenings } from "../lib/api_references/movies"

const MoviePage = () => {
    const [title, setTitle] = useState('Mock Movie Title');
    const [category, setCategory] = useState('Adventure');
    const [rating, setRating] = useState('PG');
    const [synopsis, setSynopsis] = useState('This is a mock synopsis of the movie.');
    const [trailer_url, setTrailer] = useState('https://www.youtube.com/embed/mock_trailer');
    const [image_url, setImage] = useState('https://via.placeholder.com/300x450');
    const [duration, setDuration] = useState('2h 30m');
    const [director, setDirector] = useState('Mock Director');
    const [producer, setProducer] = useState('Mock Producer');
    const [movieId, setMovieId] = useState('1');
    const [screenings, setScreenings] = useState([
        {
            id: 1,
            movie: { movieId: 1, title: 'Mock Movie' },
            auditorium: { id: 1, name: 'Mock Auditorium' },
            availableSeats: [],
            startTime: new Date(),
        },
    ]);
    const [actors, setActors] = useState('Mock Actor 1, Mock Actor 2');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isUpdated, setUpdated] = useState(false);
    const [search, setSearch] = useState("");
    const [ratingFilter, setRatingFilter] = useState("all");

    const { data: session, status } = useSession();
    const router = useRouter();
    const data = router.query;

    useEffect(() => {
        fetchMovie(Number(data.id));
        getShowTime(Number(data.id));     
    }, [session, status]);

    const fetchMovie = async (movieId: number) => {
        const result = await getMovie(movieId) 
        setTitle(result.title);
        setRating(result.rating);
        setDuration(`${result.duration.hours} Hours and ${result.duration.minutes} Minutes`);
        setSynopsis(result.synopsis);
        setImage(result.image_url);
        setTrailer('https://www.youtube.com/embed/' + result.trailer_url);
        setCategory(result.category);
        setDirector(result.director);
        setProducer(result.producer);
        setActors(result.actors);
        setMovieId(result.movieId);

        return result;
    }

    const goToSeatsPage = (screening: number) => {
        //const movieIntId = data.id;
        const showId = screening;
        router.push({
            pathname: '/seats-more',
            query: {showId},
            //query: { movieIntId, showId },
        });
    };

    const getShowTime = async (movieId: number) => {
        try {
          const screenData = await getScreenings(movieId)
          setScreenings(screenData);
        } catch (error) {
          console.log(error);
        }
      };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const handleRatingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setRatingFilter(e.target.value);
    };

    const handleSearch = () => {
        // Implement search functionality
    };

    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Cinema E-Booking</title>
                <Script src="@/public/search.js" defer />
            </Head>

            <style jsx global>{`
                body {
                    font-family: "Chom Extra Bold", Arial, sans-serif;
                    background-color: #000c1f; // Dark blue/black background
                    margin: 0;
                    padding: 0;
                }

                .navbar {
                    background-color: #002b5c;
                    padding: 10px;
                    color: white;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    position: absolute;
                    width: 100%;
                    top: 0;
                    z-index: 10;
                }

                .navbar img {
                    width: 60px;
                    height: auto;
                    margin-right: 10px;
                }

                .navbar .brand {
                    display: flex;
                    align-items: center;
                }

                .navbar .brand h1 {
                    font-size: 24px;
                    margin: 0;
                    padding-left: 10px;
                }

                .navbar ul {
                    list-style: none;
                    margin: 0;
                    padding: 0;
                    display: flex;
                }

                .navbar ul li {
                    margin-right: 20px;
                }

                .navbar ul li a {
                    color: white;
                    text-decoration: none;
                    font-weight: bold;
                    transition: border-bottom 0.3s ease;
                }

                .navbar ul li a:hover {
                    background-color: rgba(255, 255, 255, 0.2);
                }  
                .search-container {
                    display: flex;
                    align-items: center;
                }

                .search-container input {
                    padding: 10px;
                    width: 200px;
                    font-size: 1rem;
                    border-radius: 5px;
                    border: 1px solid #ccc;
                }

                .search-container button {
                    padding: 10px 20px;
                    background-color: #007BFF;
                    color: #fff;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    margin-left: 10px;
                }

                .search-container select {
                    padding: 10px;
                    font-size: 1rem;
                    border-radius: 5px;
                    margin-left: 10px;
                }

                .header-banner {
                    background-image: url("/images/banner.jpg");
                    background-size: cover;
                    background-position: center;
                    height: 290px; 
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .header-banner h2 {
                    color: white;
                    font-size: 36px;
                    text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.7);
                }

                .movie-page {
                    display: grid;
                    grid-template-areas:
                        "title title"
                        "image text"
                        "theater theater";
                    gap: 20px;
                    padding: 20px;
                    color: white;
                }

                .movie-title {
                    grid-area: title;
                    font-size: 3rem;
                    text-align: center;
                    text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.7);
                }

                .movie-actions {
                    display: flex;
                    justify-content: flex-end;
                }

                .movie-actions button {
                    background-color: #ff0000;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    margin-left: 10px;
                    cursor: pointer;
                    transition: background-color 0.3s;
                }

                .movie-actions button:hover {
                    background-color: #cc0000;
                }

                .left-column {
                    grid-area: image;
                    display: flex;
                    justify-content: center;
                }

                .movie-poster {
                    width: 100%;
                    max-width: 300px;
                    border-radius: 10px;
                    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
                }

                .right-column {
                    grid-area: text;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                }

                .right-column p {
                    margin: 5px 0;
                }

                .bottom-section {
                    grid-area: theater;
                    text-align: center;
                }

                .bottom-section h2 {
                    font-size: 2rem;
                    margin-bottom: 10px;
                }

                .bottom-section ul {
                    list-style: none;
                    padding: 0;
                }

                .bottom-section li {
                    margin: 10px 0;
                }

                .bottom-section p {
                    font-size: 1rem;
                    margin: 5px 0;
                }

                .trailer {
                    margin-top: 20px;
                    text-align: center;
                }

                .trailer h2 {
                    font-size: 2rem;
                    margin-bottom: 10px;
                }

                .trailer iframe {
                    width: 100%;
                    max-width: 560px;
                    height: 315px;
                }
            `}</style>

            {/* Navbar */}
            <nav className="navbar">
                <div className="brand">
                    <img src="/images/logo.jpg" alt="Cinema Logo" />
                    <h1>Cinema E-Booking</h1>
                </div>
                <ul>
                    <li><a href="/foodDrinks">Food & Drinks</a></li>
                    <li><a href="/promotions">Promotions & Rewards</a></li>
                    <li><a href="/profile">Profile</a></li>
                </ul>
                {/* Search and Rating in Navbar */}
                <div className="search-container">
                    <input
                        type="text"
                        value={search}
                        onChange={handleSearchChange}
                        placeholder="Search for a movie..."
                        aria-label="Search for a movie"
                    />
                    <button onClick={handleSearch}>Search</button>
                    <select
                        onChange={handleRatingChange}
                        value={ratingFilter}
                        title="Filter movies by rating"
                    >
                        <option value="all">All Ratings</option>
                        <option value="G">G</option>
                        <option value="PG">PG</option>
                        <option value="PG-13">PG-13</option>
                        <option value="R">R</option>
                    </select>
                </div>
            </nav>

            <div className="movie-page">
                <div className="movie-title">{title}</div>
                <div className="left-column">
                    {image_url && <img src={image_url} alt={title} className="movie-poster" />}
                </div>
                <div className="right-column">
                    <p><strong>Release Date:</strong> {new Date().toLocaleDateString()}</p>
                    <p><strong>Duration:</strong> {duration}</p>
                    <p><strong>Synopsis:</strong> {synopsis}</p>
                    <p><strong>Director:</strong> {director}</p>
                    <p><strong>Genre:</strong> {category}</p>
                    <p><strong>Age Restrictions:</strong> {rating}</p>
                </div>
                <div className="bottom-section">
                    <h2>Screenings</h2>
                    {screenings.length === 0 ? (
                        <p>No screenings available.</p>
                    ) : (
                        <ul>
                            {screenings.map(screening => (
                                <li key={screening.id}>
                                    <p>Auditorium: {screening.auditorium?.name || "loading"}</p>
                                    <p>Start Time: {
                                    (() => {
                                        const startTime = new Date(screening.startTime);    
                                        return startTime.toLocaleString('en-US', {
                                          weekday: 'long',
                                          year: 'numeric',
                                          month: 'long',
                                          day: 'numeric',
                                          hour: 'numeric',
                                          minute: 'numeric',
                                          hour12: true,
                                        });
                                      })() || "loading"}
                                        <div className="movie-actions">
                                            <button onClick={() => goToSeatsPage(screening.id)}>Watch</button>
                                        </div>
                                    </p>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                {trailer_url && (
                    <div className="trailer">
                        <h2>Trailer</h2>
                        <iframe
                            src={trailer_url}
                            title={`${title} Trailer`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                )}
            </div>
        </>
    );
};

export default MoviePage;