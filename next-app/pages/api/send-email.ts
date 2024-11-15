import nodemailer from 'nodemailer';
import type { NextApiRequest, NextApiResponse } from 'next';

//const resend = new Resend('re_eq9kibr3_EG81JVSrGPrUAVyV318bTkou');
//console.log(resend.domains.create({ name: 'cinemabooking.com' }));

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === 'POST') {
        const { emailList, subject, emailMessage } = await req.body;
        console.log('api request body check:', req.body);
        console.log('api email list:', emailList.data);
        console.log('api subject:', subject);
        console.log('api message check', emailMessage);



        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            from: 'Acme <onboarding@resend.dev>',
            to: emailList.data,
            subject: subject,
            html: emailMessage,
        });

        try{
            const mailOptions = {
                from: process.env.EMAIL_SERVER_USER,
                to: emailList.data,
                subject: subject,
                html: emailMessage,
            };

            await transporter.sendMail(mailOptions);


            res.status(200).json({ message: 'Email sent successfully' });
            console.log("Email sent successfully");
        } catch (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ error: 'Failed to send email' });
        }
    } else {
        res.status(405).json({ error: 'Method is not allowed' });
    }
}