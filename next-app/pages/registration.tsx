import Head from "next/head";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";

const CreateCustomer = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [wantsPromotions, setWantsPromotions] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!firstName || !lastName || !email || !password) {
            setError("All fields are required");
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
            const response = await fetch('/api/newCustomer', {
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

            setSuccess("Customer created successfully!");
            // Automatically sign in the user after successful registration
            signIn("email", { email: email, callbackUrl: 'http://localhost:3000' });

        } catch (err) {
            setError("Could Not Create Customer");
            console.error(err);
        }
    };

    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Movie Theater Register</title>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" />
            </Head>

            <header className="navbar">
                <div className="brand">
                    <img src="/images/logo.jpg" alt="Cinema Logo" />
                    <h1>Cinema Booking Services</h1>
                </div>
                <ul>
                    <li>
                        <Link href="/">
                         <a>Home</a>
                        </Link>
                    </li>
                </ul>
            </header>

            <div className="container">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="firstName">Full Name:</label>
                    <input
                        type="text"
                        id="firstName"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        id="lastName"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <label>
                        <input
                            type="checkbox"
                            checked={wantsPromotions}
                            onChange={(e) => setWantsPromotions(e.target.checked)}
                        />
                        I want to receive promotions and updates
                    </label>
                    <button type="submit">Register</button>
                </form>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {success && <p style={{ color: 'green' }}>{success}</p>}
                <p>
                    Already have an account?{" "}
                    <Link href="/login">
                        <a>Login here</a>
                    </Link>
                </p>
            </div>

            <style jsx>{`
                body {
                    font-family: 'Roboto', Arial, sans-serif;
                    background-color: #fffcfc;
                    margin: 0;
                    padding: 0;
                }

                .navbar {
                    background-color: #002b5c;
                    padding: 10px;
                    color: white;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                .navbar img {
                    width: 80px;
                    height: auto;
                    margin-right: 10px;
                }

                .navbar .brand {
                    display: flex;
                    align-items: center;
                }

                .navbar .brand h1 {
                    font-size: 20px;
                    margin: 0;
                    padding-left: 10px;
                }

                .navbar ul {
                    list-style: none;
                    margin: 0;
                    padding: 0;
                    display: flex;
                }

                .navbar ul li {
                    margin-right: 20px;
                }

                .navbar ul li a {
                    color: white;
                    text-decoration: none;
                    font-weight: bold;
                    transition: border-bottom 0.3s ease;
                }

                .navbar ul li a:hover {
                    text-decoration: underline;
                    border-bottom: 2px solid white;
                }

                .container {
                    background-color: #ffffff;
                    border-radius: 8px;
                    padding: 40px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    max-width: 400px;
                    text-align: center;
                    margin: 100px auto;
                }

                .container h2 {
                    color: #333;
                    margin-bottom: 20px;
                }

                input[type="text"],
                input[type="email"],
                input[type="password"] {
                    width: 95%;
                    padding: 12px;
                    margin-top: 8px;
                    margin-bottom: 12px;
                    border-radius: 5px;
                    border: 1px solid #ccc;
                }

                button {
                    background-color: #002b5c;
                    color: #fff;
                    padding: 10px 20px;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 1rem;
                    transition: background-color 0.3s;
                }

                button:hover {
                    background-color: #001f43;
                }

                p {
                    margin-top: 20px;
                    color: #666;
                }

                p a {
                    color: #0056b3;
                    text-decoration: none;
                }

                p a:hover {
                    text-decoration: underline;
                }
            `}</style>
        </>
    );
};

export default CreateCustomer;
