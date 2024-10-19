// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const {name, email, password} = await req.json();

    console.log("Name: ", name);
    console.log("Email: ", email);
    console.log("Password: ", password)

    return NextResponse.json({message: "User Registered"});
  } catch (error) {
    return NextResponse.json(
      {message: "Error occured with registration"}
    );
  }
}

//export default function handler(req, res) {
//  res.status(200).json({ name: "John Doe" });
//}
