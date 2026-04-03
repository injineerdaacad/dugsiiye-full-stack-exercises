# Personal Finance Tracker API

Production-ready Node.js and Express API for personal finance management, with JWT authentication, role-based access control, transaction tracking, profile uploads, and Swagger documentation.

## Tech Stack

- Node.js (ES modules)
- Express 5
- MongoDB + Mongoose
- Zod validation
- JWT authentication
- Cloudinary (profile image upload)
- Swagger (OpenAPI docs)

## Features

- Authentication (`sign-up`, `login`, `profile`, `logout`)
- Role-based authorization (`user`, `admin`)
- Transaction CRUD with monthly summary
- Admin overview metrics
- Profile picture upload
- Global error handling and request logging
- Rate limiting and Helmet security headers

## Project Structure

```text
config/         # DB, CORS, rate limit, cloudinary setup
controllers/    # Route handlers
middlewares/    # Auth, role checks, upload, validation, errors
models/         # Mongoose schemas
routes/         # API routes + Swagger annotations
schemas/        # Zod request schemas
seeds/          # Seed scripts
utility/        # JWT, Swagger, helper utilities
```

## Environment Variables

Use `.env.development` for local and `.env.production` for production.
Use `.env.example` as the template.

Required variables:

- `NODE_ENV`
- `PORT`
- `BASE_URL`
- `MONGO_URI`
- `ALLOWED_ORIGINS`
- `JWT_SECRET`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `SUPER_ADMIN_EMAIL`
- `SUPER_ADMIN_PASSWORD`

## Install and Run

```bash
npm install
npm run dev
```

Production:

```bash
npm start
```

## Deploy (Railway, Render, or any PaaS)

1. Push this project to GitHub.
2. In your hosting platform, create a new project from your GitHub repo.
3. Set the start command to `npm start` (usually auto-detected).
4. Add environment variables in the platform dashboard (do not upload `.env.production`):
   - `NODE_ENV=production`
   - `PORT` (most platforms inject this automatically)
   - `BASE_URL` = your public API URL (recommended)
   - `MONGO_URI`
   - `ALLOWED_ORIGINS` (frontend URL(s), comma-separated)
   - `JWT_SECRET`
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`
   - `SUPER_ADMIN_EMAIL`
   - `SUPER_ADMIN_PASSWORD`
5. Deploy. After first successful deploy, run the seed command once:

```bash
npm run seed:admin
```

Notes:
- In production, this API enables trusted proxy mode. Override with `TRUST_PROXY` if needed.
- Set `BASE_URL` explicitly in your deployment platform.

## API Documentation

After server start, open:

- `http://localhost:5000/docs`

## Seeding

Run all seed files:

```bash
npm run seed
```

Run only super admin seed:

```bash
npm run seed:admin
```

## API Base Routes

- `/` - health check
- `/auth` - auth routes
- `/users` - user management (admin)
- `/transactions` - transaction CRUD + monthly summary
- `/categories` - category listing
- `/upload` - profile picture upload
- `/dashboard` - user/admin dashboard
- `/admin` - admin overview metrics

## Security and Conventions

- Bearer token required for protected routes
- Consistent CRUD style:
  - Create: `Model.create()`
  - Read: `Model.find()`, `Model.findById()`, `Model.findOne()`
  - Update: find -> modify -> save
  - Delete: find -> deleteOne
- Centralized error response format via error middleware

## License

ISC. See `LICENSE`.
