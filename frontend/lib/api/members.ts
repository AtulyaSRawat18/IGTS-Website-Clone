import { apiFetch } from "./client";
import type { MemberProfile } from "./types";

export type MemberPayload = Partial<Pick<MemberProfile, "display_name" | "designation" | "year" | "bio" | "pfp_url" | "email" | "show_email" | "linkedin_url" | "personal_site">>;

export async function getMembers(params: Record<string, string> = {}) {
  const query = new URLSearchParams(params).toString();
  return apiFetch<{ members: MemberProfile[] }>(`/api/members${query ? `?${query}` : ""}`);
}

export async function getMember(id: string) {
  return apiFetch<{ member: MemberProfile }>(`/api/members/${id}`);
}

export async function createMemberProfile(payload: MemberPayload) {
  return apiFetch<{ member: MemberProfile }>("/api/members", { method: "POST", body: JSON.stringify(payload) });
}

export async function updateMemberProfile(id: string, payload: MemberPayload) {
  return apiFetch<{ member: MemberProfile }>(`/api/members/${id}`, { method: "PUT", body: JSON.stringify(payload) });
}

export async function deleteMemberProfile(id: string) {
  return apiFetch<Record<string, never>>(`/api/members/${id}`, { method: "DELETE" });
}
