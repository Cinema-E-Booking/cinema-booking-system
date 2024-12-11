import { query } from "./database";
import { getPromotion } from "./promotion";

export const TICKET_PRICE_ADULT = 10.99;
export const TICKET_PRICE_SENIOR = 9.99;
export const TICKET_PRICE_CHILD = 8.49;

export type TicketType = "adult" | "senior" | "child";

export interface Ticket {
  id: number;
  screeningId: number;
  seatId: number;
  bookingId: number;
  ticketType: TicketType;
};

export interface Booking {
  id: number;
  customerId: number;
  tickets: Ticket[];
  promotionCode?: string;
};

export type CreateTicketOpts = Omit<Ticket, "id" | "bookingId">;
export async function createTicket(opts: CreateTicketOpts, bookingId: number) {
  const queryText = `
  INSERT INTO ticket (screening_id, seat_id, booking_id, tick_type)
  VALUES ($1, $2, $3, $4)
  RETURNING id;
  `;

  const values = [opts.screeningId, opts.seatId, bookingId, opts.ticketType];
  const res = await query(queryText, values);

  return res.rows[0].id;
};

export interface CreateBookingOpts {
  customerId: number;
  tickets: CreateTicketOpts[];
  promotionCode?: string;
};
export async function createBooking(opts: CreateBookingOpts): Promise<Booking> {
  const queryText = `
  INSERT INTO booking (customer_id, promotion_code)
  VALUES ($1, $2)
  RETURNING id;
  `;

  const values = [opts.customerId, opts.promotionCode];
  const res = await query(queryText, values);
  const bookingId = res.rows[0].id;

  const tickets = [];
  for (const ticket of opts.tickets) {
    tickets.push({
      id: await createTicket(ticket, bookingId),
      screeningId: ticket.screeningId,
      seatId: ticket.seatId,
      bookingId: bookingId,
      ticketType: ticket.ticketType,
    });
  };

  return {
    id: bookingId,
    customerId: opts.customerId,
    tickets: tickets,
    promotionCode: opts.promotionCode,
  };
};

export async function getBooking(bookingId: number): Promise<Booking> {
  const bookingQueryText = `
  SELECT id, customer_id, promotion_code
  FROM booking
  WHERE id = $1;
  `;

  const ticketsQueryText = `
  SELECT id, screening_id, seat_id, booking_id, tick_type
  FROM ticket
  WHERE booking_id = $1;
  `;

  const values = [bookingId];
  const bookingRes = await query(bookingQueryText, values);
  const ticketsRes = await query(ticketsQueryText, values);

  const tickets = [];
  for (const row of ticketsRes.rows) {
    tickets.push({
      id: row.id,
      screeningId: row.screening_id,
      seatId: row.seat_id,
      bookingId: row.booking_id,
      ticketType: row.tick_type,
    });
  }

  return {
    id: bookingRes.rows[0].id,
    customerId: bookingRes.rows[0].customer_id,
    tickets: tickets,
    promotionCode: bookingRes.rows[0].promotion_code,
  };
};

export async function calculateBookingPrice(bookingId: number) {
  const booking = await getBooking(bookingId);

  return await calculateTicketsPrice(booking.tickets, booking.promotionCode);
};

export async function getCustomerBookingHistory(customerId: number) {
  const queryText = `
  SELECT id FROM booking WHERE customer_id = $1;
  `;

  const values = [customerId];
  const res = await query(queryText, values);

  const bookingIds = [];
  for (const row of res.rows) {
    bookingIds.push(row.id);
  }

  const bookings = [];
  for (const bookingId of bookingIds) {
    bookings.push(await getBooking(bookingId));
  }

  return bookings;
};

export async function calculateTicketsPrice(tickets: CreateTicketOpts[], promotionCode?: string) {
  let basePrice = 0;
  for (const ticket of tickets) {
    switch (ticket.ticketType) {
      case "adult":
        basePrice += TICKET_PRICE_ADULT;
        break;
      case "senior":
        basePrice += TICKET_PRICE_SENIOR;
        break;
      case "child":
        basePrice += TICKET_PRICE_CHILD;
        break;
    };
  }

  if (promotionCode === undefined) {
    return basePrice;
  }

  const promotion = await getPromotion(promotionCode);
  if (
    promotion === null ||
    promotion.endTime.getTime() > Date.now()
  ) {
    return basePrice;
  }

  const percentOff = promotion.percentOff;
  return basePrice * (100-percentOff)/100;
};
