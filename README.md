# Job Application Tracker — Starter

This is a deliberately minimal, working full-stack app: React frontend + Spring Boot
backend + PostgreSQL. It covers CRUD only — Weeks 1-3 of the study plan. Everything
after that (interviews, auth, filtering, deployment) you add into THIS project as you
learn it. Don't start a new repo.

## What's already here
- Backend: Spring Boot REST API for `Application` (CRUD), DTOs, global exception handling
- Frontend: React (Vite) with a dashboard, add/edit form, status filter, status badges
- Tailwind CSS wired up with a small custom palette (see `tailwind.config.js`)

## What's NOT here yet (add these as you learn them — see the study plan)
- `interviews` table/entity (Week 4)
- Flyway/Liquibase migrations (Week 4) — right now Hibernate auto-creates tables, which is fine for local dev only
- Auth / JWT / login / protected routes (Week 5)
- Deadline reminders / kanban board (Week 6)
- Docker + deployment config (Week 7)
- Tests (Week 6/8)

## Running it locally

### 1. Database
Create a local Postgres database:
```bash
createdb job_tracker
```
Default connection in `backend/src/main/resources/application.properties` assumes
user `postgres` / password `postgres` on `localhost:5432`. Adjust if yours differs.

### 2. Backend
```bash
cd backend
./mvnw spring-boot:run
```
Runs on `http://localhost:8080`. Tables are auto-created from the entities on first run.

### 3. Frontend
```bash
cd frontend
npm install
npm run dev
```
Runs on `http://localhost:5173`.

Open that URL — you should see an empty dashboard with an "Add Application" button.

## Project structure
```
backend/
  src/main/java/com/jobtracker/
    model/         → JPA entities
    repository/     → Spring Data JPA repositories
    dto/           → Request/response DTOs (never expose entities directly)
    service/       → business logic
    controller/    → REST endpoints
    exception/     → global error handling
frontend/
  src/
    api/           → all backend calls go through here
    pages/         → Dashboard, ApplicationForm
    components/    → StatusBadge, and anything you add later
```

## How to extend it (matches the 8-week plan)

**Week 4 — Interviews + migrations**
Add an `Interview` entity related to `Application` (`@ManyToOne`), a repository,
service methods, and endpoints under `/api/applications/{id}/interviews`. Add Flyway
and write your first migration instead of relying on `ddl-auto=update`.

**Week 5 — Auth**
Add a `User` entity, Spring Security config, JWT filter, `/api/auth/register` and
`/api/auth/login`. Relate `Application` to `User` so each user only sees their own
rows. On the frontend: login/register pages, store the token, add a route guard.

**Week 6 — Non-trivial feature**
Pick one: kanban-style drag-and-drop status board, deadline reminders (flag stale
applications), or combined search+filter. Don't do all three.

**Week 7 — Deploy**
Dockerize the backend. Deploy frontend to Vercel/Netlify, backend + Postgres to
Render/Railway. Update the frontend's `BASE_URL` in `src/api/applications.js` to
point at the deployed backend.

Keep adding to this same repo. When every box in the "Definition of done" list from
the build spec is checked, it's finished — move on to interview prep, not to a new project.
