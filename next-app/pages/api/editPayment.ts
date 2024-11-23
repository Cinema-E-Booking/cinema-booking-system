import { NextApiRequest, NextApiResponse } from "next";
import { EditPaymentMethodOpts, editPaymentMethod } from "@/lib/payment";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{}>,
  ) {

    const {cardId, expirationDate} = req.body;
    const opts: EditPaymentMethodOpts = {
        expirationDate,
    }

    try {
        await editPaymentMethod(cardId, opts);
        return res.status(200).json({message: 'Card edited succesfully'});
    } catch (error) {
        console.error('Error editing card:', error);
        return res.status(500).json({message: error});
    }

  }