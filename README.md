# canI

Automated, event-driven microservices web penetration testing tool focusing on authorization and business logic vulnerabilities.

## Core Features
- **AI-Driven Test Case Generation:** Uses Google Gemini to analyze project metadata and suggest security test cases.
- **Automated Browser Testing:** Integrated with Playwright for executing complex, multi-step browser interactions.
- **Event-Driven Architecture:** Decoupled microservices using RabbitMQ for scalability and resilience.
- **Real-Time Monitoring:** Live execution logs and security reports.

## Documentation
- [Deployment Guide](DEPLOYMENT.md)
- [Administration Guide](ADMINISTRATION.md)
- [Usage Guide](USAGE.md)
- [Architecture & Design](ARCHITECTURE.md)
- [API Specification](API_SPEC.md)

## Tech Stack
- **Backend:** NestJS, TypeORM (PostgreSQL), Mongoose (MongoDB).
- **Frontend:** React, Material UI (MUI), Tailwind CSS.
- **Messaging:** RabbitMQ (AMQP).
- **Security Logic:** Google Gemini AI, Playwright.

## License
MIT
