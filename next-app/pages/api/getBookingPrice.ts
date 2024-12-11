import { NextApiRequest, NextApiResponse } from "next";
import { calculateBookingPrice } from "@/lib/checkout";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{}>,
  ) {
    
    const { id } = req.body;

    try {
        const data = await calculateBookingPrice(id);

        return res.status(200).json({ data });
    } catch (error) {
        console.error('Error getting booking price:', error);
        return res.status(500).json({message: 'Error getting booking price.'});
    }

  }