import { getScreening } from "@/lib/api_references/movies";
import { Card, getPaymentMethods } from "@/lib/api_references/payments";
import { getCustomerAccountId } from "@/lib/api_references/user";
import type { Screening, Seat } from "@/lib/auditorium";
import type { CreateTicketOpts, TicketType } from "@/lib/checkout";
import type { Promotion } from "@/lib/promotion";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

const TICKET_PRICE_ADULT = 10.99;
const TICKET_PRICE_CHILD = 9.99;
const TICKET_PRICE_SENIOR = 8.49;

const createBooking = async (userId: number, tickets: CreateTicketOpts[], promotion: Promotion | null) => {
  const data = {
    customerId: userId,
    tickets: tickets,
  } as {
    customerId: number;
    tickets: CreateTicketOpts[];
    promotionCode?: string;
  };

  if (promotion) {
    data.promotionCode = promotion.code;
  };

  const body = JSON.stringify(data);

  const resp = await fetch("/api/createBooking", {
    method: "POST",
    body: body,
    headers: {"Content-Type": "application/json"},
  });

  if (!resp.ok) {
    console.error(await resp.json());
    return false;
  }

  return true;
};

const getPromotion = async (code: string) => {
  if (code === "") return null;

  const params = new URLSearchParams({
    "code": code,
  });
  const resp = await fetch("/api/getPromotion?" + params.toString());

  if (resp.status === 400) {
    console.error(`Invalid format for code: ${code}`);
    return null;
  }

  if (resp.status === 404) {
    return null;
  }

  const data = await resp.json();
  data.endTime = new Date(data.endTime);
  return data as Promotion;
};

const usePromotion = (code: string) => {
  const [promotion, setPromotion] = useState<Promotion | null>(null);

  useEffect(() => {
    (async () => {
      const promo = await getPromotion(code);
      setPromotion(promo);
    })();
  }, [code]);

  return {promotion};
};

const useSeats = (screeningId: number) => {
  const [allSeats, setAllSeats] = useState<Seat[]>([]);
  const [availableSeats, setAvailableSeats] = useState<Seat[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);

  useEffect(() => {
    const initializeSeats = async () => {
      const screeningInfo: Screening | null = await getScreening(screeningId);

      if (screeningInfo === null || screeningInfo === undefined) {
        console.error(`null screening info for screening id ${screeningId}`);
        return;
      }

      setAllSeats(screeningInfo.auditorium.seats);
      setAvailableSeats(screeningInfo.availableSeats);
    };

    initializeSeats();
  }, [screeningId]);

  const selectSeat = useCallback((seatId: number) => {
    console.log("selected", selectedSeats);
    console.log("available", availableSeats);
    const seat = availableSeats.find(s => s.id === seatId);
    console.log("seat", seat)
    if (seat === undefined) return;


    const alreadySelected = selectedSeats.some(s => s.id === seatId);
    console.log("alreadySelected", alreadySelected);
    if (alreadySelected) return;


    console.log("new selected", [...selectedSeats, seat]);
    setSelectedSeats(sel => [...sel, seat]);
  }, [selectedSeats, availableSeats]);

  const unselectSeat = useCallback((seatId: number) => {
    setSelectedSeats(seats => seats.filter(s => s.id !== seatId));
  }, []);

  return {
    selectSeat,
    unselectSeat,
    selectedSeats,
    allSeats,
    availableSeats,
  };
};

const useTickets = (screeningId: number, selectedSeats: Seat[]) => {
  const [tickets, setTickets] = useState<CreateTicketOpts[]>([]);

  useEffect(() => {
    setTickets([]);
  }, [screeningId]);

  useEffect(() => {
    // Only keep ticket if the seat is still selected
    const stillSelected: CreateTicketOpts[] = [];
    for (const ticket of tickets) {
      if (selectedSeats.some(s => s.id === ticket.seatId)) {
        stillSelected.push(ticket);
      }
    }

    // Add ticket if the seat is selected and ticket doesnt exist yet
    const ticketsToAdd: CreateTicketOpts[] = [];
    for (const seat of selectedSeats) {
      if (!tickets.some(t => t.seatId === seat.id)) {
        ticketsToAdd.push({
          screeningId: screeningId,
          seatId: seat.id,
          ticketType: "adult",
        });
      }
    }

    setTickets([...stillSelected,...ticketsToAdd]);
  }, [screeningId, selectedSeats]);

  const setTicketType = useCallback((seatId: number, ticketType: TicketType) => {
    const ticketIndex = tickets.findIndex(t => t.seatId === seatId);
    if (ticketIndex === -1) return;

    const updatedTicket = {
      ...tickets[ticketIndex],
      ticketType,
    };

    setTickets(tickets.with(ticketIndex, updatedTicket));
  }, [tickets]);

  return {
    tickets,
    setTicketType,
  };
};

const useCards = (email: string) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [accountId, setAccountId] = useState<number>(-1);

  useEffect(() => {
    const initializeCards = async () => {
      const accountId = await getCustomerAccountId(email);
      setAccountId(accountId);
      const cardData = await getPaymentMethods(accountId);
      if (cardData === null) return;

      setCards(cardData);
    };

    initializeCards();
  }, [email]);

  return {cards, accountId};
};

const useCheckout = () => {
  const router = useRouter();

  const [promoCode, setPromoCode] = useState("");
  const {promotion} = usePromotion(promoCode);

  let screeningId: number = -1;
  if (typeof router.query.showId === "string") {
    screeningId = Number.parseInt(router.query.showId, 10);
  } else {
    console.error("Screening id not in query");
  }

  const {data} = useSession();
  let email = "";
  if (data?.user?.email) {
    email = data.user.email;
  } else {
    console.error("Email not in session data");
  }

  const {cards, accountId} = useCards(email);
  const {
    selectSeat,
    selectedSeats,
    allSeats,
  } = useSeats(screeningId);

  useEffect(() => {
    const querySeats = router.query.selectedSeats;
    if (Array.isArray(querySeats)) {
      for (const seatId of querySeats) {
        selectSeat(Number.parseInt(seatId, 10));
      };
    }
  }, [screeningId, allSeats]);

  const {tickets, setTicketType} = useTickets(screeningId, selectedSeats);

  let price = 0;
  for (const ticket of tickets) {
    switch (ticket.ticketType) {
      case "adult":
        price += TICKET_PRICE_ADULT;
        break;
      case "senior":
        price += TICKET_PRICE_SENIOR;
        break;
      case "child":
        price += TICKET_PRICE_CHILD;
        break;
    }
  }

  if (promotion !== null && promotion.endTime.getTime() > Date.now()) {
    const percentOff = promotion.percentOff;
    price = price * (1 - percentOff/100);
  };

  const finalizeBooking = useCallback(() => {
    createBooking(accountId, tickets, promotion).then(() => 
      router.push("/confirmation")
    );
  }, [accountId, tickets, promotion, router]);

  return {
    cards,
    tickets,
    setTicketType,
    selectedSeats,
    promoCode,
    setPromoCode,
    promotion,
    price,
    finalizeBooking,
  };
};

const SeatDisplay = ({
  seat, ticketType, setTicketType,
}: {
  seat: Seat;
  ticketType: TicketType;
  setTicketType: (seatId: number, ticketType: TicketType) => void;
}) => {
  return <>
    <li>
      <p>Row: {seat.row}</p>
      <p>Number: {seat.number}</p>
      <label>
        Ticket Type:
        <select value={ticketType} onChange={e => setTicketType(seat.id, e.target.value as TicketType)}>
          <option value="adult">Adult</option>
          <option value="child">Child</option>
          <option value="senior">Senior</option>
        </select>
      </label>
    </li>
  </>
};

const Checkout = () => {
  const {
    tickets,
    setTicketType,
    selectedSeats,
    cards,
    setPromoCode,
    price,
    finalizeBooking,
  } = useCheckout();
  return (
    <>
      <Head>
        <title>Checkout</title>
      </Head>
      <header>
        <h1>Checkout</h1>
      </header>
      <main>
        <form>
          <ul>
            {tickets.map(t => (
              <SeatDisplay
                key={t.seatId}
                seat={selectedSeats.find(s => s.id === t.seatId)!}
                ticketType={t.ticketType}
                setTicketType={setTicketType}
              />
            ))}
          </ul>

          <br />

          <label>
            Promo Code: 
            <input onBlur={e => setPromoCode(e.target.value)} />
          </label>
        </form>

        <h2>The Total is: ${price.toFixed(2)}</h2>

        <form>
          <label htmlFor="purchaseMethod">Select Method of Purchase</label>
          <select id="purchaseMethod" defaultValue="">
            <option value="" disabled>Select A Card</option>
            {cards.map(c => (
              <option key={c.id} value={c.id}>
                Card Number: **** **** **** {c.cardNumberLastFour}
              </option>
            ))}
          </select>

          <div style={{ textAlign: "center" }}>
            <li>
              <Link href="/profile">Add Payment Method</Link>
            </li>
          </div>

          <br />

          <div style={{ textAlign: "center" }}>
            <button type="button" onClick={() => window.location.href = '/'}>
              Cancel Payment
            </button>
            <button type="button" onClick={finalizeBooking}>
              Confirm
            </button>
          </div>
        </form>
      </main>
    </>
  );
};

export default Checkout;
