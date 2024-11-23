import { NextApiRequest, NextApiResponse } from "next";
import { getPaymentMethodCount } from "@/lib/payment";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{}>,
  ) {

    const { id } = req.body;

    try {
        const response = await getPaymentMethodCount(id);
        return res.status(200).json({ response });
        } catch (error) {
            console.error('Error returning customer card count', error);
            return res.status(500).json({message: 'Internal server err'});
        }
  }