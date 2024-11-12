import { NextApiRequest, NextApiResponse } from "next";
import { getAllPromotions } from "@/lib/promotion";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{}>,
  ) {
    

    try {
        const data = await getAllPromotions();
        console.log(data);
        console.log('allPromotions Check:', data);


        res.status(200).json({ data });
        return data;
    } catch (error) {
        console.error('Error getting promotions:', error);
        return res.status(500).json({message: 'Error getting promotions.'});
    }

  }