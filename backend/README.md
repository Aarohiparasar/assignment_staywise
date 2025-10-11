StayWise Backend

Setup

1. Copy env sample and fill values:

PORT=4000
CLIENT_URL=http://localhost:3000
MONGO_DB=mongodb://127.0.0.1:27017/staywise
JWT_SECRET=supersecretchangeme

2. Install & run

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

