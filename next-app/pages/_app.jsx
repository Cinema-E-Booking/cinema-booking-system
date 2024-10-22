import "@/styles/style.css";
import Head from "next/head";
import { SessionProvider, useSession, signIn, signOut } from "next-auth/react"

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

  return (
    <nav>
      {session ? (
        <button onClick={() => signOut()}>Logout</button>
      ) : (
        <button onClick={() => signIn()}>Login</button>
      )}
    </nav>
  );
};