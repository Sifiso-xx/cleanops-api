# Testing

## What The Tests Prove

- Request validation rejects incomplete client, worker, and job payloads.
- Job assignment requires valid existing records.
- Job status and payment state updates follow the supported workflow.
- The API logic can be checked with Node's built-in test runner.

## How To Run

```bash
npm test
```

## Why This Matters

The project models a real operations workflow, so the tests focus on predictable state changes rather than only checking that endpoints exist.

## Next Test Improvements

- Add HTTP-level integration tests for each endpoint.
- Add persistence tests when the in-memory store is replaced with a database.
- Add edge cases for double assignment, cancelled jobs, and partial payments.
