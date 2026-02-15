# API Specification (High-Level)

## 1. Auth & User Management
*   `POST /auth/login` - Returns JWT.
*   `POST /auth/register` - Create new operator.

## 2. Project Management
*   `GET /projects` - List all projects.
*   `POST /projects` - Create new project.
*   `GET /projects/:id` - Get project details and status.
*   `POST /projects/:id/documents` - Upload business logic docs.
*   `POST /projects/:id/credentials` - Add/Update target app credentials.

## 3. Analysis & AI
*   `POST /projects/:id/analyze` - Trigger Gemini analysis of docs.
*   `GET /projects/:id/questions` - Retrieve questions from AI.
*   `POST /projects/:id/answers` - Provide operator input to AI questions.
*   `GET /projects/:id/test-cases` - List suggested test cases.

## 4. Execution & Control
*   `PATCH /test-cases/:id/status` - Approve or Reject a test case.
*   `POST /projects/:id/execute` - Start execution of approved tests.
*   `GET /projects/:id/logs` - Stream/Fetch execution logs.
*   `GET /projects/:id/report` - Generate and download final report.

## 5. System Logs
*   `GET /system/cli-output` - Download the `cli.output` file for a project.
