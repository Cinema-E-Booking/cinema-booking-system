import Head from "next/head";
import { FormEvent, useState }  from "react";
import { signIn } from "next-auth/react";
import { useRouter } from 'next/router';

export default function login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch('./api/returnCustomer', {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({username, password}),
    });

  const data = await response.json();
  const dataResponse = await data.response;
  if (dataResponse == true) {

    const userDataResponse = await fetch('./api/returnUser', {
      method: 'POST',
      body: JSON.stringify({
        email: username,
      }),
      headers: { 'Content-Type': 'application/json' },
    });

  const data2 = await userDataResponse.json();
  const user = await data2.response;

  setError('');
  setSuccess('Login Accepted!');

    if (user) {
      signIn('email', {
        email: username,
        callbackUrl: 'http://localhost:3000'
      });
    }

  } else {

    const adminDataResponse = await fetch('./api/returnAdmin', {
      method: 'POST',
      body: JSON.stringify({
        username: username,
        password: password,
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    const adminData = await adminDataResponse.json();
    const admin = await adminData.response;

    if (admin) {
      console.log('admin login success')
      router.push('/admin');
    } else {
      setSuccess('');
      setError('Login Failure: Incorrect Username or Password');

      return null;
    }
  }
}
  
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
            <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            <label htmlFor="password">Password:</label>
            <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            <button type="submit">Login</button>
        </form>
        <p>
            Don't have an account? <a href="/registration">Register here</a>
        </p>
        <p>
            Forgot Your Password? <a href="/forgotPassword">Change Password Here</a>
        </p>
      </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
    </>
  );
}