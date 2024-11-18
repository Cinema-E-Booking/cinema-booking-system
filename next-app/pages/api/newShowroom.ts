import { NextApiRequest, NextApiResponse } from "next";
import { CreateAuditoriumOpts, createAuditorium } from "@/lib/auditorium";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{}>,
  ) {

    const {name, seats} = req.body;
    const opts: CreateAuditoriumOpts = {
        name,
        seats,
    }

    try {
        await createAuditorium(opts);
        return res.status(201).json({message: 'Showroom created succesfully'});
    } catch (error) {
        console.error('Error creating showroom:', error);
        return res.status(500).json({message: error});
    }

  }