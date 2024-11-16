import { NextApiRequest, NextApiResponse } from "next";
import { compareCustomerLogin } from "@/lib/account";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{}>,
  ) {

    const {email, providedPassword} = req.body;

    try {
        const response = await compareCustomerLogin(email, providedPassword);
        return res.status(201).json({ response });
        } catch (error) {
            console.error('Error returning customer', error);
            return res.status(500).json({message: 'Internal server err'});
        }
  }
