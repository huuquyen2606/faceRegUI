"use client";

import { createContext } from "react";
import type { AuthData } from "./types";

export interface AuthContextValue {
  data: AuthData | null;
}

export const AuthContext = createContext<AuthContextValue>({
  data: null,
});
