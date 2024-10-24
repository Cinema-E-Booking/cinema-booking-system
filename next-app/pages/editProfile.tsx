import Head from "next/head";
import { useState } from 'react';
import emailjs from "@emailjs/browser";

const CreateCustomer = () => {
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [wantsPromotions, setWantsPromotions] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [address, setAddress] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [cvc, setCVC] = useState('');
    const [cardName, setCardName] = useState('');
    const [expiration, setExpiration] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if(!firstName || !lastName || !password) {
            setError("All fields required");
            return;
          }

        const customerData = {
            password,
            firstName,
            lastName,
            wantsPromotions,
            address,
            cardNumber,
            cvc,
            cardName,
            expiration
        };

        try {
            const response = await fetch('./api/profileTest', {
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

            setSuccess('sucess');
        } catch (err) {
            setError(String(err));
        }
    };

// for saved payment cards just display the last 4 digits of the card number
    return (
        <>
        <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Edit Profile</title>
        </Head>
        <div className ="container">
            <h2>Edit Profile</h2>
            <form onSubmit={handleSubmit}>
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
                <input
                    type="text"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
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
                <label>
                    <input type="text" placeholder="Card Number" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
                    <input type="text" placeholder="Name on Card" value={cardName} onChange={(e) => setCardName(e.target.value)} />
                    <input type="text" placeholder="CVC" value={cvc} onChange={(e) => setCVC(e.target.value)} />
                    <input type="text" placeholder="expiration" value={expiration} onChange={(e) => setExpiration(e.target.value)} />
                    Payment Card 1
                </label>
                <label>
                    <input type="text" placeholder="Card Number" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
                    <input type="text" placeholder="Name on Card" value={cardName} onChange={(e) => setCardName(e.target.value)} />
                    <input type="text" placeholder="CVC" value={cvc} onChange={(e) => setCVC(e.target.value)} />
                    <input type="text" placeholder="expiration" value={expiration} onChange={(e) => setExpiration(e.target.value)} />
                    Payment Card 2
                </label>
                <label>
                    <input type="text" placeholder="Card Number" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
                    <input type="text" placeholder="Name on Card" value={cardName} onChange={(e) => setCardName(e.target.value)} />
                    <input type="text" placeholder="CVC" value={cvc} onChange={(e) => setCVC(e.target.value)} />
                    <input type="text" placeholder="expiration" value={expiration} onChange={(e) => setExpiration(e.target.value)} />
                    Payment Card 3
                </label>
                <button type="submit">Save Edits</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
        </>
    );
};

export default CreateCustomer;