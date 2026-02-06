import jwt from "jsonwebtoken"

export interface AuthUser {
  id: string;
  type: "doctor" | "patient";
}

export function getUserFromAuthHeader(req: Request): AuthUser | null {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) return null;

    const token = authHeader.replace("Bearer ", "");
    if (!token) return null;

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as AuthUser;

    return decoded;
  } catch {
    return null;
  }
}
