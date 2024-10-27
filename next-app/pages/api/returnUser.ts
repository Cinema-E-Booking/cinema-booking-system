import { NextApiRequest, NextApiResponse } from "next";
import { returnUser } from "@/lib/account";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{}>,
  ) {

    const {email} = req.body;

    try {
        const response = await returnUser(email);
        return res.status(201).json({ response });
        } catch (error) {
            console.error('Error returning customer', error);
            return res.status(500).json({message: 'Internal server err'});
        }
  }
