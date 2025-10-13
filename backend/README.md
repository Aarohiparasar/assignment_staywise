StayWise Backend

Setup Locally

1. Install & run

npm install
npm run dev
# or build
npm run build && npm start

API
- POST `/api/users/signUp`
- POST `/api/users/login`
- GET `/api/users/profile/:id` (auth)
- GET `/api/properties`
- GET `/api/properties/:id`
- POST `/api/properties` (admin)
- POST `/api/bookings` (auth)
- GET `/api/bookings/me` (auth)
- GET `/api/bookings` (admin)

