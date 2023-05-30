"use client";

import { getFirestore } from "firebase/firestore";
import { FirestoreProvider as BaseFirestoreProvider, useFirebaseApp } from "reactfire";

interface FirestoreProviderProps {
  children: React.ReactNode;
}

export function FirestoreProvider({ children }: FirestoreProviderProps): JSX.Element {
  const firestoreInstance = getFirestore(useFirebaseApp());

  return <BaseFirestoreProvider sdk={firestoreInstance}>{children}</BaseFirestoreProvider>;
}
