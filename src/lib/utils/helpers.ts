import { jwtDecode, JwtPayload } from "jwt-decode";

export interface JwtResponse extends JwtPayload {
  _id: string;
}

export const getToken = (): string | null => {
  const token = window.localStorage.getItem("data") ?? "";

  try {
    const user: JwtResponse = jwtDecode(token);
    return user?._id ?? null;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};
