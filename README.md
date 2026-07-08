# CleanOps API

CleanOps API is a lightweight backend service for managing cleaning business operations. It models the kind of workflow a real cleaning company needs: client requests, worker assignment, job status, and payment tracking.

## Graduate Programme Fit

This project is designed to show backend fundamentals beyond coursework: REST endpoints, request validation, workflow rules, modular JavaScript, and automated tests. It is intentionally small enough to review quickly while still modelling a real business process.

## Why This Project Matters

Many small service businesses coordinate work through WhatsApp messages, spreadsheets, and memory. This API shows how those informal processes can become structured software.

## Features

- Create and list clients
- Create and list workers
- Create jobs linked to clients
- Assign workers to jobs
- Update job status
- Update payment status
- Validate request data
- Run automated tests with Node's built-in test runner

## Tech

- Node.js
- Built-in HTTP module
- JavaScript modules
- In-memory data store
- Node test runner

## Run Locally

```bash
npm start
```

The API runs on `http://localhost:3001`.

## Run Tests

```bash
npm test
```

## Example Endpoints

```http
GET /health
GET /clients
POST /clients
GET /workers
POST /workers
GET /jobs
POST /jobs
PATCH /jobs/:id/assign
PATCH /jobs/:id/status
PATCH /jobs/:id/payment
```

## Portfolio Talking Point

This project demonstrates backend development, REST API design, validation, workflow modelling, and clean modular JavaScript without relying on heavy frameworks. The most important learning was turning informal real-world steps into predictable API behaviour that can be tested.
