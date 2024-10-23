import Head from "next/head";
import { FormEvent }  from "react";
import { signIn } from "next-auth/react";

export default function login() {

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget)
    const response = await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      callbackUrl: 'http://localhost:3000/',
    });
  };
  
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Login</title>
      </Head>
      <div className="container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} method="POST">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required />
            <button type="submit">Login</button>
        </form>
        <p>
            Don't have an account? <a href="/registration">Register here</a>
        </p>
      </div>
    </>
  );
}