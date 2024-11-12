import { NextApiRequest, NextApiResponse } from "next";
import { deleteMovie } from "@/lib/movie";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{}>,
  ) {
   
    try {
        const { movieId } = req.query;
        console.log('query api check:', req.query);
        const id = parseInt(movieId as string, 10);
        console.log('pwease:',id);
        console.log('api check:',movieId);
        const result = await deleteMovie(id);
        console.log('deleteMovie Check:', result);


        res.status(200).json({ result });
    } catch (error) {
        console.error('Error deleting movies:', error);
        return res.status(500).json({message: 'Error deleting movies.'});
    }


  }
