import { NextApiRequest, NextApiResponse } from "next";
import { getAllPaymentMethods } from "@/lib/payment";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{}>,
  ) {
    
    const { accountId } = req.body;

    try {
        const response = await getAllPaymentMethods(accountId);

        return res.status(200).json({ response });
    } catch (error) {
        console.error('Error getting payment Methods', error);
        return res.status(500).json({message: 'Error getting payment methods.'});
    }

  }