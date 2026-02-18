# Administration Guide for canI

## Database Management

### PostgreSQL (Auth & Project Databases)
- **Port:** 5434
- **Databases:** `cani_auth`, `cani_projects`
- **Tables:** `users`, `projects`, `test_cases`, `target_credentials`
- **Backup:** Use `pg_dump` from within the Docker container.
  ```bash
  docker exec -t cani2-postgres-1 pg_dumpall -c -U <db_user> > dump.sql
  ```

### MongoDB (AI Context & Logs)
- **Port:** 27018
- **Database:** `canI`
- **Collections:** `executionlogs`, `ai_context`
- **Maintenance:** Index management should be reviewed as the dataset grows.

## Service Monitoring

### Health Checks
Monitor the following internal service ports to ensure all microservices are running:
- `api-gateway`: 3000
- `auth-service`: 3001
- `project-service`: 3002
- `reporting-service`: 3003

### RabbitMQ Management
- **UI:** `http://localhost:15673` (mapped from 15672)
- **Queues:**
  - `orchestrator_queue`: General coordination messages.
  - `ai_queue`: Project metadata for test case generation.
  - `execution_queue`: Test cases for Playwright execution.

## User Management
- **Registration:** Users must register via the `auth-service` (accessible via `api-gateway/auth/register`).
- **Passwords:** Are salted and hashed using Bcrypt.
- **JWT Tokens:** Issued upon login; ensure `JWT_SECRET` is rotated periodically.

## Logs
- **Internal Logs:** Accessible via `docker logs <container_name>`.
- **Execution Logs:** Stored in MongoDB and accessible via the `Reporting Service` or the `Execution Monitor` UI.
