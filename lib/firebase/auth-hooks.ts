import * as React from "react";
import { AuthContext } from "./auth-context";
import { signInWithEmailAndPassword, signOut as firebaseSignOut, type Auth } from "firebase/auth";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useAuth = () => {
  return {
    ...React.useContext(AuthContext),
    signIn,
    signOut,
  };
};

async function signIn({ email, password }: { email: string; password: string }, auth: Auth): Promise<void> {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  const result = await user.getIdTokenResult();

  await fetch("/api/signin", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${result.token}`,
    },
  });
}

async function signOut(auth: Auth): Promise<void> {
  await firebaseSignOut(auth);
  await fetch("/api/signout", {
    method: "GET",
  });

  window.location.reload();
}
