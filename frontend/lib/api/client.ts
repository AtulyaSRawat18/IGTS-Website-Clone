import { ApiError } from "./errors";
import type { ApiErrorShape } from "./types";

const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000").replace(/\/$/, "");
const TOKEN_KEY = "igts_auth_token";

export function getStoredToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setStoredToken(token: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearStoredToken() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
}

export async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers);
  const hasBody = options.body !== undefined;
  if (hasBody && !headers.has("Content-Type")) headers.set("Content-Type", "application/json");

  const token = getStoredToken();
  if (token) headers.set("x-igts-token", token);

  let response: Response;
  try {
    response = await fetch(`${API_BASE}${path}`, { ...options, headers });
  } catch {
    throw new ApiError(0, "Network request failed. Check the backend URL and connection.");
  }

  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    const errorData = (data || {}) as ApiErrorShape;
    throw new ApiError(
      response.status,
      errorData.error || errorData.message || response.statusText || "Request failed",
      errorData.fields,
      errorData.code,
    );
  }

  return data as T;
}
