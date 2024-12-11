import { NextApiRequest, NextApiResponse } from "next";
import { CreateTicketOpts, createTicket } from "@/lib/checkout";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{}>,
  ) {

    const {screeningId, seatId, ticketType, bookingId} = req.body;
    const opts: CreateTicketOpts = {
        screeningId: screeningId,
        seatId: seatId,
        ticketType: ticketType
    }

    try {
        //await createTicket(opts);
        return res.status(201).json({message: 'Ticket created succesfully'});
    } catch (error) {
        console.error('Error creating Ticket:', error);
        return res.status(500).json({message: error});
    }

  }