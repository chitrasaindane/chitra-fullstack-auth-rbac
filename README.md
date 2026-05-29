# RBAC System

Full-stack authentication system with JWT and role-based access control.

## Tech Stack

**Server:** Java 17, Spring Boot, Spring Security, JWT, H2 Database

**Client:** React, TypeScript, Vite, TailwindCSS

## Project Structure

```
RBAC/
├── server/          # Spring Boot backend
│   └── src/main/java/com/rbac/
│       ├── config/      # Security config
│       ├── controller/  # REST endpoints
│       ├── dto/         # Request/Response objects
│       ├── entity/      # Database entities
│       ├── repository/  # Data access
│       ├── security/    # JWT handling
│       └── service/     # Business logic
│
└── client/          # React frontend
    └── src/
        ├── api/         # Axios setup
        ├── components/  # ProtectedRoute
        ├── context/     # Auth context
        └── pages/       # Login, Register, Dashboard
```

## How to Run

### Server
```bash
cd server
mvn spring-boot:run
```
Runs on http://localhost:8080

### Client
```bash
cd client
npm install
npm run dev
```
Runs on http://localhost:5173

## API Endpoints

| Endpoint | Method | Access |
|----------|--------|--------|
| /api/auth/register | POST | Public |
| /api/auth/login | POST | Public |
| /api/public/content | GET | Public |
| /api/user/content | GET | USER, ADMIN |
| /api/admin/content | GET | ADMIN only |

## Features

- User registration with role selection
- JWT token authentication
- Role-based access control (USER/ADMIN)
- Protected routes on frontend
- Token stored in localStorage

## Test Credentials

Register a new user or use the API directly:

```json
POST /api/auth/register
{
  "name": "Test User",
  "email": "test@test.com",
  "password": "password123",
  "role": "USER"
}
```

## Links

- Swagger UI: http://localhost:8080/swagger-ui.html
- H2 Console: http://localhost:8080/h2-console (JDBC URL: jdbc:h2:mem:rbacdb)
