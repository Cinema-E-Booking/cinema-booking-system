import { NextApiRequest, NextApiResponse } from "next";
import { compareCustomerLogin } from "@/lib/account";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{}>,
  ) {

    const {email, password} = req.body;

    try {
        await compareCustomerLogin(email, password);
        return res.status(201).json({message: 'Customer exists'});
        } catch (error) {
            console.error('Error returning customer', error);
            return res.status(500).json({message: 'Internal server err'});
        }
  }