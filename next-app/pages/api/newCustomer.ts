import { NextApiRequest, NextApiResponse } from "next";
import { CreateCustomerOpts, createCustomer } from "@/lib/account";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{}>,
  ) {

    const {email, password, firstName, lastName, wantsPromotions, status, billingAddress} = req.body;
    const opts: CreateCustomerOpts = {
        email,
        password,
        firstName,
        lastName,
        wantsPromotions,
        status,
        billingAddress
    }

    try {
        await createCustomer(opts);
        return res.status(201).json({message: 'Customer created succesfully'});
    } catch (error) {
        console.error('Error creating customer:', error);
        return res.status(500).json({message: error});
    }

  }