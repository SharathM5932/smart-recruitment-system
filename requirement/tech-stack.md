# Tech Stack Requirement Plan

## Frontend

- HTML5
- CSS3 / Tailwind CSS / SCSS
- React.js (with TypeScript)
- State Management: Redux Toolkit
- API Communication: Axios or React Query
  - Interceptors for auth token, global error handling

## Backend

- NestJS (Node.js Framework)
  - Modular Monolithic Architecture
  - RESTful APIs
  - DTOs and Validation Pipes
  - Role-Based Access Control (RBAC)

## Database

- AWS RDS – PostgreSQL
  - TypeORM or Prisma as ORM

## Authentication & Authorization

- JWT-based Authentication
  - Access + Refresh Token Strategy
  - Route Guards with Role Checking
- Secure Headers
- CORS Management

## Documentation

- **API Docs**: Swagger (NestJS)
- **API Testing**: Postman

## Code Quality

- ESLint + Prettier

## DevOps / Deployment

- Environment management via `.env` or Secrets Manager

## Optional Tools

- AWS S3 (for file uploads)

## Application Architecture

### Layered Design

```text
Frontend (React + Redux)
        |
API Calls (Axios / React Query)
        |
Backend (NestJS)
    ├── Controllers
    ├── Services
    ├── Repositories (TypeORM / Prisma)
    └── Guards / Interceptors / Pipes
        |
Database (PostgreSQL via AWS RDS)
```
