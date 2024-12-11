import { NextApiRequest, NextApiResponse } from "next";
import { getSeats } from "@/lib/auditorium";
import { useState } from 'react';


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{}>,
  ) {

    //const [seatsIdInt, setSeatsIdInt] = useState<number[]>([]);

    const seatsId = req.body.seatsId;
    const seatsIdInt = [];
    console.log('api query check', req.body);

    for(let i = 0; i < seatsId.length; i++) {
        const id = parseInt(seatsId[i], 10);
        seatsIdInt.push(id);
    }
   
    try {
        console.log('api check 2: ', seatsIdInt);
        const result = await getSeats(seatsIdInt);
        res.status(200).json({ result });
        console.log('get seats api check: ', result);
        return result;
    } catch (error) {
        console.error('Error getting movie?:', error);
        return res.status(500).json({message: 'Error getting movie.'});
    }


  }