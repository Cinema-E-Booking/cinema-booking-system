import { NextApiRequest, NextApiResponse } from "next";
import { CreateBookingOpts, createBooking } from "@/lib/checkout";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{}>,
  ) {

    const {customerId, tickets, promotionCode} = req.body;
    const opts: CreateBookingOpts = {
        customerId: customerId,
        tickets: tickets,
        promotionCode: promotionCode
    }

    try {
        await createBooking(opts);
        return res.status(201).json({message: 'Booking created succesfully'});
    } catch (error) {
        console.error('Error creating Booking:', error);
        return res.status(500).json({message: error});
    }

  }