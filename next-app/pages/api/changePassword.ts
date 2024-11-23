import { NextApiRequest, NextApiResponse } from "next";
import { resetAccountPassword } from "@/lib/account";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{}>,
  ) {
    
    const {accountId, newPassword} = req.body;

    try {
        const response = await resetAccountPassword(accountId, newPassword);

        return res.status(201).json({ response });
    } catch (error) {
        console.error('Error changing customer details:', error);
        return res.status(500).json({message: 'Error changing customer details'});
    }

  }