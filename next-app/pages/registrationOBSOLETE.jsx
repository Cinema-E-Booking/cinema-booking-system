import Head from "next/head";
import { useState } from "react";
import emailjs from "@emailjs/browser";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!name || !email || !password) {
      setError("All fields required");
      return;
    }

    try {
      const res = await fetch('api', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password })
      });

      if(res.ok) {
        const form = e.target;
        form.reset();
      } else {
        console.log("Registration Failed")
      }
    } catch (error) {
      console.log("Error occured during Resgistration", error)
    }

    sendEmail();
  };
  
  const sendEmail = () => {
    const templateParams = {
      user_email: email,
      to_name: name
    }

    // the first parameter of .send is your emailJS serviceID, right now this page only sends emails from andrew.ingraham555@gmail.com
    // in the future we could create an email for the Cinema E-Booking site so that emailJS sends emails from that email.
    emailjs
  .send('service_a3a4w2o', 'template_k636mzi', templateParams, {
    publicKey: 'LjAx_0FZrUNw_jL0A',
  })
  .then(
    (res) => {
      console.log('SUCCESS!', res.status, res.text);
    },
    (err) => {
      console.log('FAILED...', err);
    },
  );
  }

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Registration</title>
      </Head>
      <div className="container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit} action="profile.html" method="POST">
            <label htmlFor="name">Full Name:</label>
            <input onChange={(e) => setName(e.target.value)} type="text" id="name" name="name" required="" />
            <label htmlFor="email">Email:</label>
            <input onChange={(e) => setEmail(e.target.value)} type="email" id="email" name="email" required="" />
            <label htmlFor="password">Password:</label>
            <input onChange={(e) => setPassword(e.target.value)} type="password" id="password" name="password" required="" />
            <button type="submit">Register</button>

            {error && (
              <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                {error}
              </div>
            )}
        </form>
        <p>
            Already have an account? <a href="/login">Login here</a>
        </p>
        </div>
    </>
  );
}