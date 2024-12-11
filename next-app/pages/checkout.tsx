import Head from "next/head";
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";
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

type TicketType = "adult" | "senior" | "child";

export interface Ticket {
  screeningId: number;
  seatId: number;
  bookingId: number;
  ticketType: TicketType;
};

const Checkout = () => {

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [seats, setSeats] = useState<Seat[]>([]);
  const [ticketTypes, setTicketTypes] = useState<Record<number, TicketType>>({});
  const [screeningId, setScreeningId] = useState<number>();
  const [showId, setShowId] = useState<string | string[] | undefined>('');
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [cards, setCards] = useState<Card[]>([]);
  const [total, setTotal] = useState(0);

  const { data: session, status } = useSession();
  const router = useRouter();
  const data = router.query;
  const seatsArray = data.selectedSeats;
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
    onRefresh();
  }, [session, status]);

  useEffect(() => {
    getPrice();
  }, [tickets]);

  const onRefresh = async () => {
    try {
      const userId = await getCustomerAccountId(session?.user?.email);
      const cardsDataArray = await getPaymentMethods(userId);
      if (cardsDataArray != null) {
        setCards(cardsDataArray);
      }
    } catch (err) {
      setError('Something went wrong');
    }
  }

  const confirmTicket = async (seatId: number) => {
    setError('');
    if (!seatId || !ticketTypes[seatId] || !screeningId) {
      setError("All fields are required");
      return;
    }

    if (ticketTypes[seatId]) {
      setTickets(prevTickets => ({...prevTickets, [seatId]: {screeningId: Number(data.showId),seatId: seatId,bookingId: 0,ticketType: ticketTypes[seatId] }}))
    } else {

    setTickets(prevTickets => [...prevTickets, {screeningId: Number(data.showId),seatId: seatId,bookingId: 0,ticketType: ticketTypes[seatId]}]);
    }
  }

  /*
    const newTicket: Ticket = {
      screeningId: screeningId,
      seatId: seatId,
      bookingId: bookingId,
      ticketType: ticketTypes[seatId],
    };

    try {
      const response = await fetch('/api/newTicket', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          screeningId: newTicket.screeningId,
          seatId: newTicket.seatId,
          ticketType: newTicket.ticketType,
          bookingId: newTicket.bookingId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      setSuccess('Ticket created successfully!');
      setTickets(prevTickets => [...prevTickets, newTicket]);
    } catch (err) {
      setError("Could not create ticket");
    }
  }; */

  const handleCardSelect = (cardId: number) => {
    console.log("Selected card ID: ", cardId);
  };

  const handleConfirmPayment = async () => {
    
  }

const getPrice = async () => {
  if (Array.isArray(tickets)) {
    const validTickets = tickets.filter(ticket => ticket && Object.keys(ticket).length > 0);
    const response = await fetch(`/api/calculatePrice`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tickets: validTickets, promotionCode: "Saver Combo" }),
    });
    const Data = await response.json();
    console.log("GetPrice: ", Data);
  
    if (Data) {
      setTotal(Data.data)
    }
  } else {
    console.error('S is not an array:', tickets);
  }
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
            {seats.map((seat) => (
              <li key={seat.id}>
                <p>Row: {seat.row || "loading"}</p>
                <p>Number: {seat.number}</p>
                <div className="ticketType">
                  <select
                    value={ticketTypes[seat.id] || ''}
                    onChange={(e) => setTicketTypes((prev) => ({
                      ...prev,
                      [seat.id]: e.target.value as TicketType,
                    }))}
                    required
                    style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
                  >
                    <option value="">Select</option>
                    <option value="adult">Adult</option>
                    <option value="child">Child</option>
                    <option value="senior">Senior</option>
                  </select>
                </div>
                <button
                  type="button"
                  onClick={async (event) => {
                    event.preventDefault();
                    await confirmTicket(seat.id);
                  }}
                >
                  Confirm Ticket
                </button>
              </li>
            ))}
          </ul>
        </form>

        <h2>The Total is: [{total}]</h2>

        <form>
          <label htmlFor="purchaseMethod">Select Method of Purchase</label>
          <select onChange={(e) => handleCardSelect(Number(e.target.value))} defaultValue="">
            <option value="" disabled>Select a card</option>
            {cards.map(card => (
              <option key={card.id} value={card.id}>
                Card Number: **** **** **** {card.cardNumberLastFour}
              </option>
            ))}
          </select>

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
            <button type="button" onClick={getPrice}>
              Calculate Payment
            </button>
            <button type="button" onClick={() => window.location.href = '/confirmation'}>
              Cancel Payment
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
