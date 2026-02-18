# Deployment Guide for canI

## Prerequisites
- **Docker & Docker Compose:** Latest version (v2.x+ recommended).
- **Node.js (v20+):** For local development/management.
- **npm (v10+):** For dependency management.
- **Google Gemini API Key:** Required for `ai-service`.

## Infrastructure Setup

1.  **Clone the Repository:**
    ```bash
    git clone <repository-url>
    cd canI2
    ```

2.  **Environment Configuration:**
    Create a `.env` file in `backend/` based on `backend/.env.example`.
    Ensure the following keys are set:
    - `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`
    - `MONGODB_URI`
    - `RABBITMQ_URL`
    - `GEMINI_API_KEY`
    - `JWT_SECRET`

3.  **Launch Infrastructure Containers:**
    ```bash
    docker compose up -d
    ```
    This will start:
    - **PostgreSQL:** Port 5434 (mapped from default 5432 to avoid host conflicts)
    - **MongoDB:** Port 27018
    - **RabbitMQ:** Port 5673 (Management UI at 15673)

## Service Deployment

### Backend Services
All backend services are NestJS microservices.
1. Navigate to each service directory (e.g., `backend/auth-service`).
2. Install dependencies: `npm install`
3. Build the service: `npm run build`
4. Start the service: `npm run start:prod` (or `npm run start:dev` for development).

**Recommended Startup Order:**
1. `api-gateway`
2. `auth-service`
3. `project-service`
4. `orchestrator-service`
5. `ai-service`
6. `execution-service`
7. `reporting-service`

### Frontend Dashboard
1. Navigate to `frontend/`.
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Access the dashboard at `http://localhost:5173`.

## Production Hardening
- **Reverse Proxy:** Use Nginx or Traefik to proxy `http://localhost:3000` (API Gateway) and `http://localhost:5173` (Frontend).
- **Secrets:** Use a secret management service (Vault) rather than `.env` files.
- **SSL:** Ensure all external communication is encrypted via HTTPS/WSS.
