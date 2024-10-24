import { NextApiRequest, NextApiResponse } from "next";
import { AddPaymentMethodOpts, addPaymentMethod  } from "@/lib/payment";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{}>,
  ) {

    const {accountId, cardNumber, billingAddress, expirationDate} = req.body;
    const opts: AddPaymentMethodOpts = {
        id: accountId,
        cardNumber,
        billingAddress,
        expirationDate,
    }

    try {
        const response = await addPaymentMethod(accountId, opts);
        return res.status(201).json({ response });
    } catch (error) {
        console.error('Error creating payment', error);
        return res.status(500).json({message: error});
    }

  }