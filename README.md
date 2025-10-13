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
npm run dev

API Overview
- Auth: `/api/users/signUp`, `/api/users/login`, `/api/users/profile/:id`
- Properties: `/api/properties`, `/api/properties/:id` (POST `/api/properties` admin)
- Bookings: POST `/api/bookings`, GET `/api/bookings/me`, GET `/api/bookings` (admin)

