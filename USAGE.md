# Usage Guide for canI

## Getting Started

1.  **Login:**
    - Navigate to `http://localhost:5173`.
    - Login with your email and password (ensure your account has been created via `auth-service`).

2.  **Creating a Project:**
    - On the Dashboard, locate the "Create New Project" section.
    - Enter a **Project Name** and a **Target URL** (e.g., `https://myapp.com/login`).
    - Click **Create Project**.
    - *Under the hood:* This triggers a `project_created` event, which the Orchestrator picks up.

## Analysis & Test Case Review

1.  **AI Analysis:**
    - Once a project is created, the **AI Intelligence Service** will automatically generate security test cases based on the target metadata.
    - These test cases will appear in the **Test Case Review** section after a few moments.

2.  **Approving Test Cases:**
    - Review each suggested test case.
    - Click **Approve** for cases you want to execute.
    - Click **Reject** for cases that are irrelevant or incorrect.

## Test Execution

1.  **Running Tests:**
    - After approving at least one test case, the **Execute Approved Tests** button will become active.
    - Click **Execute**.
    - *Under the hood:* This sends an `execute_tests` event to the **Execution Engine**.

2.  **Monitoring Execution:**
    - Use the **Execution Monitor** section to view live logs from the Playwright runner.
    - Logs are displayed in a terminal-like interface and stored in MongoDB.

## Reporting

1.  **View Reports:**
    - The **Reporting Service** (accessible via `api-gateway/reporting`) aggregates logs for each project.
    - Reports can be viewed through the dashboard to see vulnerability summaries and execution status.
