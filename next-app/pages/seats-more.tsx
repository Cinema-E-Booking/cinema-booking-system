import Head from "next/head";
import styles from "@/styles/seating-style.module.css"
import Script from "next/script"
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";

const SeatsPage = () => {
  const [error, setError] = useState('');
  const [seats, setSeats] = useState([]);
  const [rowOne, setRowOne] = useState([]);
  const [rowTwo, setRowTwo] = useState([]);
  const [rowThree, setRowThree] = useState([]);
  const [rowFour, setRowFour] = useState([]);
  const [rowFive, setRowFive] = useState([]);
  const [rowSix, setRowSix] = useState([]);
  const rows = [rowOne, rowTwo, rowThree, rowFour, rowFive, rowSix];
  

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
    const fetchScreening = async () => {
      try {
        const response = await fetch(`/api/getOneScreening?id=${data.showId}`);
        const screeningData = await response.json();
        console.log('availableSeats check: ', screeningData.response.availableSeats);
        setSeats(screeningData.response.availableSeats);
      } catch (error) {
        setError('Error occurred while fetching screening');
      }
    }

    if(data) {
      fetchScreening();
    }
  }, [data.id]);

  useEffect(() => {
    const divideRows = async () => {
      try {
        for(let i = 0; seats[i] !== undefined; i+=0) {
          if(seats[i]['row'] == 1) {
            for(let j = 1; j === seats[i]['number']; j++) {
              rowOne.push(seats[i]);
              i++;
            }
          } else if(seats[i]['row'] == 2) {
            for(let j = 1; j === seats[i]['number']; j++) {
              rowTwo.push(seats[i]);
              i++;
            }
          } else if(seats[i]['row'] == 3) {
            for(let j = 1; j === seats[i]['number']; j++) {
              rowThree.push(seats[i]);
              i++;
            }
          } else if(seats[i]['row'] == 4) {
            for(let j = 1; j === seats[i]['number']; j++) {
              rowFour.push(seats[i]);
              i++;
            }
          } else if(seats[i]['row'] == 5) {
            for(let j = 1; j === seats[i]['number']; j++) {
              rowFive.push(seats[i]);
              i++;
            }
          } else {
            for(let j = 1; j === seats[i]['number']; j++) {
              rowSix.push(seats[i]);
              i++;
            }
          }
        }
      } catch (error) {
        setError('Error occurred while fetching screening');
      }
    }

      divideRows();
  }, [seats]);

  useEffect(() => {
    console.log('row one: ', rowOne);
    console.log('row 2: ', rowTwo);
    console.log('row 3: ', rowThree);
    console.log('row 4: ', rowFour);
    console.log('row 5: ', rowFive);
    console.log('row 6: ', rowSix);
    console.log('rows: ', rows);
  }, [rowOne, rowTwo, rowThree, rowFour, rowFive, rowSix, rows]);
  

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Seats</title>
      </Head>
      <header>
            <h1>Choose Your Seats</h1>
      </header>
        <main className={styles.div}>
            <div className={styles.screen}>SCREEN</div>
            <div className={styles.seatinggrid}>
              <div className={styles.row}>
                {rowOne.map((row) => (
                  <div className={[styles.seat, styles.seatavailable].join(" ")} />
                ))}
              </div>
              <div className={styles.row}>
                {rowTwo.map((row) => (
                  <div className={[styles.seat, styles.seatavailable].join(" ")} />
                ))}
              </div>
              <div className={styles.row}>
                {rowThree.map((row) => (
                  <div className={[styles.seat, styles.seatavailable].join(" ")} />
                ))}
              </div>
              <div className={styles.row}>
                {rowFour.map((row) => (
                  <div className={[styles.seat, styles.seatavailable].join(" ")} />
                ))}
              </div>
              <div className={styles.row}>
                {rowFive.map((row) => (
                  <div className={[styles.seat, styles.seatavailable].join(" ")} />
                ))}
              </div>
              <div className={styles.row}>
                {rowSix.map((row) => (
                  <div className={[styles.seat, styles.seatavailable].join(" ")} />
                ))}
              </div>
            </div>
            <div className={styles.legend}>
            <span className={styles.availablelegend}>Available</span>
            <span className={styles.selectedlegend}>Selected</span>
            <span className={styles.occupiedlegend}>Occupied</span>
            </div>
            <button id="confirm-seats">Confirm Selection</button>
        </main>
    </>
  );
};

export default SeatsPage;