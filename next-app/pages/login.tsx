import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useState, FormEvent } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";


export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Your existing login functionality here
  };

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Login</title>
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
      <section className="hero">
        <div className="container">
          <h2>Login</h2>
          <form onSubmit={handleSubmit} method="POST">
            <label htmlFor="email">Username or Email:</label>
            <input
              type="text"
              id="email"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
            <button type="submit">Login</button>
          </form>
          <p>Don't have an account? <a href="/registration">Register here</a></p>
          <p>Forgot Your Password? <a href="/forgotPassword">Change Password Here</a></p>
        </div>
        <img src="/images/loginphoto.jpg" alt="Login Photo" />
      </section>

      <style jsx>{`
        @font-face {
          font-family: 'Chom Extra Bold';
          src: url('/fonts/ChomExtraBold.ttf') format('truetype');
        }

        body {
          font-family: 'Chom Extra Bold', Arial, sans-serif;
          background-color: white;
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

        .hero {
          display: flex;
          justify-content: space-between; /* Align login box to the left */
          align-items: center;
          height: 70vh;
          padding: 20px;
          background-color: #fff;
        }

        .hero img {
          max-width: 50%;
          height: auto;
          margin-right: 20px;
        }

        .container {
          background-color: #fff;
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          max-width: 400px;
          text-align: center;
          margin-right: 40px;
        }

        .container h2 {
          color: #333;
          margin-bottom: 20px;
        }

        label {
          display: block;
          margin-top: 15px;
          text-align: left;
          color: #555;
        }

        input[type="email"],
        input[type="password"] {
          width: 95%;
          padding: 12px;
          margin-top: 8px;
          margin-bottom: 12px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }

        button {
          background-color: #002b5c;
          color: #fff;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 16px;
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
}
