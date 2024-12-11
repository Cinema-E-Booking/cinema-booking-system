import { getPromotion, Promotion } from "@/lib/promotion";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Promotion | "">,
) {
  const code = req.query.code;
  if (typeof code !== "string") {
    res.status(400).send("");
    return;
  }
  
  const promotion = await getPromotion(code)
  if (promotion === null) {
    res.status(404).send("");
    return;
  }

  res.status(200).json(promotion);
}
