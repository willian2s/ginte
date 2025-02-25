import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";

export interface TokenPayload {
  id: number;
  email: string;
  iat: number;
  exp: number;
}

export async function getAuthToken(): Promise<string | null> {
  const token = (await cookies()).get("auth_token")?.value;
  return token || null;
}

export async function verifyAuth(): Promise<TokenPayload | null> {
  try {
    const token = await getAuthToken();

    if (!token) {
      return null;
    }

    const decoded = verify(token, process.env.JWT_SECRET || "secret");
    return decoded as TokenPayload;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getUserId(): Promise<number | null> {
  const payload = await verifyAuth();
  return payload?.id || null;
}
