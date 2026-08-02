
## Authentication Routes
`POST /api/auth/visitor` has no body and no auth requirement; it creates a 24-hour visitor session and returns `{ token, role: "visitor", display_name: "Visitor", expires_at }`. `POST /api/auth/member` has no auth requirement and accepts `{ display_name, password }`; it validates the seeded member credentials, replaces any active session for that member, and returns `{ token, role: "member", display_name, user_id, expires_at }`. `POST /api/auth/logout` requires the `x-igts-token` header, deletes the matching session if it exists, and returns `{ message: "Logged out" }` idempotently. `GET /api/auth/me` requires `x-igts-token`; it returns `{ user_id, display_name, role }` for a valid non-expired session, deletes expired sessions, and returns `401` for missing, invalid, or expired sessions.

## MongoDB Auth Update
Member login now accepts `{ soc_id, password }`, not `{ display_name, password }`. The response still includes the opaque session `token`, `role`, `display_name`, `user_id`, `expires_at`, and now also includes `soc_id` for member sessions.
