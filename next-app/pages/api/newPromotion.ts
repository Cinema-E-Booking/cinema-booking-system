import { NextApiRequest, NextApiResponse } from "next";
import { CreatePromotionOpts, createPromotion } from "@/lib/promotion";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{}>,
  ) {

    const {code, percentOff, endTime} = req.body;
    const opts: CreatePromotionOpts = {
        code,
        percentOff,
        endTime
    }

    try {
        await createPromotion(opts);
        return res.status(201).json({message: 'Movie created succesfully'});
    } catch (error) {
        console.error('Error creating movie:', error);
        return res.status(500).json({message: error});
    }

  }