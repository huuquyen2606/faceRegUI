/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useFirestore, useFirestoreCollection } from "reactfire";
import { serverTimestamp } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

import {
  collection,
  type CollectionReference,
  limit,
  startAfter,
  query,
  type DocumentSnapshot,
  type QueryConstraint,
  getCountFromServer,
  addDoc,
  type Firestore,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import type { QueryUser, User } from "@/lib/firebase/types";
import { dbOptions } from "./db-options";
import * as React from "react";
import { ref, uploadBytesResumable, type FirebaseStorage, getDownloadURL, deleteObject } from "firebase/storage";

export function useFetchUsers(params: { cursor: Maybe<DocumentSnapshot>; itemsPerPage: number }) {
  const firestore = useFirestore();

  // create default constraints
  const constraints: QueryConstraint[] = [limit(params.itemsPerPage)];

  if (params.cursor) {
    constraints.push(startAfter(params.cursor));
  }

  const collectionRef = collection(firestore, dbOptions.collection) as CollectionReference<QueryUser>;

  const organizationsQuery = query(collectionRef, ...constraints);

  return useFirestoreCollection(organizationsQuery);
}

export function useFetchUsersCount() {
  const firestore = useFirestore();

  return React.useCallback(() => {
    const collectionRef = collection(firestore, dbOptions.collection) as CollectionReference<QueryUser>;

    return getCountFromServer(query(collectionRef));
  }, [firestore]);
}

interface AddUserParams {
  name: string;
  image: Blob;
  note: string;
}

export async function addUser({ name, image, note }: AddUserParams, store: Firestore, storage: FirebaseStorage) {
  const imageName = `${uuidv4()}-${name}${image.name.substring(image.name.lastIndexOf("."))}`;
  const imageRef = ref(storage, imageName);
  const s = await uploadBytesResumable(imageRef, image);
  const imageUrl = await getDownloadURL(s.ref);
  await addDoc(collection(store, "users"), {
    name,
    image: imageUrl,
    imageName,
    note,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteUser(user: User, store: Firestore, storage: FirebaseStorage) {
  await deleteDoc(doc(store, "users", user.id));

  const imageRef = ref(storage, user.imageName);
  await deleteObject(imageRef);
}

interface UpdateUserParams {
  user: User;
  name: string;
  image: Blob;
  note: string;
}

export async function updateUser(
  { user, name, image, note }: UpdateUserParams,
  store: Firestore,
  storage: FirebaseStorage,
) {
  const imageRef = ref(storage, user.imageName);
  const s = await uploadBytesResumable(imageRef, image);
  const newImageUrl = await getDownloadURL(s.ref);
  await updateDoc(doc(store, "users", user.id), {
    name,
    image: newImageUrl,
    note,
    updatedAt: serverTimestamp(),
  });
}
