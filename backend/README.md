# CropCare Backend

This folder contains a minimal Express server used by the CropCare app.

Quick start:

1. cd into `backend`
2. Run `npm install` to install dependencies (this will create `node_modules` and `package-lock.json`).
3. Copy `.env.example` to `.env` and edit env vars if needed.
4. Start the server: `npm run dev` (requires `nodemon`) or `npm start`.

Endpoints:
- GET `/api/health` - health check
- POST `/api/upload` - image upload (form field name: `image`)

Uploads are saved into the `uploads/` folder and served at `/uploads`.
