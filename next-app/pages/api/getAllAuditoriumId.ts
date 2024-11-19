import { NextApiRequest, NextApiResponse } from "next";
import { getAllAuditoriums } from "@/lib/auditorium";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{}>,
  ) {
    

    try {
        const data = await getAllAuditoriums();

        return res.status(200).json({ data });
    } catch (error) {
        console.error('Error getting auditoriums:', error);
        return res.status(500).json({message: 'Error getting auditoriums.'});
    }

  }