import Head from "next/head";
import styles from "@/styles/seating-style.module.css"
import Script from "next/script"
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";
import { SeatStatus } from "@/lib/auditorium";

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
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  

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
    status: SeatStatus;
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

//  useEffect(() => {
//    console.log('row one: ', rowOne);
//    console.log('row 2: ', rowTwo);
//    console.log('row 3: ', rowThree);
//    console.log('row 4: ', rowFour);
//    console.log('row 5: ', rowFive);
//    console.log('row 6: ', rowSix);
//    console.log('rows: ', rows);
//  }, [rowOne, rowTwo, rowThree, rowFour, rowFive, rowSix, rows]);

  const handleSeatClick = (seatId : number) => {
    console.log('seat click check: ', seatId);
    console.log('selected seats: ', selectedSeats);
    setSelectedSeats((prevSelected) => 
      prevSelected.includes(seatId)
        ? prevSelected.filter((id) => id !== seatId)
        : [...prevSelected, seatId]
    );
  };

  const goToCheckout = () => {
    //const ticketSeats = selectedSeats;
    const showId = data.showId;
    router.push({
        pathname: '/newCheckout',
        query: {showId, selectedSeats},
        //query: { movieIntId, showId },
    });
  };
  

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
                {rowOne.map((seat) => (
                  <div
                    key={seat['id']}
                    className={[
                      styles.seat,
                      seat['status'] === "occupied" ? styles.setoccupied : "",
                      selectedSeats.includes(seat['id']) ? styles.seatselected : "",
                    ].join(" ")}
                    onClick={() =>
                      seat['status'] !== "occupied" && handleSeatClick(seat['id'])
                    }
                  />
                ))}
              </div>
              <div className={styles.row}>
                {rowTwo.map((seat) => (
                  <div
                    key={seat['id']}
                    className={[
                      styles.seat,
                      seat['status'] === "occupied" ? styles.setoccupied : "",
                      selectedSeats.includes(seat['id']) ? styles.seatselected : "",
                    ].join(" ")}
                    onClick={() =>
                      seat['status'] !== "occupied" && handleSeatClick(seat['id'])
                    }
                  />
                ))}
              </div>
              <div className={styles.row}>
                {rowThree.map((seat) => (
                  <div
                    key={seat['id']}
                    className={[
                      styles.seat,
                      seat['status'] === "occupied" ? styles.setoccupied : "",
                      selectedSeats.includes(seat['id']) ? styles.seatselected : "",
                    ].join(" ")}
                    onClick={() =>
                      seat['status'] !== "occupied" && handleSeatClick(seat['id'])
                    }
                  />
                ))}
              </div>
              <div className={styles.row}>
                {rowFour.map((seat) => (
                  <div
                    key={seat['id']}
                    className={[
                      styles.seat,
                      seat['status'] === "occupied" ? styles.setoccupied : "",
                      selectedSeats.includes(seat['id']) ? styles.seatselected : "",
                    ].join(" ")}
                    onClick={() =>
                      seat['status'] !== "occupied" && handleSeatClick(seat['id'])
                    }
                  />
                ))}
              </div>
              <div className={styles.row}>
                {rowFive.map((seat) => (
                  <div
                    key={seat['id']}
                    className={[
                      styles.seat,
                      seat['status'] === "occupied" ? styles.setoccupied : "",
                      selectedSeats.includes(seat['id']) ? styles.seatselected : "",
                    ].join(" ")}
                    onClick={() =>
                      seat['status'] !== "occupied" && handleSeatClick(seat['id'])
                    }
                  />
                ))}
              </div>
              <div className={styles.row}>
                {rowSix.map((seat) => (
                  <div
                    key={seat['id']}
                    className={[
                      styles.seat,
                      seat['status'] === "occupied" ? styles.setoccupied : "",
                      selectedSeats.includes(seat['id']) ? styles.seatselected : "",
                    ].join(" ")}
                    onClick={() =>
                      seat['status'] !== "occupied" && handleSeatClick(seat['id'])
                    }
                  />
                ))}
              </div>
            </div>

          <div className={styles.legend}>
          <span>
            <div className={styles.seat}></div> Available
          </span>
          <span>
            <div className={[styles.seat, styles.seatselected].join(" ")}></div>{" "}
            Selected
          </span>
          <span>
            <div className={[styles.seat, styles.seatoccupied].join(" ")}></div>{" "}
            Occupied
          </span>
        </div>
            <button onClick={goToCheckout}>Confirm Selection</button>
        </main>
    </>
  );
};

export default SeatsPage;
