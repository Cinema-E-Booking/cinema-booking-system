import { NextApiRequest, NextApiResponse } from "next";
import { /*CreateAdminOpts,*/ createAdmin } from "@/lib/account";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{}>,
  ) {
    
    const { accountId, employeeId, title } = req.body;

    try {
        const response = await createAdmin(accountId, employeeId, title);

        return res.status(200).json({ response });
    } catch (error) {
        console.error('Error creating admin', error);
        return res.status(500).json({message: 'Error creating admin'});
    }

  }