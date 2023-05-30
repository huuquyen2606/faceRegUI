import { cx } from "classix";
import { twMerge } from "tailwind-merge";

type ClassValue = string | string | boolean | null | undefined;

export function cn(...inputs: ClassValue[]): string {
  return twMerge(cx(...inputs));
}
