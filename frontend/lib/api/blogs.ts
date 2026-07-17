import { apiFetch } from "./client";
import type { Blog } from "./types";

export type BlogPayload = Partial<Pick<Blog, "title" | "category" | "topic" | "header_image_url" | "content" | "tags" | "external_links" | "read_time_mins" | "status">>;

export async function getPublishedBlogs(params: Record<string, string> = {}) {
  const query = new URLSearchParams(params).toString();
  return apiFetch<{ blogs: Blog[] }>(`/api/blogs${query ? `?${query}` : ""}`);
}

export async function getBlogBySlug(slug: string) {
  return apiFetch<{ blog: Blog }>(`/api/blogs/${slug}`);
}

export async function createBlog(payload: BlogPayload) {
  return apiFetch<{ blog: Blog }>("/api/blogs", { method: "POST", body: JSON.stringify(payload) });
}

export async function updateBlog(id: string, payload: BlogPayload) {
  return apiFetch<{ blog: Blog }>(`/api/blogs/${id}`, { method: "PUT", body: JSON.stringify(payload) });
}

export async function toggleBlogPublication(id: string) {
  return apiFetch<{ blog: Blog }>(`/api/blogs/${id}/publish`, { method: "PATCH" });
}

export async function deleteBlog(id: string) {
  return apiFetch<Record<string, never>>(`/api/blogs/${id}`, { method: "DELETE" });
}
