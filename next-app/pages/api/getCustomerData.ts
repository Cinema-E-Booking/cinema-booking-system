import { NextApiRequest, NextApiResponse } from "next";
import { getCustomerData } from "@/lib/account";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{}>,
  ) {
    
    const { id } = req.body;

    try {
        const response = await getCustomerData(id);

        return res.status(200).json({ response });
    } catch (error) {
        console.error('Error creating customer:', error);
        return res.status(500).json({message: 'An account with that email is detected.'});
    }

  }