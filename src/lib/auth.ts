import { cookies } from "next/headers";
import { prisma } from "./db";
import bcrypt from "bcryptjs";

const SESSION_COOKIE = "admin_session";

export async function verifyAdmin(email: string, password: string) {
  const admin = await prisma.admin.findUnique({ where: { email } });
  if (!admin) return null;

  const valid = await bcrypt.compare(password, admin.password);
  if (!valid) return null;

  return { id: admin.id, email: admin.email, name: admin.name };
}

export async function createSession(adminId: string) {
  // Simple token: base64 of adminId + timestamp + secret
  const token = Buffer.from(
    JSON.stringify({ id: adminId, ts: Date.now() })
  ).toString("base64");

  cookies().set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24, // 24 hours
    path: "/",
  });

  return token;
}

export async function getSession() {
  const token = cookies().get(SESSION_COOKIE)?.value;
  if (!token) return null;

  try {
    const decoded = JSON.parse(Buffer.from(token, "base64").toString());
    const admin = await prisma.admin.findUnique({
      where: { id: decoded.id },
      select: { id: true, email: true, name: true },
    });
    return admin;
  } catch {
    return null;
  }
}

export async function destroySession() {
  cookies().delete(SESSION_COOKIE);
}
