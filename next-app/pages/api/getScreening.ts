import { NextApiRequest, NextApiResponse } from "next";
import { getScreening } from "@/lib/auditorium";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{}>,
  ) {
    
    const { screeningId } = req.body;

    try {
        const response = await getScreening(screeningId);


        console.log("api returning" + JSON.stringify(response))
        return res.status(200).json({ response });
    } catch (error) {
        console.error('Error getting screening', error);
        return res.status(500).json({message: 'Error getting screening.'});
    }

  }
