import Head from "next/head";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Home() {

  const [title, setTitle] = useState('');
  const [isUpdated, setUpdated] = useState(false);
  const [screenings, setScreenings] = useState<Screening[]>([]);

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

  const router = useRouter();
  const data = router.query;

  useEffect(() => {
    const fetchMovie = async () => {
    const response = await fetch(`/api/getMovie?id=${Number(data.id)}`);
    const result = await response.json();
    setTitle(result.result.title);
    getShowTime(result.result.movieId);
    }

    fetchMovie();
  }, [isUpdated]);

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

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Starview</title>
      </Head>
      <header>
            <h1>Book Your Movie</h1>
      </header>
      <main>
        <h2>
            Booking for {title}
        </h2>
        <form action="/seats" method="POST">
            <label htmlFor="time">Select Time:</label>
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
            <label htmlFor="age">Select Age:</label>
            <select id="age" name="age">
                <option value="17 or Less">17 or Less</option>
                <option value="18 or Older">18 or Older</option>
            </select>
            <button type="submit">
                <a href="confirmation.html" />
                    Confirm Booking
                </button>
        </form>
      </main>
      <footer>
        <p>© 2024 Cinema E-Booking</p>
      </footer>
    </>
  );
}