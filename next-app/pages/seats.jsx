import Head from "next/head";
import styles from "@/styles/seating-style.module.css"
import Script from "next/script"

export default function Home() {
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
            {/* Row 1 */}
            <div className={styles.row}>
                <div className={[styles.seat, styles.seatavailable].join(" ")} />
                <div className={[styles.seat, styles.seatavailable].join(" ")} />
                <div className={[styles.seat, styles.seatavailable].join(" ")} />
                <div className={[styles.seat, styles.seatavailable].join(" ")} />
                <div className={[styles.seat, styles.seatavailable].join(" ")} />
                <div className={[styles.seat, styles.seatavailable].join(" ")} />
            </div>
            {/* Row 2 */}
            <div className={styles.row}>
                <div className={[styles.seat, styles.seatavailable].join(" ")} />
                <div className={[styles.seat, styles.seatavailable].join(" ")} />
                <div className={[styles.seat, styles.seatoccupied].join(" ")} />
                <div className={[styles.seat, styles.seatavailable].join(" ")} />
                <div className={[styles.seat, styles.seatavailable].join(" ")} />
                <div className={[styles.seat, styles.seatavailable].join(" ")} />
            </div>
            {/* Row 3 (Accessible) */}
            <div className={styles.row}>
                <div className={[styles.seat, styles.seatavailable].join(" ")} />
                <div className={[styles.seat, styles.seatavailable].join(" ")} />
                <div className={[styles.seat, styles.seatavailable].join(" ")} />
                <div className={[styles.seat, styles.seatavailable].join(" ")} />
                <div className={[styles.seat, styles.seatavailable].join(" ")} />
                <div className={[styles.seat, styles.seatavailable].join(" ")} />
            </div>
            {/* Row 4 */}
            <div className={styles.row}>
                <div className={[styles.seat, styles.seatavailable].join(" ")} />
                <div className={[styles.seat, styles.seatoccupied].join(" ")} />
                <div className={[styles.seat, styles.seatavailable].join(" ")} />
                <div className={[styles.seat, styles.seatavailable].join(" ")} />
                <div className={[styles.seat, styles.seatavailable].join(" ")} />
                <div className={[styles.seat, styles.seatavailable].join(" ")} />
            </div>
            {/* Row 5 */}
            <div className={styles.row}>
                <div className={[styles.seat, styles.seatavailable].join(" ")} />
                <div className={[styles.seat, styles.seatavailable].join(" ")} />
                <div className={[styles.seat, styles.seatavailable].join(" ")} />
                <div className={[styles.seat, styles.seatavailable].join(" ")} />
                <div className={[styles.seat, styles.seatoccupied].join(" ")} />
                <div className={[styles.seat, styles.seatavailable].join(" ")} />
            </div>
            {/* Row 6 (Back) */}
            <div className={styles.row}>
                <div className={[styles.seat, styles.seatavailable].join(" ")} />
                <div className={[styles.seat, styles.seatavailable].join(" ")} />
                <div className={[styles.seat, styles.seatavailable].join(" ")} />
                <div className={[styles.seat, styles.seatavailable].join(" ")} />
                <div className={[styles.seat, styles.seatavailable].join(" ")} />
                <div className={[styles.seat, styles.seatavailable].join(" ")} />
            </div>
            </div>
            <div className={styles.legend}>
            <span className={styles.availablelegend}>Available</span>
            <span className={styles.selectedlegend}>Selected</span>
            <span className={styles.occupiedlegend}>Occupied</span>
            </div>
            <button id="confirm-seats">Confirm Selection</button>
        </main>
        <Script src="@/public/seating.jsx"></Script>
    </>
  );
}