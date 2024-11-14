import { NextApiRequest, NextApiResponse } from "next";
import { getMovie } from "@/lib/movie";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{}>,
  ) {
   
    try {
        const { id } = req.query;
        const movieId = parseInt(String(id), 10);
        const result = await getMovie(movieId);
        res.status(200).json({ result });
        return result;
    } catch (error) {
        console.error('Error deleting movies:', error);
        return res.status(500).json({message: 'Error deleting movies.'});
    }


  }