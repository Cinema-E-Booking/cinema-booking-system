import Head from "next/head";
import { useRouter } from 'next/router';
import Link from 'next/link'
import { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";
import { Ticket, Booking } from '@/lib/checkout';
import { getCustomerAccountId } from "../lib/api_references/user";
import { getPaymentMethods } from "../lib/api_references/payments";

interface Card {
  id: number;
  cardOwnerId: number;
  cardNumberLastFour: string;
  expirationDate: string;
} 

interface Seat {
  id: number;
  row: string;
  number: number;
}

const Checkout = () => {
  type TicketType = "adult" | "senior" | "child";

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [seats, setSeats] = useState([]);
  const [ticketType, setTicketType] = useState<TicketType>();
  const [screeningId, setScreeningId] = useState<number>();
  const [showId, setShowId] = useState<string | string[] | undefined>('');
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [cards, setCards] = useState<Card[]>([]);
  //const [seatsIdInt, setSeatsIdInt] = useState<number>([]);

  const { data: session, status } = useSession();
  const router = useRouter();
  const data = router.query;
  const seatsArray = data.selectedSeats;
  console.log('data check: ', data);
  const id = 0;
  const bookingId = Math.floor(Math.random() * 1000) + 1000;

  useEffect(() => {
    if (data.showId) {
      setShowId(data.showId);

      if (typeof data.showId === 'string') {
        setScreeningId(parseInt(data.showId, 10));
      }
    }
  }, [data.showId]);

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const response = await fetch(`/api/getSeats`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ seatsId: seatsArray }),
        });
        const seatsData = await response.json();
        setSeats(seatsData.result);
      } catch (error) {
        setError('Error occurred while fetching seats');
      }
    }

      fetchSeats();
  }, [data.selectedSeats]);

  useEffect(() => {
    console.log('checkout seats check: ', seats);
    console.log('checkout tickets check: ', tickets);
  }, [seats, tickets]);

  useEffect(()=> {
    onRefresh()
  }, [session, status]);

  //const confirmTicket = async (seatId:number) => {
    //e.preventDefault();
    //setError("");
    //setSuccess("");

    //if (!title || !category || !rating || !synopsis || !trailer_url || !image_url || !duration || !screening_time) {
    //  setError("All fields are required.");
    //  return;
  //}

  const onRefresh = async () => {

    try {

      const userId = await getCustomerAccountId(session?.user?.email)

        const cardsDataArray = await getPaymentMethods(userId);
      if (cardsDataArray != null) {
          setCards(cardsDataArray);
      }
    
    } catch (err) {
        console.log(err);
        setSuccess('')
        setError('Something went wrong')
    }
    
}

  const confirmTicket = async (seatId:number) => {
    
    
    setError('');


    if (!seatId || !ticketType || !screeningId) {
        setError("All fields are required");
        return;
    }


    const newTicket: Ticket = {
        id,
        screeningId: screeningId,
        seatId: seatId,
        bookingId: bookingId,
        ticketType: ticketType,
    };

    try {
        const response = await fetch('/api/newTicket', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({screeningId: newTicket.screeningId, seatId: newTicket.seatId, ticketType: newTicket.ticketType, bookingId: newTicket.bookingId}),
        });


        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }


        setSuccess('Ticket created successfully!');
        // Update tickets list after adding
        setTickets(prevTickets => [...prevTickets, newTicket]);
    } catch (err) {
        setError("Could not create ticket");
    }
};



const handleCardSelect = async (value: any) => {

}

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Checkout</title>
      </Head>
      <header>
        <h1>Checkout</h1>
      </header>
        <main>
        <form>
            <ul>
                {seats.map(seat => (
                    <li key={seat['id']}>
                        <p>Row: {seat['row'] || "loading"}</p>
                        <p>Number: {seat['number']}
                          <div className="ticketType">
                          <select
                            value={ticketType}
                            onChange={(e) => setTicketType(e.target.value as TicketType)}
                            required
                            style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
                          >
                            <option value="">Select</option>
                            <option value="adult">Adult</option>
                            <option value="child">Child</option>
                            <option value="senior">Senior</option>
                          </select>
                          </div>
                          <button onClick={async (event) => {await confirmTicket(seat['id'])}}>Confirm Ticket</button>
                        </p>
                    </li>
                  ))}
              </ul>
          </form>
            <h2>The Total is: [Total]</h2>
            <form action="confirmation.html" method="POST">
            <label htmlFor="purchaseMethod">Select Method of Purchase</label>
            <select onChange={(e) => handleCardSelect(e.target.value)} defaultValue="">
                <option value="" disabled>Select a card</option>
                {cards.map(card => (
                <option key={card.id} value={card.id}>
                Card Number: **** **** **** {card.cardNumberLastFour}
                </option>
                  ))}
            </select>
            { /*
            <label htmlFor="addMethodofPurchase">Add Method of Purchase</label>
            <p id="addMethodofPurchase" />
            <p>
                <label htmlFor="ccn">Credit/Debit Card Number:</label>
                <input type="text" id="ccn" name="creditCardNumber" />
                <label htmlFor="name">Name on Card:</label>
                <input type="text" id="name" name="creditCardName" />
                <label htmlFor="name">Billing Address:</label>
                <input type="text" id="name" name="creditCardName" />
            </p>
                */}
            <div style={{ textAlign: "center" }}>
                <li>
                  <Link href="/profile">Add Payment Method</Link>
                </li>
            </div>
            <p />
            <div style={{ textAlign: "center" }}>
            <button type="button" onClick={() => window.location.href = '/'}>
              Cancel Payment
            </button>
                <button type="submit">
                <a href="confirmation.html" />
                    Confirm Payment
                </button>
            </div>
            </form>
        </main>
        <footer>
            <p>© 2024 Cinema E-Booking</p>
        </footer>
    </>
  );
};

export default Checkout;