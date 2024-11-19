import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";

const MoviePage = () => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [rating, setRating] = useState('');
    const [synopsis, setSynopsis] = useState('');
    const [trailer_url, setTrailer] = useState('');
    const [image_url, setImage] = useState('');
    const [duration, setDuration] = useState('');
    const [director, setDirector] = useState('');
    const [producer, setProducer] = useState('');
    const [movieId, setMovieId] = useState('');
    const [screenings, setScreenings] = useState<Screening[]>([]);
    const [actors, setActors] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isUpdated, setUpdated] = useState(false);

    const {data: session, status} = useSession();

    const router = useRouter();
    const data = router.query;

    interface Screening {
        id: number;
        movie: Movie;
        auditorium: Showroom;
        availableSeats: Seat[];
        startTime: Date;
    }

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

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await fetch(`/api/getMovie?id=${data.id}`);
                const result = await response.json();
                if (response.ok) {
                    setTitle(result.result.title);
                    setRating(result.result.rating);
                    setDuration(result.result.duration);
                    setSynopsis(result.result.synopsis);
                    setImage(result.result.image_url);
                    setTrailer('https://www.youtube.com/embed/' + result.result.trailer_url);
                    setCategory(result.result.category);
                    setDirector(result.result.director);
                    setProducer(result.result.producer);
                    setActors(result.result.actors);
                    setMovieId(result.result.movieId);
                    //console.log('Result: ', result);
                    //console.log('Result.result: ', result.result);
                    //console.log('MovieId: ', result.result.movieId);
                    getShowTime(result.result.movieId);
                } else {
                    setError('Movie not found');
                }
            } catch (error) {
                setError("An error occurred while fetching movie.");
            }
        };
    
        if(data) {
            fetchMovie();
        }
    }, [data.id, session, status, isUpdated]);

    if (error) {
        return <div>{error}</div>;
    }

    useEffect(() => {
        //console.log('movie page title check:', title);
    }, [title, session, status]);
    //{image_url && <img src={image_url} alt={title} />}

    const getShowTime = async (movieId: number) => {
        try {
            console.log('THE MOVIE ID IS: ', Number(movieId));
            const response = await fetch('./api/getScreenings', {
                method: 'POST',
                body: JSON.stringify({
                    movieId: movieId 
                }),
                headers: { 'Content-Type': 'application/json' },
              });
            const screeningsData = await response.json();
            console.log('screeningsData: ', screeningsData)
            console.log('screeningsData.response: ', screeningsData.response)
            setScreenings(screeningsData.response)
              console.log(screeningsData.response)

            setUpdated(true);

        } catch (error) {
            console.log(error);
        }
    }

    const goToBookingPage = (movieId: string) => {
        const id: number = parseInt(movieId, 10);
        router.push({
          pathname: '/booking',
          query: {id},
        });
      };

    return (
        <div className="movie-page">
            {title ? (
                <>
                    <h1>{title}</h1>
                    <button onClick={() => goToBookingPage(movieId)}>Book Movie</button>
                    <p><strong>Category:</strong> {category}</p>
                    <p><strong>Rating:</strong> {rating}</p>
                    <p><strong>Synopsis:</strong> {synopsis}</p>
                    <p><strong>Director:</strong> {director}</p>
                    <p><strong>Producer:</strong> {producer}</p>
                    <p><strong>Actors:</strong> {actors}</p>
                    <p><strong>Screenings:</strong>
                        {screenings.length === 0 ? (
                            <p>No screenings available.</p>
                            ) : (
                            <ul>
                                {screenings.map(screening => (
                                <li key={screening.id}>
                                <p>Auditorium: {screening.auditorium?.name || "loading"}</p>
                                <p>Start Time: {screening.startTime.toLocaleString('en-US', {
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: 'numeric', 
      minute: 'numeric', 
      hour12: true, 
    }) || "loading"}</p>
                                </li>
                        ))}
                </ul>
            )}
                    </p>
                    <p><strong>Reviews:</strong> This was an okay movie!</p>
                    <p><strong>{category}</strong></p>
                    {trailer_url && (
                        <div>
                            <h2>Trailer</h2>
                            <iframe
                                width="560"
                                height="315"
                                src={trailer_url}
                                title={`${title} Trailer`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    )}
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );

};

export default MoviePage;