export interface AuthData {
  token: string;
  name: string | null;
}

export interface User {
  id: string;
  name: string;
  image: string;
  imageName: string;
  note: string;
}

export type QueryUser = Omit<User, "id">;
