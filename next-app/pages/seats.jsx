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
        <main>
            <div className={styles.screen}>SCREEN</div>
            <div className={styles.seating.grid}>
            {/* Row 1 */}
            <div className={styles.row}>
                <div className={styles.seat.available} />
                <div className={styles.seat.available} />
                <div className={styles.seat.available} />
                <div className={styles.seat.available} />
                <div className={styles.seat.available} />
                <div className={styles.seat.available} />
            </div>
            {/* Row 2 */}
            <div className={styles.row}>
                <div className={styles.seat.available} />
                <div className={styles.seat.available} />
                <div className={styles.seat.available} />
                <div className={styles.seat.available} />
                <div className={styles.seat.available} />
                <div className={styles.seat.available} />
            </div>
            {/* Row 3 (Accessible) */}
            <div className={styles.row.accessible}>
                <div className={styles.seat.available} />
                <div className={styles.seat.available} />
                <div className={styles.seat.available} />
                <div className={styles.seat.occupied} />
                <div className={styles.seat.available} />
                <div className={styles.seat.available} />
            </div>
            {/* Row 4 */}
            <div className={styles.row}>
                <div className={styles.seat.available} />
                <div className={styles.seat.available} />
                <div className={styles.seat.occupied} />
                <div className={styles.seat.available} />
                <div className={styles.seat.available} />
                <div className={styles.seat.available} />
            </div>
            {/* Row 5 */}
            <div className={styles.row}>
                <div className={styles.seat.available} />
                <div className={styles.seat.available} />
                <div className={styles.seat.available} />
                <div className={styles.seat.available} />
                <div className={styles.seat.occupied} />
                <div className={styles.seat.available} />
            </div>
            {/* Row 6 (Back) */}
            <div className={styles.row}>
                <div className={styles.seat.available} />
                <div className={styles.seat.available} />
                <div className={styles.seat.available} />
                <div className={styles.seat.available} />
                <div className={styles.seat.occupied} />
                <div className={styles.seat.available} />
            </div>
            </div>
            <div className={styles.legend}>
            <span className={styles.available.legend}>Available</span>
            <span className={styles.selected.legend}>Selected</span>
            <span className={styles.occupied.legend}>Occupied</span>
            </div>
            <button id="confirm-seats">Confirm Selection</button>
        </main>
        <Script src="@/public/seating.jsx"></Script>
    </>
  );
}