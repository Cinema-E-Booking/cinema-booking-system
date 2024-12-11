import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Confirmation</title>
      </Head>
      <header>
        <h1>Booking Confirmed!</h1>
      </header>
        <main>
            <h2>Thank you for booking your movie.</h2>
            <p>
                Your movie <strong>[Movie]</strong> is booked for <strong>[Date]</strong>{" "}
                at <strong>[Time]</strong>.
            </p>
            <p>Enjoy your show!</p>
            <a href="index.html" className="btn">
                Back to Home
            </a>
        </main>
        <footer>
            <p>© 2024 Cinema E-Booking</p>
        </footer>
    </>
  );
}