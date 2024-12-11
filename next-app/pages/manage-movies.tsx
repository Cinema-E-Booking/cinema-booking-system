import Head from "next/head";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

type Movie = {
  id: number;
  title: string;
  category: string;
  rating: string;
  synopsis: string;
  trailer_url: string;
  image_url: string;
  duration: string;
  director: string;
  producer: string;
  actors: string[];
};

const CreateMovie = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [trailer_url, setTrailer] = useState("");
  const [image_url, setImage] = useState("");
  const [duration, setDuration] = useState("");
  const [director, setDirector] = useState("");
  const [producer, setProducer] = useState("");
  const [actors, setActors] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const { data: session, status } = useSession();

  useEffect(() => {
    fetchMovies();
  }, [session, status]);

  const fetchMovies = async () => {
    try {
      const response = await fetch("/api/allMoviesData");
      const result = await response.json();
      if (result.data && Array.isArray(result.data)) {
        setMovies(result.data);
        setSuccess("Movies loaded successfully.");
      } else {
        setError("Failed to load movies.");
      }
    } catch (error) {
      setError("An error occurred while fetching movies.");
    }
  };


  const deleteMovie = async (id: number) => {
    try {
      const response = await fetch(`/api/deleteMovie?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setSuccess("Movie deleted successfully");
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      setError("An error occurred while deleting the movie.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!title || !category || !rating || !synopsis || !trailer_url || !image_url || !duration) {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await fetch("/api/newMovie", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({title: title, category: category, rating: rating,
        synopsis: synopsis, trailer_url: trailer_url, image_url: image_url, 
        duration: duration, director: director, producer: producer, actors: actors.split(","),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      fetchMovies();
      setSuccess("Movie created successfully!");
      setTitle("");
      setCategory("");
      setRating("");
      setSynopsis("");
      setTrailer("");
      setImage("");
      setDuration("");
      setDirector("");
      setProducer("");
      setActors("");
    } catch (err) {
      setError(String(err));
    }
  };

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Manage Movies</title>
      </Head>
      <header style={{ textAlign: "center", padding: "10px", backgroundColor: "#00165a", color: "#fff" }}>
        <h1>Manage Movies</h1>
        <a href="admin" style={{ color: "#fff", textDecoration: "underline" }}>
          Admin Home
        </a>
      </header>
      <main style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "20px", padding: "20px" }}>
        {/* Left Panel: Form */}
        <div style={{ borderRight: "2px solid #ccc", paddingRight: "20px" }}>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <h2>Add a New Movie</h2>
            <input
              type="text"
              placeholder="Movie Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
            >
              <option value="">Category</option>
              <option value="Now Showing">Now Showing</option>
              <option value="Coming Soon">Coming Soon</option>
            </select>
            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              required
              style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
            >
              <option value="">Rating</option>
              <option value="nr">No Rating</option>
              <option value="g">G</option>
              <option value="pg">PG</option>
              <option value="pg-13">PG-13</option>
              <option value="r">R</option>
              <option value="nc-17">NC-17g</option>
            </select>
            <input
              type="text"
              placeholder="Duration (hh:mm:ss)"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
              style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
            />
            <input
              type="text"
              placeholder="Director"
              value={director}
              onChange={(e) => setDirector(e.target.value)}
              style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
            />
            <input
              type="text"
              placeholder="Producer"
              value={producer}
              onChange={(e) => setProducer(e.target.value)}
              style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
            />
            <input
              type="text"
              placeholder="Actors (comma-separated)"
              value={actors}
              onChange={(e) => setActors(e.target.value)}
              style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
            />
            <textarea
              placeholder="Synopsis"
              value={synopsis}
              onChange={(e) => setSynopsis(e.target.value)}
              required
              style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc", resize: "vertical" }}
            />
            <input
              type="text"
              placeholder="Trailer URL"
              value={trailer_url}
              onChange={(e) => setTrailer(e.target.value)}
              required
              style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
            />
            <input
              type="text"
              placeholder="Image URL"
              value={image_url}
              onChange={(e) => setImage(e.target.value)}
              required
              style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
            />
            <button type="submit" style={{ padding: "10px", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
              Add Movie
            </button>
          </form>
        </div>

        {/* Right Panel: Movies */}
        <div>
          <h2>Existing Movies</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "20px" }}>
            {movies.map((movie) => (
              <div
                key={movie.id}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "10px",
                  backgroundColor: "#f9f9f9",
                }}
              >
                <img
                  src={movie.image_url}
                  alt={movie.title}
                  style={{ width: "100%", borderRadius: "8px 8px 0 0" }}
                />
                <h3>{movie.title}</h3>
                <p>
                  <strong>Category:</strong> {movie.category}
                </p>
                <p>
                  <strong>Rating:</strong> {movie.rating}
                </p>
                <p>
                  <strong>Synopsis:</strong> {movie.synopsis}
                </p>
                <button
                  onClick={() => deleteMovie(movie.id)}
                  style={{ padding: "5px", backgroundColor: "#f44336", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      {success && <p style={{ color: "green", textAlign: "center" }}>{success}</p>}
      <footer style={{ textAlign: "center", padding: "10px", backgroundColor: "#00165a", color: "#fff" }}>
        <p>© 2024 Cinema E-Booking - Manage Movies</p>
      </footer>
    </>
  );
};

export default CreateMovie;