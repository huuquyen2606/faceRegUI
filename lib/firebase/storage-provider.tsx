"use client";

import { getStorage } from "firebase/storage";
import { StorageProvider as BaseStorageProvider, useFirebaseApp } from "reactfire";

export function StorageProvider({ children }: { children: React.ReactNode }): JSX.Element {
  const firestoreInstance = getStorage(useFirebaseApp());

  return <BaseStorageProvider sdk={firestoreInstance}>{children}</BaseStorageProvider>;
}
