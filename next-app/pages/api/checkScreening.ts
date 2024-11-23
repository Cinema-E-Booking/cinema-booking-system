import { NextApiRequest, NextApiResponse } from "next";
import { CreateScreeningOpts, screeningWouldConflict } from "@/lib/auditorium";

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
        await screeningWouldConflict(opts);
        return res.status(201).json({message: 'Screening check succesfull'});
    } catch (error) {
        console.error('Error checking screening:', error);
        return res.status(500).json({message: error});
    }

  }