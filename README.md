# CleanOps API

![Status](https://img.shields.io/badge/status-MVP%20complete-brightgreen)
![CI](https://github.com/Sifiso-xx/cleanops-api/actions/workflows/ci.yml/badge.svg)
![Tests](https://img.shields.io/badge/tests-passing-brightgreen)
![Node.js](https://img.shields.io/badge/node.js-18%2B-339933)
![Focus](https://img.shields.io/badge/focus-backend%20workflow-blue)

CleanOps API is a lightweight backend service for managing cleaning business operations. It models the kind of workflow a real cleaning company needs: client requests, worker assignment, job status, and payment tracking.

## Graduate Programme Fit

This project is designed to show backend fundamentals beyond coursework: REST endpoints, request validation, workflow rules, modular JavaScript, and automated tests. It is intentionally small enough to review quickly while still modelling a real business process.

## How To Review This Project

1. Run `npm test` to verify validation and workflow behaviour.
2. Read `src/server.js` for the HTTP routing layer.
3. Read `src/validation.js` and `src/store.js` for the core backend logic.
4. Review `docs/API.md` and `docs/TESTING.md` for endpoint and test notes.

## Status

MVP complete. The project is intentionally framework-light so the backend fundamentals are easy to inspect.

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

Current local result: `4` passing tests covering client, worker, and job validation plus job/payment status values.

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
