export type Role = "visitor" | "member";

export type AuthUser = {
  user_id: string;
  display_name: string;
  soc_id?: string;
  role: Role;
};

export type AuthResponse = AuthUser & {
  token: string;
  expires_at: string;
};

export type Blog = {
  _id: string;
  title: string;
  slug: string;
  category: string;
  topic?: string;
  header_image_url?: string;
  content: string;
  author?: { user_id: string; display_name: string; soc_id?: string };
  status?: "draft" | "published";
  tags?: string[];
  external_links?: { label?: string; url?: string }[];
  read_time_mins?: number;
  created_at?: string;
  updated_at?: string;
};

export type Game = {
  _id: string;
  name: string;
  slug: string;
  tagline?: string;
  description?: string;
  game_type?: string;
  difficulty?: string;
  play_url?: string;
  thumbnail_url?: string;
  tags?: string[];
  created_by?: { user_id: string; display_name?: string };
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
};

export type MemberProfile = {
  _id: string;
  user_id: string;
  display_name: string;
  soc_id?: string;
  designation?: string;
  year?: string;
  bio?: string;
  pfp_url?: string;
  email?: string;
  show_email?: boolean;
  linkedin_url?: string;
  personal_site?: string;
  created_at?: string;
  updated_at?: string;
};

export type JoinSection = {
  _id: string;
  section_title?: string;
  body_text?: string;
  cta_label?: string;
  cta_url?: string;
  is_active?: boolean;
  display_order?: number;
  created_by?: { user_id?: string; display_name?: string };
  created_at?: string;
  updated_at?: string;
};

export type ApiErrorShape = {
  error?: string;
  message?: string;
  fields?: Record<string, string>;
  code?: string;
};
