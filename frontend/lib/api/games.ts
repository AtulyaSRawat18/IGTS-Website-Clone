import { apiFetch } from "./client";
import type { Game } from "./types";

export type GamePayload = Partial<Pick<Game, "name" | "tagline" | "description" | "game_type" | "difficulty" | "play_url" | "thumbnail_url" | "tags">>;

export async function getActiveGames(params: Record<string, string> = {}) {
  const query = new URLSearchParams(params).toString();
  return apiFetch<{ games: Game[] }>(`/api/games${query ? `?${query}` : ""}`);
}

export async function getGameBySlug(slug: string) {
  return apiFetch<{ game: Game }>(`/api/games/${slug}`);
}

export async function createGame(payload: GamePayload) {
  return apiFetch<{ game: Game }>("/api/games", { method: "POST", body: JSON.stringify(payload) });
}

export async function updateGame(id: string, payload: GamePayload) {
  return apiFetch<{ game: Game }>(`/api/games/${id}`, { method: "PUT", body: JSON.stringify(payload) });
}

export async function toggleGame(id: string) {
  return apiFetch<{ game: Game }>(`/api/games/${id}/toggle`, { method: "PATCH" });
}

export async function deleteGame(id: string) {
  return apiFetch<Record<string, never>>(`/api/games/${id}`, { method: "DELETE" });
}
