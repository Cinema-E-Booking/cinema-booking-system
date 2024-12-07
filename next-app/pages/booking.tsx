import Head from "next/head";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function BookingPage() {
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
    };

    fetchMovie();
  }, [isUpdated]);

  const getShowTime = async (movieId: number) => {
    try {
      const response = await fetch('./api/getScreenings', {
        method: 'POST',
        body: JSON.stringify({
          movieId: movieId,
        }),
        headers: { 'Content-Type': 'application/json' },
      });
      const screeningsData = await response.json();
      setScreenings(screeningsData.response);
      setUpdated(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Book Your Movie</title>
      </Head>

      <style jsx>{`
        body {
          font-family: "Arial", sans-serif;
          background-color: #f5f5f5;
          margin: 0;
          padding: 0;
        }

        header {
          background-color: #002b5c;
          color: white;
          padding: 20px;
          text-align: center;
        }

        main {
          max-width: 900px;
          margin: auto;
          padding: 20px;
          background-color: white;
          border-radius: 10px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        h1 {
          font-size: 2rem;
          margin-bottom: 10px;
        }

        h2 {
          font-size: 1.5rem;
          margin-bottom: 20px;
          color: #002b5c;
        }

        .showtimes-container {
          margin-bottom: 30px;
        }

        .showtime {
          display: flex;
          flex-direction: column;
          margin-bottom: 20px;
          padding: 15px;
          border: 1px solid #ddd;
          border-radius: 5px;
          background-color: #fafafa;
        }

        .showtime h3 {
          margin: 0 0 10px;
          font-size: 1.2rem;
          color: #333;
        }

        .showtime p {
          margin: 5px 0;
          color: #555;
        }

        select {
          width: 100%;
          padding: 10px;
          margin-bottom: 20px;
          font-size: 1rem;
          border: 1px solid #ccc;
          border-radius: 5px;
        }

        button {
          width: 100%;
          padding: 15px;
          background-color: #002b5c;
          color: white;
          font-size: 1rem;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        button:hover {
          background-color: #001f43;
        }

        footer {
          text-align: center;
          padding: 20px;
          background-color: #002b5c;
          color: white;
          margin-top: 20px;
        }
      `}</style>

      <header>
        <h1>Book Your Movie</h1>
      </header>

      <main>
        <h2>Booking for {title}</h2>

        <div className="showtimes-container">
          {screenings.length === 0 ? (
            <p>No screenings available.</p>
          ) : (
            screenings.map((screening) => (
              <div key={screening.id} className="showtime">
                <h3>Auditorium: {screening.auditorium?.name || "loading"}</h3>
                <p>
                  <strong>Start Time:</strong> {screening.startTime.toLocaleString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true,
                  }) || "loading"}
                </p>
              </div>
            ))
          )}
        </div>

        <label htmlFor="age">Select Age:</label>
        <select id="age" name="age">
          <option value="17 or Less">17 or Less</option>
          <option value="18 or Older">18 or Older</option>
        </select>

        <button type="submit">Confirm Booking</button>
      </main>

      <footer>
        <p>© 2024 Cinema E-Booking</p>
      </footer>
    </>
  );
}
