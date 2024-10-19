import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Order Summary</title>
      </Head>
      <header>
            <h1>Order Summary</h1>
      </header>
        <main>
            <h2>Your Cart:</h2>
            <div style={{ textAlign: "center" }}>
            <p>
                Ticket 1 <strong>[Movie]</strong> is booked for <strong>[Date]</strong>{" "}
                at <strong>[Time]</strong> in seat <strong>[Seat]</strong>. Ticket cost{" "}
                <strong>[Price]</strong>
            </p>
            <button className="btn">Delete Ticket</button>
            <p>
                Ticket 2 <strong>[Movie]</strong> is booked for <strong>[Date]</strong>{" "}
                at <strong>[Time]</strong> in seat <strong>[Seat]</strong>. Ticket cost{" "}
                <strong>[Price]</strong>
            </p>
            <button className="btn">Delete Ticket</button>
            </div>
            <div style={{ textAlign: "center" }}>
            <p>
                {" "}
                The total cost of your tickets is: <strong>[Total]</strong>
            </p>
            <a href="booking.html" className="btn">
                Update Order
            </a>
            </div>
            <div>|</div>
            <div style={{ textAlign: "center" }}>
            <a href="checkout.html" className="btn">
                Proceed To Checkout
            </a>
            </div>
        </main>
        <footer>
            <p>© 2024 Cinema E-Booking</p>
        </footer>
    </>
  );
}