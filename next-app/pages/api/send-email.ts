import { Resend } from 'resend';
import type { NextApiRequest, NextApiResponse } from 'next';

const resend = new Resend('re_eq9kibr3_EG81JVSrGPrUAVyV318bTkou');


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === 'POST') {
        const { emailList, subject, emailMessage } = await req.body;
        console.log('api request body check:', req.body);
        console.log('api email list:', emailList.data);
        console.log('api subject:', subject);
        console.log('api message check', emailMessage);

        try {
            const data = await resend.emails.send({
                from: 'Acme <onboarding@resend.dev>',
                to: emailList.data,
                subject: subject,
                html: emailMessage,
            });

            res.status(200).json({ message: 'Email sent successfully', data});
            console.log("Email sent successfully", data);
        } catch (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ error: 'Failed to send email' });
        }
    } else {
        res.status(405).json({ error: 'Method is not allowed' });
    }
}