import NextAuth from "next-auth"
import PostgresAdapter from "@auth/pg-adapter"
import { Pool } from "pg"
import EmailProvider from "next-auth/providers/email"
import CredentialsProvider from 'next-auth/providers/credentials';
import { NextAuthOptions } from "next-auth";

const pool = new Pool({
    host: "cinema_database",
    user: "postgres",
    password: "postgres",
    database: "postgres",
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  })

export const authOptions: NextAuthOptions = {
  adapter: PostgresAdapter(pool),
  // Configure one or more authentication providers
  providers: [
    EmailProvider({
        server: {
            host: process.env.EMAIL_SERVER_HOST,
            port: process.env.EMAIL_SERVER_PORT ? parseInt(process.env.EMAIL_SERVER_PORT, 10) : 465,
            auth: {
                user: process.env.EMAIL_SERVER_USER,
                pass: process.env.EMAIL_SERVER_PASSWORD
            }
        },
        from: process.env.EMAIL_FROM
      }), // Credentials Provider was an attempt to login without email verification,
          // but NextAuth hates people who use this so it wouldnt activate the session even if the user was valid.
      /*CredentialsProvider({
        name: 'credentials',
        async authorize(credentials) {
            try {
            console.log('Attempting to sign in with:', credentials);
          // Replace with your own logic to validate credentials
          const res = await fetch('http://127.0.0.1:3000/api/returnCustomer', {
            method: 'POST',
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
            headers: { 'Content-Type': 'application/json' },
          });

          const data = await res.json();
          const dataResponse = data.response;
          console.log('First Fetch:', dataResponse);
        } catch (error) {
            console.error('Error with first fetch:', error);
        }
        try {
            const userDataResponse = await fetch('http://127.0.0.1:3000/api/returnUser', {
                method: 'POST',
                body: JSON.stringify({
                  email: credentials?.email,
                }),
                headers: { 'Content-Type': 'application/json' },
              });

              // Convert fetched data to user object
              const userData = await userDataResponse.json();
              const user = await userData.response;

              console.log('Found user:', user);
              // If no error and we have user data, return it
            
            return user;
        } catch (error) {
            console.log('Error in second fetch:', error);
          // Return null if user data could not be retrieved
          return null;
        }
        },
        credentials: {
            email: { label: "Email", type: "text", placeholder: "you@example.com" },
            password: { label: "Password", type: "password" },
          },
      }), */
  ],
  session: {
    strategy: 'database',
  },
}
export default NextAuth(authOptions)