import Head from "next/head";
import Script from "next/script";

export default function Home() {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Profile</title>
      </Head>
      <div className="container">
        <h2>Welcome to your profile!</h2>
        <p>
            Your email: <span id="email" />
        </p>
        <a href="/logout">Logout</a>
      </div>
    </>
  );
}