import { apiFetch, clearStoredToken, setStoredToken } from "./client";
import type { AuthResponse, AuthUser } from "./types";

export async function enterAsVisitor() {
  const session = await apiFetch<AuthResponse>("/api/auth/visitor", { method: "POST" });
  setStoredToken(session.token);
  return session;
}

export async function memberLogin(payload: { soc_id: string; password: string }) {
  const session = await apiFetch<AuthResponse>("/api/auth/member", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  setStoredToken(session.token);
  return session;
}

export async function getMe() {
  return apiFetch<AuthUser>("/api/auth/me");
}

export async function logout() {
  try {
    await apiFetch<{ message: string }>("/api/auth/logout", { method: "POST" });
  } finally {
    clearStoredToken();
  }
}
