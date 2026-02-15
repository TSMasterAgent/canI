# canI - System Architecture & Design (Architecture A, Stack 1)

## 1. Introduction
`canI` is an automated black-box web penetration testing tool focused on authorization and business logic. It leverages Gemini (AI) to understand application context and generate/refine test cases based on business documentation and live crawling.

## 2. Architecture Overview (Event-Driven Microservices)

The system is composed of several microservices communicating via a central Message Broker (RabbitMQ) for asynchronous workflows and REST APIs for synchronous interactions.

### 2.1 Microservices
*   **API Gateway (NestJS):** The entry point for all clients (Web & future Mobile). Handles JWT-based authentication, routing, and rate limiting.
*   **Auth Service (NestJS):** Manages user accounts for the `canI` tool and stores/manages the "target application" credential sets (2 sets per role).
*   **Project Service (NestJS):** Manages project metadata, business logic descriptions (User manuals, stories, etc.), and URLs.
*   **AI Intelligence Service (Node.js/Gemini SDK):** 
    *   Processes business logic input.
    *   Generates the initial test case list.
    *   Re-evaluates test cases based on execution data.
    *   Handles operator Q&A via Gemini.
*   **Orchestrator Service (NestJS):** The "Brain" of the test lifecycle. Manages the state machine (Input -> Analysis -> Approval -> Execution -> Report).
*   **Execution Engine (Node.js/Playwright):** Consumes test cases from the queue, executes them using multiple credential sets via headless browsers, and logs every action.
*   **Reporting & Logging Service (Node.js):** Aggregates logs, creates the `cli.output` equivalent for the system, and generates final reports.

### 2.2 Technology Stack (Stack 1)
*   **Frontend:** React (TypeScript), Vite, Tailwind CSS, Material UI components.
*   **Backend:** Node.js, NestJS (TypeScript).
*   **Communication:** REST (Internal/External), RabbitMQ (Async tasks).
*   **Database:** 
    *   **PostgreSQL:** Structured data (Projects, Users, Test Cases, Results).
    *   **MongoDB:** Unstructured logs, Gemini interaction history, and crawling artifacts.
*   **Automation:** Playwright.

## 3. Security Testing Standards Alignment
`canI` is designed to map its findings and test cases to:
*   **OWASP ASVS (Application Security Verification Standard):** Specifically focusing on V4 (Authentication), V5 (Session Management), and V13 (API/Web Service).
*   **OWASP Testing Guide (WSTG):** Focus on Business Logic Testing (WSTG-BUSL) and Authorization Testing (WSTG-ATHZ).

## 4. Operational Workflow
1.  **Ingestion:** User uploads docs + URL + Credentials.
2.  **Analysis:** AI Intelligence Service uses Gemini SDK to build a "Logic Map".
3.  **Refinement:** AI asks operator clarifying questions.
4.  **Planning:** AI generates a list of Test Cases (e.g., "Role A tries to access Role B's data via IDOR").
5.  **Approval:** Operator approves/rejects cases via the Frontend.
6.  **Execution:** Execution Engine runs tests, swapping credentials to verify authorization boundaries.
7.  **Reporting:** Results are consolidated into a report and a full log file.

## 5. Mobile Readiness
The backend is strictly RESTful and agnostic to the client. All business logic resides in the microservices. The JWT authentication and JSON responses ensure 100% compatibility with future React Native or Flutter apps.
