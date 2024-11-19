import { NextApiRequest, NextApiResponse } from "next";
import { CreateScreeningOpts, createScreening } from "@/lib/auditorium";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{}>,
  ) {

    const {movieId, auditoriumId, startTime} = req.body;
    const opts: CreateScreeningOpts = {
        movieId,
        auditoriumId,
        startTime,
    }

    try {
        await createScreening(opts);
        return res.status(201).json({message: 'Screening created succesfully'});
    } catch (error) {
        console.error('Error creating screening:', error);
        return res.status(500).json({message: error});
    }

  }