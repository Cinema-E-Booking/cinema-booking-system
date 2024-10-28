import { NextApiRequest, NextApiResponse } from "next";
import { CreateAdminOpts, createAdmin } from "@/lib/account";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{}>,
  ) {
    
    const { employeeId, title, password } = req.body;
    const opts: CreateAdminOpts = {
        employeeId,
        title,
        password,
    }

    try {
        const response = await createAdmin(opts);

        return res.status(200).json({ response });
    } catch (error) {
        console.error('Error creating admin', error);
        return res.status(500).json({message: 'Error creating admin'});
    }

  }