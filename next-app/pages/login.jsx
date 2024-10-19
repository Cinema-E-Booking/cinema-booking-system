import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Login</title>
      </Head>
      <div className="container">
        <h2>Login</h2>
        <form action="profile.html" method="POST">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required="" />
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required="" />
            <button type="submit">Login</button>
        </form>
        <p>
            Don't have an account? <a href="/registration">Register here</a>
        </p>
      </div>
    </>
  );
}