"use client";

import { getAuth } from "firebase/auth";
import { AuthProvider as BaseFirebaseAuthProvider, useFirebaseApp } from "reactfire";

interface FirestoreProviderProps {
  children: React.ReactNode;
}

export function FiresbaseAuthProvider({ children }: FirestoreProviderProps): JSX.Element {
  const auth = getAuth(useFirebaseApp());
  return <BaseFirebaseAuthProvider sdk={auth}>{children}</BaseFirebaseAuthProvider>;
}
