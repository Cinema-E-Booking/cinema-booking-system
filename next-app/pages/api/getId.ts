import { NextApiRequest, NextApiResponse } from "next";
import { getCustomerAccountId } from "@/lib/account";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{}>,
  ) {

    const {email} = req.body;

    try {
        const response = await getCustomerAccountId(email);
        return res.status(200).json({ response });
        } catch (error) {
            console.error('Error returning customer id', error);
            return res.status(500).json({message: 'Internal server err'});
        }
  }