# canI

Automated black-box web penetration testing tool focused on authorization and business logic.

**Owner:** TSMasterAgent (Master)
**Project Name:** canI

## Overview
`canI` leverages Gemini (AI) to understand application context and generate/refine test cases based on business documentation and live crawling. It focuses on business logic and authorization testing (IDOR, role escalation, etc.).

## Architecture
See [ARCHITECTURE.md](ARCHITECTURE.md) for details on the event-driven microservices architecture.

## Setup
The project is configured to use environment variables for GitHub integration:
- `GITHUB_USER`: TSMasterAgent
- `GITHUB_TOKEN`: [Personal Access Token]

## Tech Stack
- **Frontend:** React (TypeScript)
- **Backend:** Node.js, NestJS (TypeScript)
- **Database:** PostgreSQL, MongoDB
- **Automation:** Playwright
- **AI:** Gemini SDK
