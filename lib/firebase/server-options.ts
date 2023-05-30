/* eslint-disable @typescript-eslint/no-non-null-assertion */

const useSecureCookies = process.env.COOKIE_SECURE === "true";

export const firebaseServerOptions = {
  useSecureCookies,
  firebaseApiKey: process.env.FIREBASE_API_KEY!,
  serviceAccount: {
    projectId: process.env.FIREBASE_PROJECT_ID!,
    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL!,
    privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY!.replace(/\\n/g, "\n"),
  },
};

export const cookieOptions = {
  name: "facereg-auth-token",
  signatureKeys: process.env.COOKIE_SIGNATURE_KEY!.split(", "),
  path: "/",
  httpOnly: true,
  secure: useSecureCookies,
  sameSite: "lax" as const,
  maxAge: 12 * 60 * 60 * 24 * 1000, // twelve days
};
