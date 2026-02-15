# Database Schema Design (High Level)

## PostgreSQL (Relational)

### Table: Users
*   id (UUID)
*   email (String, Unique)
*   password_hash (String)
*   role (Enum: ADMIN, OPERATOR)

### Table: Projects
*   id (UUID)
*   owner_id (FK -> Users.id)
*   name (String)
*   target_url (String)
*   status (Enum: DRAFT, ANALYZING, PENDING_APPROVAL, EXECUTING, COMPLETED)

### Table: TargetCredentials
*   id (UUID)
*   project_id (FK -> Projects.id)
*   role_name (String)
*   credential_set (JSON: {username, password, extra_data})
*   set_index (Int: 1 or 2)

### Table: TestCases
*   id (UUID)
*   project_id (FK -> Projects.id)
*   title (String)
*   description (Text)
*   category (Enum: AUTHZ, BUSL, IDOR, etc.)
*   status (Enum: SUGGESTED, APPROVED, REJECTED, PASSED, FAILED)
*   owasp_mapping (String: e.g., "ASVS V4.1")

## MongoDB (Document-Based)

### Collection: IngestedDocuments
*   project_id (UUID)
*   filename (String)
*   content (Text)
*   type (Enum: MANUAL, USER_STORY, TRANSCRIPT, etc.)

### Collection: ExecutionLogs
*   test_case_id (UUID)
*   timestamp (DateTime)
*   step (String)
*   request_data (JSON)
*   response_data (JSON)
*   screenshot_path (String)
*   log_level (Enum: INFO, ERROR)

### Collection: GeminiInteractions
*   project_id (UUID)
*   prompt (Text)
*   response (Text)
*   context_type (Enum: ANALYSIS, REEVALUATION, Q&A)
