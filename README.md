StayWise (Full-Stack)

Monorepo layout:
- `/backend` – Express + Mongo + JWT
- `/frontend` – Next.js (App Router) + Tailwind

Run locally

Backend
cd backend
npm install
npm run dev

Frontend
cd frontend
npm install
# set NEXT_PUBLIC_API_URL=https://assignment-staywise-ph7g-git-main-aarohi-singhs-projects.vercel.app/ in .env.local (optional)
npm run dev

Deploy
- Frontend: Vercel (set `NEXT_PUBLIC_API_URL` to your backend URL)
- Backend: Render/Railway/Fly/Heroku (set env vars: PORT, CLIENT_URL, MONGO_DB, JWT_SECRET)

API Overview
- Auth: `/api/users/signUp`, `/api/users/login`, `/api/users/profile/:id`
- Properties: `/api/properties`, `/api/properties/:id` (POST `/api/properties` admin)
- Bookings: POST `/api/bookings`, GET `/api/bookings/me`, GET `/api/bookings` (admin)

