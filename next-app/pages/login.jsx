import Head from "next/head";

<<<<<<< Updated upstream:next-app/pages/login.jsx
export default function Home() {
=======
export default function login() {

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget)
    signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirect: false,
    });
  };

>>>>>>> Stashed changes:next-app/pages/login.tsx
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