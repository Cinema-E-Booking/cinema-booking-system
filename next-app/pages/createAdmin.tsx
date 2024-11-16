import Head from "next/head";
import { FormEvent, useState }  from "react";
import { signIn, useSession } from "next-auth/react";

export default function login() {
  const [username, setUsername] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {

      const response = await fetch('./api/returnUser', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email: username}),
    });
    const userData = await response.json();
    const userId = await userData.response;
    const id = userId.id;

    await fetch('./api/newAdmin', {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({accountId: id, employeeId: employeeId, title: title}),
    });

  setError('');
  setSuccess('Admin Created Succesfully!');
    } catch (err) {
        console.log(err);
        setError('There was a problem creating the admin');
    }
}
  
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Login</title>
      </Head>
      <div className="container">
        <h2>Create Admin</h2>
        <form onSubmit={handleSubmit} method="POST">
        <label htmlFor="username or email">Username/Email</label>
            <input
                    type="username"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            <label htmlFor="employee Name">Employee ID:</label>
            <input
                    type="employeeId"
                    placeholder="Employee Name"
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    required
                />
            <label htmlFor="title">Title:</label>
            <input
                    type="title"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            <button type="submit">Create Admin</button>
        </form>
      </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
    </>
  );
}