import { NextApiRequest, NextApiResponse } from "next";
import { getAllMovies } from "@/lib/movie";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{}>,
  ) {
    

    try {
        const data = await getAllMovies();
        console.log(data);
        console.log('allMovies Check:', data);


        res.status(200).json({ data });
        return data;
    } catch (error) {
        console.error('Error getting movies:', error);
        return res.status(500).json({message: 'Error getting movies.'});
    }

  }