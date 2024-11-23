import { NextApiRequest, NextApiResponse } from "next";
import { searchRating } from "@/lib/movie";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{}>,
  ) {
   
    try {
        const rating = String(req.query.rating);
        console.log('search api check 1:', req.query.rating);
        console.log('search api check 2:', rating);
        const result = await searchRating(rating);
        res.status(200).json({ result });
        console.log('search api check 3:', result);
        return result;
    } catch (error) {
        console.error('Error deleting movies:', error);
        return res.status(500).json({message: 'Error deleting movies.'});
    }
  }