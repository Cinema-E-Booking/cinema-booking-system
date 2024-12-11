import { NextApiRequest, NextApiResponse } from "next";
import { getCustomerBookingHistory } from "@/lib/checkout";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{}>,
  ) {
    
    const { id } = req.body;

    try {
        const data = await getCustomerBookingHistory(id);

        return res.status(200).json({ data });
    } catch (error) {
        console.error('Error getting auditoriums:', error);
        return res.status(500).json({message: 'Error getting auditoriums.'});
    }

  }