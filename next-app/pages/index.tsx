import Head from "next/head";
import { useState, useEffect } from "react";
import Script from "next/script";
import { useRouter } from "next/router";

const Home = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [movies, setMovies] = useState([]);
  const [nsMovies, setNSMovies] = useState([]);
  const [csMovies, setCSMovies] = useState([]);
  const [rowCount, setRowCount] = useState();
  const router = useRouter();
  const [nsIndex, setNSIndex] = useState(0);
  const [csIndex, setCSIndex] = useState(0);
  const [search, setSearch] = useState("");
  const [rating, setRating] = useState("all");
  const [searchStatus, setSearchStatus] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("/api/allMovies");
        const result = await response.json();
        if (result.data && Array.isArray(result.data.movies)) {
          setMovies(result.data.movies);
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
    const divideMovies = () => {
      try {
        movies.forEach((movie) => {
          if (movie[2] === "Now Showing") {
            setNSMovies((prevNSMovies) => [...prevNSMovies, movie]);
          } else if (movie[2] === "Coming Soon") {
            setCSMovies((prevCSMovies) => [...prevCSMovies, movie]);
          }
        });
      } catch (err) {
        setError("Error while dividing movies");
      }
    };

    divideMovies();
  }, [movies]);

  const goToMoviePage = (movieId: string) => {
    const id: number = parseInt(movieId, 10);
    router.push({
      pathname: "/moviePage",
      query: { id },
    });
  };

  const fetchSearchMovies = async () => {
    try {
      const response = await fetch(`/api/searchMovies?title=${search}`);
      const result = await response.json();
      if (result.result !== undefined) {
        goToMoviePage(result.result.movieId);
      } else {
        setSearchStatus("No Such Movie");
      }
    } catch (error) {
      setError("An error occurred while fetching movies.");
    }
  };

  const nextNowShowing = () => {
    setNSIndex((prevIndex) => (prevIndex + 3) % nsMovies.length);
  };

  const prevNowShowing = () => {
    setNSIndex((prevIndex) => (prevIndex - 3 + nsMovies.length) % nsMovies.length);
  };

  const nextComingSoon = () => {
    setCSIndex((prevIndex) => (prevIndex + 3) % csMovies.length);
  };

  const prevComingSoon = () => {
    setCSIndex((prevIndex) => (prevIndex - 3 + csMovies.length) % csMovies.length);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleRatingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRating(e.target.value);
  };

  const handleSearch = () => {
    fetchSearchMovies();
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
          background-color: #fffcfc;
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
          text-decoration: underline;
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

        .movie-card {
          width: 220px;
          background-color: #fff;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
          text-align: center;
          margin: 20px;
        }

        .movie-slider {
          display: flex;
          justify-content: center;
          gap: 20px;
        }

        .movie-card img {
          width: 100%;
          height: 300px;
          object-fit: cover;
        }

        .movie-card h3 {
          font-size: 1.2rem;
          color: #333;
          margin-bottom: 10px;
        }

        .movie-card p {
          margin-bottom: 10px;
          font-weight: bold;
          color: #666;
        }

        .movie-card button {
          padding: 10px 20px;
          background-color: #002b5c; /* Updated to match the dark blue color scheme */
          color: #fff;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          margin-bottom: 20px;
          transition: background-color 0.3s;
        }

        .movie-card button:hover {
          background-color: #001f43;
        }

        .movie-grid {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
        }

        .slider-container {
          position: relative;
        }

        .prev-btn,
        .next-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          font-size: 2rem;
          cursor: pointer;
          color: #fff;
          background-color: #000;
          border-radius: 50%;
          padding: 10px;
          z-index: 5;
        }

        .prev-btn {
          left: -30px;
        }

        .next-btn {
          right: -30px;
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
    aria-label="Search for a movie" // Added aria-label for accessibility
  />
  <button onClick={handleSearch}>Search</button>
  <select
    onChange={handleRatingChange}
    value={rating}
    title="Filter movies by rating" // Added title attribute for accessibility
  >
    <option value="all">All Ratings</option>
    <option value="G">G</option>
    <option value="PG">PG</option>
    <option value="PG-13">PG-13</option>
    <option value="R">R</option>
  </select>
</div>

      </nav>

      {/* Header Banner */}
      <div className="header-banner">
        <h2>Movies</h2>
      </div>

      {/* Now Showing Section */}
      <h2
        style={{
          textAlign: "center",
          marginBottom: "20px",
          marginTop: "40px",
          color: "#333",
        }}
        id="food-drinks"
      >
        Now Playing
      </h2>
      <div className="movie-grid">
        <div className="slider-container">
          <span className="prev-btn arrow" onClick={prevNowShowing}>
            &#10094;
          </span>
          <div className="movie-slider">
            {nsMovies.slice(nsIndex, nsIndex + 3).map((movie, index) => (
              <div key={index} className="movie-card">
                <img src={movie[6]} alt={movie[1]} />
                <h3>{movie[1]}</h3>
                <p>Rated: {movie[3]}</p>
                <button onClick={() => goToMoviePage(movie[0])}>
                  View Movie
                </button>
              </div>
            ))}
          </div>
          <span className="next-btn arrow" onClick={nextNowShowing}>
            &#10095;
          </span>
        </div>
      </div>

      {/* Coming Soon Section */}
      <h2 style={{ textAlign: "center", marginTop: "40px", color: "#333" }} id="promotions">
        Coming Soon
      </h2>
      <div className="movie-grid">
        <div className="slider-container">
          <span className="prev-btn arrow" onClick={prevComingSoon}>
            &#10094;
          </span>
          <div className="movie-slider">
            {csMovies.slice(csIndex, csIndex + 3).map((movie, index) => (
              <div key={index} className="movie-card">
                <img src={movie[6]} alt={movie[1]} />
                <h3>{movie[1]}</h3>
                <p>Rated: {movie[3]}</p>
                <button onClick={() => goToMoviePage(movie[0])}>
                  View Movie
                </button>
              </div>
            ))}
          </div>
          <span className="next-btn arrow" onClick={nextComingSoon}>
            &#10095;
          </span>
        </div>
      </div>
    </>
  );
};

export default Home;
