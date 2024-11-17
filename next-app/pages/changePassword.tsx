import Head from "next/head";
import { FormEvent, useState }  from "react";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/router';

export default function changePassword() {
  const [newPassword, setNewPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const {data: session} = useSession();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!oldPassword || !newPassword ) {
      setSuccess('')
      setError('Please fill out both fields')

      return null;
    }

    try {
        const userIdData = await fetch('./api/getId', {
            method: 'POST',
            body: JSON.stringify({
              email: session?.user?.email,
            }),
            headers: { 'Content-Type': 'application/json' },
          });
        const userData = await userIdData.json();
        const userId = await userData.response;

        const passwordResponse = await fetch('./api/returnCustomer', {
          method: 'POST',
          body: JSON.stringify({
            email: session?.user?.email,
            password: oldPassword,
          }),
          headers: { 'Content-Type': 'application/json' },
        });

        const passwordResponseData = await passwordResponse.json();
        const passwordIsValid = passwordResponseData.response;
        console.log('Password matches response: ', passwordIsValid)

        if (passwordIsValid) {
          const userDataResponse = await fetch('./api/changePassword', {
            method: 'POST',
            body: JSON.stringify({
              accountId: userId,
              newPassword: newPassword,
            }),
            headers: { 'Content-Type': 'application/json' },
          });
      
        const data2 = await userDataResponse.json();
        const user = await data2.response;
        console.log('resetAccountPassword response: ', user)

        setError('');
        setSuccess('Password Updated Succesfully!');
        router.push('/');
        } else {
          setSuccess('');
          setError('Entered password is incorrect.')
        }

        } catch (err) {
            console.log(err);
            setSuccess('');
            setError('Password could not be changed');
        }

  };
  
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Login</title>
      </Head>
      <div className="container">
        <h2>Change Password</h2>
        <p>
          Enter a new password and we will update it for you.
        </p>
        <form onSubmit={handleSubmit} method="POST">
            <label htmlFor="email">Old Password:</label>
            <input
                    type="password"
                    placeholder="Old Password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    required
                />
            <label htmlFor="email">New Password:</label>
            <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
            <button type="submit">Update Password</button>
        </form>
      </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
    </>
  );
}