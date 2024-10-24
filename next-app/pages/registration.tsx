import Head from "next/head";
import { useState } from 'react';
import emailjs from "@emailjs/browser";

const CreateCustomer = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [wantsPromotions, setWantsPromotions] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if(!firstName || !lastName || !email || !password) {
            setError("All fields required");
            return;
          }

        const customerData = {
            email,
            password,
            firstName,
            lastName,
            wantsPromotions,
        };

        try {
            const response = await fetch('./api/newCustomer', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(customerData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }

            sendEmail();
            setSuccess('Customer created successfully!');
        } catch (err) {
            setError(String(err));
        }
    };

    const sendEmail = () => {
        const templateParams = {
          user_email: email,
          to_name: firstName
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
        <div className ="container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />
                <label>
                    <input
                        type="checkbox"
                        checked={wantsPromotions}
                        onChange={(e) => setWantsPromotions(e.target.checked)}
                    />
                    Wants Promotions
                </label>
                <button type="submit">Register</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <p>
            Already have an account? <a href="/login">Login here</a>
            </p>
        </div>
        </>
    );
};

export default CreateCustomer;
