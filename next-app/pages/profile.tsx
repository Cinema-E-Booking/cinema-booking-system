import Head from "next/head";
import { useState } from 'react';
import emailjs from "@emailjs/browser";

const fetchCustomer = () => {
    //const response = await fetch('./api/profileTest');
    //if(!response.ok) {
    //    throw new Error("Failed to fetch customers");
    //}
    //const customers = await response.json();
    //return customers;

    // for the payment cards just display that last 4 digits of card number
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Profile</title>
            </Head>
            <div className="container">
            <h2>Welcome to your profile!</h2>
                <p>Email: <span id="email" /></p>
                <p>First Name: </p>
                <p>Last Name: </p>
                <p>Password: </p>
                <p>Address: </p>
                <p>Promotions: </p>
                <p>Payment Card 1: </p>
                <p>Payment Card 2: </p>
                <p>Payment Card 3: </p>
            </div>
            <p>
                <a href="/editProfile">Edit Profile</a>
            </p>
            <p>
            Logout? <a href="/login">Logout</a>
            </p>
        </>
    );
};

export default fetchCustomer;