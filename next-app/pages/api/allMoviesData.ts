import { NextApiRequest, NextApiResponse } from "next";
import { getAllMoviesData } from "@/lib/movie";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{}>,
  ) {
    

    try {
        const data = await getAllMoviesData();
        //console.log(data);
        //console.log('allMovies Check:', data);

        return res.status(200).json({ data });
    } catch (error) {
        console.error('Error getting movies:', error);
        return res.status(500).json({message: 'Error getting movies.'});
    }

  }