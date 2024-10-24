import { NextApiRequest, NextApiResponse } from "next";
import { query } from "../../lib/database";
import { EditCustomerOpts, editCustomer } from "@/lib/account";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{}>,
  ) {

    try {
        const result = await query('SELECT * FROM customer');
        res.status(200).json(result.rows);
        console.log("results:", result.rows)
    } catch (error) {
        console.error("Error", error);
    }

    const {firstName, lastName, wantsPromotions, accountId, status} = req.body;
    const opts: EditCustomerOpts = {
        firstName,
        lastName,
        wantsPromotions,
        status
    }
    console.log("firstName: ", firstName);
    console.log("Promotion: ", wantsPromotions);

    try {
        await editCustomer(accountId, opts);
        console.log(accountId);
        return res.status(201).json({message: 'Customer edited succesfully'});
    } catch (error) {
        console.error('Error creating customer:', error);
        return res.status(500).json({message: 'An account with that email is detected.'});
    }
  }