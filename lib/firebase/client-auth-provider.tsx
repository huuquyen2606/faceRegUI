"use client";

import * as React from "react";
import { startTransition } from "react";
import type { User as FirebaseUser, Unsubscribe } from "firebase/auth";
import type { IdTokenResult } from "firebase/auth";
import type { AuthData } from "./types";
import { AuthContext } from "./auth-context";
import { useAuth } from "reactfire";

const mapFirebaseResponseToAuthData = (result: IdTokenResult, user: FirebaseUser): AuthData => {
  const providerData = user.providerData && user.providerData[0];

  return {
    token: result.token,
    name: providerData.displayName || user.displayName || user.email || null,
  };
};

export interface AuthProviderProps {
  defaultAuthData: AuthData | null;
  children: React.ReactNode;
}

export const AuthProvider: React.FunctionComponent<AuthProviderProps> = ({ defaultAuthData, children }) => {
  const auth = useAuth();
  const [authData, setAuthData] = React.useState(defaultAuthData);

  const handleIdTokenChanged = async (firebaseUser: FirebaseUser | null): Promise<void> => {
    if (!firebaseUser) {
      startTransition(() => {
        setAuthData(null);
      });
      return;
    }

    const tokenResult = await firebaseUser.getIdTokenResult();
    startTransition(() => {
      setAuthData(mapFirebaseResponseToAuthData(tokenResult, firebaseUser));
    });
  };

  const registerChangeListener = async (): Promise<Unsubscribe> => {
    const { onIdTokenChanged } = await import("firebase/auth");
    return onIdTokenChanged(auth, handleIdTokenChanged);
  };

  React.useEffect(() => {
    const unsubscribePromise = registerChangeListener();

    return () => {
      unsubscribePromise.then((unsubscribe) => unsubscribe());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <AuthContext.Provider value={{ data: authData }}>{children}</AuthContext.Provider>;
};
