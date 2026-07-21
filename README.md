# Job Tracker

A full-stack job application tracker with JWT authentication, ownership-based
authorization, and a polished React dashboard — built and deployed end-to-end.

**Live demo:** https://job-tracker-pink-alpha.vercel.app

## Features

- **Auth** — register/login with JWT, passwords hashed with BCrypt
- **Ownership-based authorization** — every application record is scoped to
  its owner; users can only view, edit, or delete their own data (see
  [Security](#security) below)
- **Application tracking** — create, edit, delete, and filter applications by
  status (Applied / Interviewing / Offer / Rejected)
- **Dashboard statistics** — live counts by status
- **Search** — filter by company or role
- **Polished UX** — toast notifications, delete confirmation, empty states,
  responsive navbar with profile dropdown
- **Client-side validation** — email format, password strength, confirm-password
  match, with specific (not generic) error messages from the API

## Tech stack

**Backend:** Java 17, Spring Boot 3.3.2, Spring Security, Spring Data JPA,
PostgreSQL, JWT (jjwt), Maven, Docker

**Frontend:** React (Vite), React Router, Axios, Tailwind CSS, react-hot-toast

**Testing:** JUnit 5, MockMvc, H2 

**Deployment:** Backend on Render (Docker container), database on Render
(PostgreSQL), frontend on Vercel

## Security

The core of this project is a real, deliberately-introduced-then-fixed IDOR
(Insecure Direct Object Reference) vulnerability:

- Every `GET`, `PUT`, and `DELETE` on `/api/applications/{id}` is scoped by
  both `id` **and** the authenticated user (`findByIdAndUser`), not `id` alone
- Accessing another user's application returns `404`, not `403` — so a bad
  actor can't tell the difference between "doesn't exist" and "not yours"
- Verified manually across all ownership scenarios (owner, non-owner,
  unauthenticated, non-existent ID) and covered by an automated integration
  test suite (`ApplicationControllerIntegrationTest`) that runs against an
  isolated H2 database, not production data

## Architecture

```
┌─────────────┐        HTTPS         ┌──────────────────┐        JDBC        ┌──────────────┐
│   React     │ ───────────────────► │   Spring Boot     │ ─────────────────► │  PostgreSQL  │
│  (Vercel)   │ ◄─────────────────── │   (Render/Docker)  │ ◄───────────────── │   (Render)   │
└─────────────┘      JSON + JWT      └──────────────────┘                     └──────────────┘
```

- Frontend calls the backend with a JWT bearer token attached after login
- `JwtFilter` validates the token on every request before it reaches a controller
- Spring Security enforces role-based access (`USER` / `ADMIN`) and CORS
- Ownership checks happen at the repository query level, not just in the controller

## Running it locally

### 1. Database
```bash
createdb job_tracker
```
Default connection assumes `postgres` / your local password on `localhost:5432` —
adjust in `backend/src/main/resources/application.properties` if needed.

### 2. Backend
```bash
cd backend
mvn spring-boot:run
```
Runs on `http://localhost:8080`. Tables auto-create from entities on first run.

### 3. Frontend
```bash
cd frontend
npm install
npm run dev
```
Runs on `http://localhost:5173`.

### Environment variables

Backend (`application.properties` reads these, with local fallbacks):
```
DATABASE_URL, DB_USERNAME, DB_PASSWORD, JWT_SECRET, JWT_EXPIRATION
```

Frontend (`.env`):
```
VITE_API_URL=http://localhost:8080
```

## Running the tests

```bash
cd backend
mvn test
```
Integration tests spin up the full Spring context against an isolated H2
database (see `application-test.properties`) — no risk to real data.

## Project structure

```
backend/
  src/main/java/com/jobtracker/
    model/         → JPA entities (User, Application)
    repository/     → Spring Data JPA repositories, ownership-scoped queries
    dto/           → request/response DTOs (entities never exposed directly)
    service/       → business logic, ownership enforcement
    controller/    → REST endpoints
    security/      → JWT filter, Spring Security config, CORS
    exception/     → global error handling
  src/test/java/    → integration tests
  Dockerfile
frontend/
  src/
    api/           → all backend calls
    auth/          → login/register service calls
    pages/         → Dashboard, Login, Register, application forms
    components/    → Navbar, StatusBadge, StatCard
```

## Deployment

- **Backend:** Dockerized Spring Boot app on Render, built via a multi-stage
  Dockerfile (Maven build → lightweight JRE runtime image)
- **Database:** managed PostgreSQL on Render
- **Frontend:** Vite build deployed on Vercel, with SPA rewrites configured
  for client-side routing
- Secrets (DB credentials, JWT secret) are injected via environment
  variables on each platform — never committed to the repo