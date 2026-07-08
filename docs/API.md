# API

CleanOps API exposes a small REST surface for cleaning service operations.

## Health

- `GET /health` returns service status.

## Clients

- `GET /clients` lists clients.
- `POST /clients` creates a client with validated request data.

## Workers

- `GET /workers` lists workers.
- `POST /workers` creates a worker with validated request data.

## Jobs

- `GET /jobs` lists cleaning jobs.
- `POST /jobs` creates a job linked to a client.
- `PATCH /jobs/:id/assign` assigns a worker to a job.
- `PATCH /jobs/:id/status` updates job status.
- `PATCH /jobs/:id/payment` updates payment status.

## Design Notes

The API is intentionally framework-light. It uses Node's built-in HTTP module so the routing, validation, and workflow decisions stay easy to inspect.
