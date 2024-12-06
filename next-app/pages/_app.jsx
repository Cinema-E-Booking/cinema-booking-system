import "@/styles/style.css";
import Head from "next/head";
import { SessionProvider, useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";

export default function App({ Component, pageProps: { session, ...pageProps } }) {
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
        <div>
          <button onClick={() => signOut({ callbackUrl: '/login' })}>Logout</button>
          <a href="http://localhost:3000/editProfile">Edit Profile</a>
        </div>
      ) : null}
    </nav>
  );
};
