# Architecture and Tech Stack Proposals for `canI`

## Architecture Proposals

Both architectures adhere to the requirement of REST APIs and Microservices, ready for mobile clients.

### Option A: Event-Driven Microservices (High Scalability & Decoupling)
*   **Description:** Highly decoupled services communicating primarily through an event bus (e.g., RabbitMQ or Kafka) for asynchronous tasks (scanning, AI processing), with an API Gateway for synchronous client interactions.
*   **Key Components:**
    *   **API Gateway:** Single entry point, handles auth (JWT), routing, and rate limiting.
    *   **Auth Service:** Manages users, roles, and credential sets for testing.
    *   **Session/Orchestrator Service:** Manages the test lifecycle, state machine for test cases, and approval workflows.
    *   **Ingestion Service:** Handles upload/parsing of docs (PDF, Text, etc.).
    *   **AI Processor Service:** Wraps the Gemini CLI interactions to analyze docs and re-evaluate test cases.
    *   **Scanner/Browser Service:** Headless browser fleet for navigating the target app and executing tests.
    *   **Reporting Service:** Aggregates logs and generates final reports.
*   **Pros:** Highly scalable, individual services can be scaled (e.g., more scanners), resilient.
*   **Cons:** Higher operational complexity, distributed tracing required.

### Option B: Domain-Centric Microservices (Simplified Ops)
*   **Description:** Services grouped by business domain. Slightly coarser granularity to reduce network chatter, focusing on the core "phases" of the pentest.
*   **Key Components:**
    *   **Gateway & Auth:** Combined entry and identity management.
    *   **Core Controller:** Handles Project management, Test Data management, and Operator approvals.
    *   **Intelligence Service:** Dedicated to all AI/Gemini processing (Input analysis + Re-evaluation).
    *   **Execution Engine:** Handles the browsing, crawling, and attack simulation.
*   **Pros:** Easier to develop and deploy initially, clear separation of "Thinking" (AI) vs "Doing" (Execution).
*   **Cons:** Less granular scaling than Option A.

---

## Technology Stack Proposals

### Stack 1: The "JavaScript/TypeScript Ecosystem" (Uniformity)
*   **Frontend:** **React** (with Vite) + **Material UI** or **Tailwind CSS**.
*   **Backend:** **Node.js** with **NestJS**. NestJS provides a strong module structure, great for microservices, and native support for REST and OpenAPI.
*   **Database:** **PostgreSQL** (Relational data for Users/Projects) + **MongoDB** (Unstructured data for logs/AI context).
*   **Message Broker:** **RabbitMQ** or **Redis** (BullMQ).
*   **Browser Automation:** **Playwright** (Excellent modern web automation).

### Stack 2: The "Performance & Safety" Mix
*   **Frontend:** **React** or **Vue.js**.
*   **Backend:** **Python (FastAPI)** for the AI/Data heavy services (great ecosystem for parsing/AI) + **Go (Golang)** for the Execution Engine (high concurrency for scanning).
*   **Database:** **PostgreSQL** (Primary).
*   **Message Broker:** **Kafka** or **NATS**.
*   **Browser Automation:** **Playwright (Python or Go bindings)**.

---

## Questions
1. Does the tool literally need to spawn a shell process to call `gemini` (the CLI tool) for its AI operations, or should it use the Gemini API (Google AI SDK) directly? (Using the SDK is generally more robust for software, but I will stick to your specific instruction if intended).
