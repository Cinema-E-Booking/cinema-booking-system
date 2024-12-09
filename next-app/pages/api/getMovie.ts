import { NextApiRequest, NextApiResponse } from "next";
import { getMovie } from "@/lib/movie";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{}>,
  ) {

    const { movieId } = req.body;
   
    try {
        const result = await getMovie(movieId);
        res.status(200).json({ result });
        return result;
    } catch (error) {
        console.error('Error getting movie?:', error);
        return res.status(500).json({message: 'Error getting movie.'});
    }


  }