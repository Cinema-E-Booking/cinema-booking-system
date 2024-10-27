import Head from "next/head";
import { FormEvent, useState }  from "react";
import { signIn, useSession } from "next-auth/react";

export default function forgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userDataResponse = await fetch('./api/returnUser', {
      method: 'POST',
      body: JSON.stringify({
        email: email,
      }),
      headers: { 'Content-Type': 'application/json' },
    });

  const data2 = await userDataResponse.json();
  const user = await data2.response;

    if (user) {
      setError('');
      setSuccess('Email sent! please click the link sent in the email');
      signIn('email', {
        email: email,
        callbackUrl: 'http://localhost:3000/changePassword'
      });
    } else {  
      setError('There is no user with that email')
      setSuccess('');
      return null;
    }

  };
  
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Login</title>
      </Head>
      <div className="container">
        <h2>Email Confirmation</h2>
        <p>
          Enter your email and we will send you a link to update your password.
        </p>
        <form onSubmit={handleSubmit} method="POST">
            <label htmlFor="email">Email:</label>
            <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            <button type="submit">Send Password</button>
        </form>
      </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
    </>
  );
}