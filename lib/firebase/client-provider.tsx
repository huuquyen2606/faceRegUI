"use client";

import { AuthProvider } from "./client-auth-provider";
import { firebaseClientOptions } from "./client-options";
import { FirestoreProvider } from "./firestore-provider";
import { FirebaseAppProvider } from "reactfire";
import type { AuthData } from "./types";
import { FiresbaseAuthProvider } from "./firebase-auth-provider";
import { StorageProvider } from "./storage-provider";

interface FirebaseProviderProps {
  defaultAuthData: AuthData | null;
  children: React.ReactNode;
}

export function FirebaseProvider({ defaultAuthData, children }: FirebaseProviderProps): JSX.Element {
  return (
    <FirebaseAppProvider firebaseConfig={firebaseClientOptions}>
      <FiresbaseAuthProvider>
        <AuthProvider defaultAuthData={defaultAuthData}>
          <FirestoreProvider>
            <StorageProvider>{children}</StorageProvider>
          </FirestoreProvider>
        </AuthProvider>
      </FiresbaseAuthProvider>
    </FirebaseAppProvider>
  );
}
