import { NextApiRequest, NextApiResponse } from "next";
import { searchMovies } from "@/lib/movie";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{}>,
  ) {
   
    try {
        const title = String(req.query.title);
        console.log('search api check 1:', req.query.title);
        console.log('search api check 2:', title);
        const result = await searchMovies(title);
        res.status(200).json({ result });
        return result;
    } catch (error) {
        console.error('Error deleting movies:', error);
        return res.status(500).json({message: 'Error deleting movies.'});
    }
  }