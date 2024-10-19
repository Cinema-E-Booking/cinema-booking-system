import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Registration</title>
      </Head>
      <div className="container">
        <h2>Register</h2>
        <form action="profile.html" method="POST">
            <label htmlFor="name">Full Name:</label>
            <input type="text" id="name" name="name" required="" />
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required="" />
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required="" />
            <button type="submit">Register</button>
        </form>
        <p>
            Already have an account? <a href="/login">Login here</a>
        </p>
        </div>
    </>
  );
}