import { NextApiRequest, NextApiResponse } from "next";
import { returnAllCustomers } from "@/lib/account";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{}>,
  ) {

    try {
        const response = await returnAllCustomers();

        return res.status(200).json({ response });
    } catch (error) {
        console.error('Error getting Customers', error);
        return res.status(500).json({message: 'Error getting customers.'});
    }

  }