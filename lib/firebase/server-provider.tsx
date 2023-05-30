import { getTokens } from "next-firebase-auth-edge/lib/next/tokens";
import { cookies } from "next/headers";
import { FirebaseProvider } from "./client-provider";
import { cookieOptions, firebaseServerOptions } from "./server-options";
import type { Tokens } from "next-firebase-auth-edge/lib/auth";
import type { AuthData } from "./types";

const mapTokensToAuthData = ({ token, decodedToken }: Tokens): AuthData => {
  const { email, name } = decodedToken;

  return {
    token,
    name: name || email || null,
  };
};

export async function FirebaseServerProvider({ children }: { children: React.ReactNode }): Promise<JSX.Element> {
  const tokens = await getTokens(cookies(), {
    serviceAccount: firebaseServerOptions.serviceAccount,
    apiKey: firebaseServerOptions.firebaseApiKey,
    cookieName: cookieOptions.name,
    cookieSignatureKeys: cookieOptions.signatureKeys,
  });

  const authData = tokens ? mapTokensToAuthData(tokens) : null;

  return <FirebaseProvider defaultAuthData={authData}>{children}</FirebaseProvider>;
}
