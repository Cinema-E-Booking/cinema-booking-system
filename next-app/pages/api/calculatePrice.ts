import { NextApiRequest, NextApiResponse } from "next";
import { calculateTicketsPrice } from "@/lib/checkout";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{}>,
  ) {
    
    const { tickets, promotionCode } = req.body;

    try {
        const data = await calculateTicketsPrice(tickets);

        return res.status(200).json({ data });
    } catch (error) {
        console.error('Error getting price:', error);
        return res.status(500).json({message: 'Error getting price.'});
    }

  }