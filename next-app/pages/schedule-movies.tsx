import Head from "next/head";
import React, { FormEvent, useState, useEffect } from 'react';

export default function ScheduleMovies() {

    const [movies, setMovies] = useState<Movie[]>([]);
    const [showrooms, setShowrooms] = useState<Showroom[]>([]);
    const [screenings, setShowings] = useState<Screening[]>([]);
    const [showroomId, setShowroomId] = useState('');
    const [startTime, setStartTime] = useState('');
    const [movieId, setMovieId] = useState('');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    interface Movie {
        movieId: number;
        title: string;
        category: string;
        rating: string;
        synopsis: string;
        trailer_url: string;
        image_url: string;
        duration: string;
    }

    interface Showroom {
        id: number;
        name: string;
        seats: Seat[];
    }

    interface Seat {
        id: number;
        row: number;
        number: number;
    } 

    interface Screening {
        id: number;
        movie: Movie;
        auditorium: Showroom;
        availableSeats: Seat[];
        startTime: Date;
    }

    useEffect(() => {
        fetchMovies();
        fetchAuditoriums();
    }, []);

    const fetchMovies = async () => {
        try {
            const response = await fetch('./api/allMoviesData', {
                method: 'POST',
                body: JSON.stringify({
                }),
                headers: { 'Content-Type': 'application/json' },
              });
            const moviesData = await response.json();
            //console.log('MoviesData: ', moviesData)
    
            const moviesArray = moviesData.data as Movie[];
            setMovies(moviesArray); // Set the fetched movies data
            setSuccess("Movies loaded");
            //console.log('movies: ', moviesArray);
        } catch (error) {
            console.log(error)
            setError("An error occurred while fetching movies.");
        }
    }

    const fetchAuditoriums = async () => {
        try {
            const response = await fetch('./api/getAllAuditoriumId', {
                method: 'POST',
                body: JSON.stringify({
                }),
                headers: { 'Content-Type': 'application/json' },
              });
            const auditIdData = await response.json();
            const auditData = auditIdData.data;
            setShowrooms([]);
            const showroomsTemp = [];
            for (let i = 0; i < auditData.length; i++)
            {
                const room = await getAuditorium(auditData[i].id);
                showroomsTemp.push({
                    id: room.id,
                    name: room.name,
                    seats: room.seats,
                });
                //console.log('room', room);
                //console.log('Showrooms: ', showrooms)
            }

            setShowrooms(showroomsTemp);

        } catch (err) {
            console.log (err)
            setError('something went wrong');
        }
    }

    const getAuditorium = async (id: number) => {
        const auditResponse = await fetch('./api/getAuditorium', {
            method: 'POST',
            body: JSON.stringify({
                id: id,
            }),
            headers: { 'Content-Type': 'application/json' },
          });
          const auditoriumData = await auditResponse.json();
          const auditorium = auditoriumData.data;

          //console.log('auditorium: ', auditorium)

          return auditorium;
    }

    const createShowing = async (e: FormEvent<HTMLFormElement>) => {
        const response = await fetch('./api/newShowing', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({movieId: movieId, auditoriumId: showroomId, startTime: startTime}),
        })
    }

    /*const createShowing = async (e: FormEvent<HTMLFormElement>) => {
        try {
        const primaryResponse = await fetch('./api/checkScreening', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({movieId: movieId, auditoriumId: showroomId, startTime: startTime}),
        })
        const data = await primaryResponse.json();
        const dataResponse = await data.response();
        console.log('Data ', data)
        console.log('Data Reponse ', data.response);

        if (data.response == true) {
        const response = await fetch('./api/newShowing', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({movieId: movieId, auditoriumId: showroomId, startTime: startTime}),
        })
    } else {
        setError('Invalid')
    }
    } catch (error) {
        console.log(error)
        setError('Something went wrong');
    }
    } */

    const fetchShowings = async () => {
        
    }

    const onRefresh = async () => {
        fetchAuditoriums();
        fetchMovies();
    }

    return (
    <> 
    <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title> Movies </title>
    </Head>
    <div className="container">
        <div>
            <h1>Available Movies</h1>
            {movies.length === 0 ? (
            <p>No movies available.</p>
            ) : (
                <ul>
                    {movies.map(movie => (
                        <li key={movie.movieId}>
                            <p>Title: {movie.title}</p>
                            <p>Movie Id: {movie.movieId}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
        <div>
            <h1>Available Showrooms</h1>
            {showrooms.length === 0 ? (
                <p>No Showrooms available.</p>
            ) : (
               <ul>
                    {showrooms.map(showroom => (
                        <li key={showroom.id}>
                            <p>Name: {showroom.name}</p>
                            <p>Room Id: {showroom.id}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
        <div>
            <h1>Showings</h1>
            {screenings.length === 0 ? (
                <p>No Screenings</p>
            ) : (
               <ul>
                    {screenings.map(screening => (
                        <li key={screening.id}>
                            <p>Movie: {screening.movie.title}</p>
                            <p>Screening Id: {screening.id}</p>
                            <p>Screening Room: {screening.auditorium.name}</p>
                            <p>Starting Time: {String(screening.startTime)}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    </div>
    <div>
    <form onSubmit={createShowing}>
                <input
                    type="text"
                    placeholder="Movie Id"
                    value={movieId}
                    onChange={(e) => setMovieId(e.target.value)}
                    
                />
                <input
                    type="text"
                    placeholder="Showroom Id"
                    value={showroomId}
                    onChange={(e) => setShowroomId(e.target.value)}
                    
                />
                <input
                    type="datetime-local"
                    placeholder="Start Time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    
                />
                <button type="submit">Add Showing</button>
                </form>       
                <button onClick={() => onRefresh()}>Refresh</button>          
    </div>
    {success && <p style={{ color: 'green' }}>{success}</p>}
    {error && <p style={{ color: 'red' }}>{error}</p>}
    </>
    )
}