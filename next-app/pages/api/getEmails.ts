import { NextApiRequest, NextApiResponse } from "next";
import { getEmailsForPromotions } from "@/lib/promotion";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{}>,
  ) {
    

    try {
        const data = await getEmailsForPromotions();
        console.log(data);
        console.log('getEmails Check:', data);


        res.status(200).json({ data });
        return data;
    } catch (error) {
        console.error('Error getting emails:', error);
        return res.status(500).json({message: 'Error getting emails.'});
    }

  }