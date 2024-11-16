import { NextApiRequest, NextApiResponse } from "next";
import { getIsAdmin } from "@/lib/account";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{}>,
  ) {

    const {accountId} = req.body;

    try {
        const response = await getIsAdmin(accountId);
        return res.status(201).json({ response });
        } catch (error) {
            console.error('Error returning admin', error);
            return res.status(500).json({message: 'Internal server err'});
        }
  }
