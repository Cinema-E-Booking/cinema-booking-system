import { NextApiRequest, NextApiResponse } from "next";
import { CreateMovieOpts, createMovie } from "@/lib/movie";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{}>,
  ) {

    const {title, category, rating, synopsis, trailer_url, image_url, duration} = req.body;
    const opts: CreateMovieOpts = {
        title,
        category,
        rating,
        synopsis,
        trailer_url,
        image_url,
        duration
    }

    try {
        await createMovie(opts);
        return res.status(201).json({message: 'Movie created succesfully'});
    } catch (error) {
        console.error('Error creating movie:', error);
        return res.status(500).json({message: error});
    }

  }