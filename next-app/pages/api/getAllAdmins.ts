import { NextApiRequest, NextApiResponse } from "next";
import { returnAllAdmins } from "@/lib/account";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{}>,
  ) {

    try {
        const response = await returnAllAdmins();

        return res.status(200).json({ response });
    } catch (error) {
        console.error('Error getting Admins', error);
        return res.status(500).json({message: 'Error getting Admins.'});
    }

  }