import { NextApiRequest, NextApiResponse } from "next";
import { deleteSeat } from "@/lib/auditorium";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{}>,
  ) {
   
    try {
        const { id } = req.query;
        const seatId = parseInt(String(id), 10);
        const result = await deleteSeat(seatId);
        res.status(200).json({ result });
    } catch (error) {
        console.error('Error deleting seat:', error);
        return res.status(500).json({message: 'Error deleting seat.'});
    }


  }