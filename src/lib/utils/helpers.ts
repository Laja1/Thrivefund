import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { jwtDecode, JwtPayload } from "jwt-decode";

export interface JwtResponse extends JwtPayload {
  _id: string;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getToken = (): string | null => {
  const token = window.localStorage.getItem("data") ?? "";

  const user: JwtResponse = jwtDecode(token);

  if (user) {
    return user?._id;
  }
  return null;
};
