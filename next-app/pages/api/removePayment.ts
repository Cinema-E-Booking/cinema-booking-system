import { NextApiRequest, NextApiResponse } from "next";
import { removePaymentMethod } from "@/lib/payment";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{}>,
  ) {
    
    const { cardId } = req.body;

    try {
        const response = await removePaymentMethod(cardId);

        return res.status(200).json({ response });
    } catch (error) {
        console.error('Error deleting payment method', error);
        return res.status(500).json({message: 'Error deleting payment method.'});
    }

  }