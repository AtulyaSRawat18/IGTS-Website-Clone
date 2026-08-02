import { apiFetch } from "./client";
import type { JoinSection } from "./types";

export type JoinPayload = Partial<Pick<JoinSection, "section_title" | "body_text" | "cta_label" | "cta_url" | "display_order">>;

export async function getJoinSections() {
  return apiFetch<{ sections: JoinSection[] }>("/api/join");
}

export async function createJoinSection(payload: JoinPayload) {
  return apiFetch<{ section: JoinSection }>("/api/join", { method: "POST", body: JSON.stringify(payload) });
}

export async function updateJoinSection(id: string, payload: JoinPayload) {
  return apiFetch<{ section: JoinSection }>(`/api/join/${id}`, { method: "PUT", body: JSON.stringify(payload) });
}

export async function toggleJoinSection(id: string) {
  return apiFetch<{ section: JoinSection }>(`/api/join/${id}/toggle`, { method: "PATCH" });
}

export async function deleteJoinSection(id: string) {
  return apiFetch<Record<string, never>>(`/api/join/${id}`, { method: "DELETE" });
}
