import { NextApiRequest, NextApiResponse } from "next";
import { resetAccountPassword } from "@/lib/account";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{}>,
  ) {
    
    const {id, newPassword} = req.body;

    try {
      console.log('newPassword', newPassword);
        const response = await resetAccountPassword(id, newPassword);
        console.log({response});

        return res.status(201).json({ response });
    } catch (error) {
        console.error('Error changing customer password:', error);
        return res.status(500).json({message: 'Error changing customer password'});
    }

  }