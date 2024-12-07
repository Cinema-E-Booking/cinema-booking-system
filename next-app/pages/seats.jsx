import Head from "next/head";
import styles from "@/styles/seating-style.module.css";
import Script from "next/script";
import { useState, useEffect } from "react";

export default function Seats() {
  const [backSeats, setBackSeats] = useState([]);
  const [frontSeats, setFrontSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    // Generate seats for back (10 rows x 20 columns) and front (3 rows x 20 columns)
    const generateSeats = (rows, columns, startId) => {
      return Array.from({ length: rows * columns }, (_, index) => ({
        id: startId + index,
        row: Math.floor(index / columns),
        column: index % columns,
        occupied: Math.random() < 0.1, // Reduced probability to 10% for occupied seats
      }));
    };

    const initialBackSeats = generateSeats(10, 20, 1); // 10 rows
    const initialFrontSeats = generateSeats(3, 20, initialBackSeats.length + 1); // 3 rows

    setBackSeats(initialBackSeats);
    setFrontSeats(initialFrontSeats);
  }, []);

  const handleSeatClick = (seatId, isBackRow) => {
    setSelectedSeats((prevSelected) =>
      prevSelected.includes(seatId)
        ? prevSelected.filter((id) => id !== seatId)
        : [...prevSelected, seatId]
    );
  };

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Choose Your Seats</title>
      </Head>
      <header>
        <h1 className={styles.header}>Choose Your Seats</h1>
      </header>
      <main className={styles.div}>
        <div className={styles.screen}>SCREEN</div>

        {/* Back Rows (10 rows) */}
        <div className={styles.seatinggrid}>
          {backSeats.map((seat) => (
            <div
              key={seat.id}
              className={[
                styles.seat,
                seat.occupied ? styles.seatoccupied : "",
                selectedSeats.includes(seat.id) ? styles.seatselected : "",
              ].join(" ")}
              onClick={() =>
                !seat.occupied && handleSeatClick(seat.id, true)
              }
            />
          ))}
        </div>

        {/* Front Rows (3 rows near screen) */}
        <div className={styles.frontrow}>
          {frontSeats.map((seat) => (
            <div
              key={seat.id}
              className={[
                styles.seat,
                seat.occupied ? styles.seatoccupied : "",
                selectedSeats.includes(seat.id) ? styles.seatselected : "",
              ].join(" ")}
              onClick={() =>
                !seat.occupied && handleSeatClick(seat.id, false)
              }
            />
          ))}
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
        <button id="confirm-seats" className={styles.confirmbutton}>
          Confirm Selection
        </button>
      </main>
      <Script src="@/public/seating.js"></Script>
    </>
  );
}
