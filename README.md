## Email Classifier Frontend - Deployment Notes (Vercel)

Set the following Environment Variables in Vercel:

- `REACT_APP_API_URL` → `https://<your-render-backend>.onrender.com/api`
- `REACT_APP_SOCKET_URL` → `https://<your-render-backend>.onrender.com`

Rebuild after changing envs. At runtime, the app will fallback to same-origin `/api` if envs are not set.

Health check (backend): `GET /health` or `GET /api/health`.

