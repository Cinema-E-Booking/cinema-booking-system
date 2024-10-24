import "@/styles/style.css";
import Head from "next/head";
import { SessionProvider, useSession, signOut } from "next-auth/react"
import { useRouter } from 'next/router'

export default function App({ Component, pageProps: { session, ...pageProps} }) {
  return (
    <div>
      <Head>
        <meta content="text/html" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <SessionProvider session={session}>
        <Navbar />
        <Component {...pageProps} />
      </SessionProvider>
    </div>
  );
}

const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();

  if (router.pathname === '/login') {
    return null;
  }

  return (
    <nav>
      {session ? (
<<<<<<< Updated upstream
        <button onClick={() => signOut()}>Logout</button>
      ) : (
        <a href="http://localhost:3000/login">Login</a>
=======
        <div>
          <button onClick={() => signOut()}>Logout</button>
          <a href="http://localhost:3000/editProfile">editProfile</a>
        </div>
      ) : (
        <div>
          <a href="http://localhost:3000/login">Login</a>
        </div>
>>>>>>> Stashed changes
      )}
    </nav>
  );
};