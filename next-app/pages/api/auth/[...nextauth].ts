import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getCustomerAccountId } from '../../../lib/account'; 

export const authOptions = {
    providers: [
        CredentialsProvider({
        credentials: {
            email: { label: "Email", type: "string", placeholder: "Email Address"},
            password: { label: "password", type: "string", placeholder: "Password"}
          },
          async authorize(credentials, req) {
            
            try {
              const id = await getCustomerAccountId(credentials?.email, credentials?.password);
              if (id != null) {
                return { id: id };
              }
            } catch (error) {
              console.error('Error finding user', error);
            }

            return null;
          }
        }),
    ],
}

export default NextAuth(authOptions);