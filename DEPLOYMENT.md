# IGTS Deployment Notes

## Backend on Render

Recommended: create a Render Blueprint from the repository root. The repo includes
`render.yaml`, which points Render at the `backend` folder.

Settings:
- Runtime: Node
- Root Directory: `backend`
- Build Command: `npm ci`
- Start Command: `npm start`
- Health Check Path: `/api/health`

Environment variables:
- `MONGODB_URI`: your MongoDB Atlas connection string
- `PORT`: leave unset on Render unless Render asks for it; the app reads Render's injected port
- `CORS_ORIGIN`: your Vercel frontend URL, for example `https://igts.vercel.app`

Database setup:
1. Create a MongoDB Atlas cluster/database.
2. Add `MONGODB_URI` on Render before the first deploy.
3. Add the Render outbound IPs to MongoDB Atlas Network Access, or temporarily use `0.0.0.0/0` while developing.
4. Run `node seed.js` once from the backend folder with the same `MONGODB_URI`.
5. Run `node seedShowcaseGames.js` and `node seedShowcaseArticles.js` once if the showcase content is missing.

Seeded member credentials come from `seed.js`:
- `IGTS Admin` / `igts-admin-001`
- `Member Alpha` / `igts-mem-002`
- `Member Beta` / `igts-mem-003`

## Frontend on Vercel

Create a Vercel project from the `frontend` folder.

Settings:
- Framework Preset: Next.js
- Root Directory: `frontend`
- Build Command: `npm run build`
- Install Command: `npm install`

Environment variables:
- `NEXT_PUBLIC_API_URL`: your Render backend URL, for example `https://igts-backend.onrender.com`

After both deploys:
1. Put the Vercel URL into Render's `CORS_ORIGIN`.
2. Put the Render URL into Vercel's `NEXT_PUBLIC_API_URL`.
3. Redeploy both services after changing environment variables.

