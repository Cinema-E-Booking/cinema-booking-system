import Head from "next/head";

export default function Home() {
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
            Booking for <span id="movie-title" />
        </h2>
        <form action="confirmation.html" method="POST">
            <label htmlFor="date">Select Date:</label>
            <input type="date" id="date" name="date" required="" />
            <label htmlFor="time">Select Time:</label>
            <select id="time" name="time" required="">
                <option value="12:00 PM">12:00 PM</option>
                <option value="03:00 PM">03:00 PM</option>
                <option value="06:00 PM">06:00 PM</option>
                <option value="09:00 PM">09:00 PM</option>
            </select>
            <label htmlFor="age">Select Age:</label>
            <select id="age" name="age" required="">
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