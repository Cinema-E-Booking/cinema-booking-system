import { NextApiRequest, NextApiResponse } from "next";
import { getScreening } from "@/lib/auditorium";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{}>,
  ) {
    
    try {
        const { id } = req.query;
        const screeningId = parseInt(String(id), 10);
        const response = await getScreening(screeningId);

        return res.status(200).json({ response });
    } catch (error) {
        console.error('Error getting screening', error);
        return res.status(500).json({message: 'Error getting screening.'});
    }

  }