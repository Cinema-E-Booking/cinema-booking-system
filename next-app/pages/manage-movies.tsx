import Head from "next/head";
import React, { useState, useEffect } from 'react';

type Movie = {
    id: number,
    title: string,
    category: string,
    rating: string,
    synopsis: string,
    trailer_url: string,
    image_url: string,
    duration: string,
}

const CreateMovie = () => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [rating, setRating] = useState('');
    const [synopsis, setSynopsis] = useState('');
    const [trailer_url, setTrailer] = useState('');
    const [image_url, setImage] = useState('');
    const [duration, setDuration] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch("/api/allMovies");
                const result = await response.json();
                //console.log('manage check:', result.data);
                //console.log('manage check 2:', result.data.movies[0]);
                //console.log('manage check 3:', result.data.movies[0][1]);
                
                // Assuming the response structure is `{ data: Array(3) }`
                if (result.data && Array.isArray(result.data.movies)) {
                    setMovies(result.data.movies); // Set the fetched movies data
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

    //useEffect(() => {
    //    console.log('manage check 4:', movies);
    //}, [movies]);

    const deleteMovie = async (id: number) => {
        console.log('client side check:',id);
        try{
            const response = await fetch(`./api/deleteMovie?id=${id}`, {
                method: "DELETE",
            });

            if(response.ok) {
                setMovies((prevMovies) => prevMovies.filter((movie) => movie[0] !== id));
                setSuccess("Movie deleted successfully");
            } else {
                const errorData = await response.json();
                setError(errorData.message);
            }
        } catch (error) {
            setError("Error happened while deleting movie");
        }
    };



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if(!title || !category || !rating || !synopsis || !trailer_url || !image_url || !duration) {
            setError("All fields required");
            return;
          }

        const movieData = {
            title,
            category,
            rating,
            synopsis,
            trailer_url,
            image_url,
            duration,
        };

        try {
            const response = await fetch('./api/newMovie', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(movieData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }

            setSuccess('Movie created successfully!');
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
      <header>
        <a href="admin"> Admin Home </a>
            <h1>Manage Movies</h1>
      </header>
        <main>
            <form onSubmit={handleSubmit}>
            <label htmlFor="movie-title">Movie Title:</label>
            <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            <label htmlFor="movie-category">Category:</label>
            <select id="Category" value={category} onChange={(e) => setCategory(e.target.value)} required>
                <option value="Default">Select</option>
                <option value="Now Showing">Now Showing</option>
                <option value="Coming Soon">Coming Soon</option>
            </select>
            <label htmlFor="movie-rating">Rating:</label>
            <select id="Rating" value={rating} onChange={(e) => setRating(e.target.value)} required>
                <option value="Default">Select</option>
                <option value="g">G</option>
                <option value="pg">PG</option>
                <option value="pg-13">PG-13</option>
                <option value="r">R</option>
                <option value="nc-17">NC-17</option>
                <option value="nr">NR</option>
            </select>
            <label htmlFor="duration">Duration:</label>
            <input type="text" placeholder="Duration" value={duration} onChange={(e) => setDuration(e.target.value)} required />
            <label htmlFor="synopsis">Synopsis:</label>
            <textarea id="Synopsis" defaultValue={""} value={synopsis} onChange={(e) => setSynopsis(e.target.value)} required />
            <label htmlFor="trailer-link">Trailer Link (YouTube):</label>
            <input type="text" placeholder="URL" value={trailer_url} onChange={(e) => setTrailer(e.target.value)} required />
            <label htmlFor="image-link">Image Link:</label>
            <input type="text" placeholder="URL" value={image_url} onChange={(e) => setImage(e.target.value)} required />
            <button type="submit">Add Movie</button>
            </form>
            <h2>Existing Movies</h2>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {movies.map((movie, index) => (
                        <tr key={index}>
                            <td>{movie[1]}</td>
                            <td>{movie[4]}</td>
                            <td>{movie[2]}</td>
                            <td>
                                <button onClick={() => deleteMovie(movie[0])}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
        <footer>
            <p>© 2024 Cinema E-Booking - Manage Movies</p>
        </footer>
        </>
    );
};

export default CreateMovie;