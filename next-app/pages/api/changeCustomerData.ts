import { NextApiRequest, NextApiResponse } from "next";
import { editCustomer, EditCustomerOpts } from "@/lib/account";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{}>,
  ) {
    
    const {id, firstName, lastName, wantsPromotions} = req.body;
    const opts: EditCustomerOpts = {
        firstName,
        lastName,
        wantsPromotions
    }

    try {
        const response = await editCustomer(id, opts);
        console.log({response});

        return res.status(201).json({ response });
    } catch (error) {
        console.error('Error changing customer details:', error);
        return res.status(500).json({message: 'Error changing customer details'});
    }

  }