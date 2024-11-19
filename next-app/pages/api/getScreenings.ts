import { NextApiRequest, NextApiResponse } from "next";
import { getMovieScreenings } from "@/lib/auditorium";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{}>,
  ) {
    
    const { movieId } = req.body;

    try {
        const response = await getMovieScreenings(movieId, false);

        return res.status(200).json({ response });
    } catch (error) {
        console.error('Error getting screenings', error);
        return res.status(500).json({message: 'Error getting screenings.'});
    }

  }