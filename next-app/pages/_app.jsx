import "@/styles/style.css";
import Head from "next/head";
import { SessionProvider } from "next-auth/react"

export default function App({ Component, pageProps: { session, ...pageProps} }) {
  return (
    <div>
      <Head>
        <meta content="text/html" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </div>
  );
}
