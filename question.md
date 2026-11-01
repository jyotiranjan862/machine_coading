# Node.js and Express Machine-Coding Practice

This set contains **40 machine-coding rounds** designed for interviews at MNCs and
product-based companies. Each round should be implemented as a working API, not
just as a design document.

## Recommended baseline

- Node.js with JavaScript or TypeScript
- Express.js
- PostgreSQL or MongoDB where persistence is required
- Redis for caching, queues, and distributed coordination
- Jest or Vitest, Supertest, ESLint, and Docker
- Use environment variables for configuration and never commit secrets

## Expectations for every round

1. Define the API contract, request validation, status codes, and error format.
2. Separate routes, controllers, services, repositories, and middleware where
   the complexity justifies it.
3. Handle malformed input, missing resources, duplicate requests, and failures.
4. Add unit tests for business rules and integration tests for important APIs.
5. Include a README with setup steps, sample requests, assumptions, and trade-offs.
6. Add logging, graceful shutdown, pagination limits, and basic security
   protections such as Helmet, CORS configuration, and rate limiting.

---

## Round 1: Task Management API

Build a CRUD task manager with users, tasks, priorities, statuses, due dates,
filters, sorting, and pagination.

**Focus:** Express routing, validation, REST conventions, database modeling,
centralized error handling, and query parameters.

## Round 2: URL Shortener

Create a service that converts long URLs into short links and redirects users.
Support custom aliases, expiration dates, collision handling, and click counts.

**Focus:** ID generation, redirects, uniqueness, indexes, and abuse prevention.

## Round 3: Expense Tracker

Build APIs for income and expenses with categories, date-range reports, monthly
summaries, and per-user access control.

**Focus:** aggregation queries, authorization, validation, and consistent money
handling using integer minor units.

## Round 4: Blog and Comment Platform

Implement posts, drafts, publishing, tags, comments, moderation, search, and
author permissions.

**Focus:** relational modeling, nested resources, full-text search, and
moderation workflows.

## Round 5: File Upload Service

Create an API for uploading, listing, downloading, and deleting files. Add
size/type validation, ownership checks, checksum-based duplicate detection, and
streaming downloads.

**Focus:** multipart handling, streams, safe filenames, storage abstraction, and
large-file behavior.

## Round 6: Authentication Service

Implement registration, login, password hashing, refresh tokens, logout,
password reset, email verification, and account lockout after repeated failures.

**Focus:** secure sessions/tokens, token rotation, hashing, expiration, and
authentication middleware.

## Round 7: Role-Based Access Control API

Build an admin panel backend with users, roles, permissions, role assignment,
and protected routes. Support both role-based and resource-level checks.

**Focus:** authorization versus authentication, policy middleware, and audit
logging.

## Round 8: Product Catalog

Create APIs for products, categories, brands, variants, images, inventory
quantities, filters, sorting, and cursor-based pagination.

**Focus:** search/filter design, database indexes, stable pagination, and API
response consistency.

## Round 9: Shopping Cart

Implement guest and authenticated carts, add/update/remove item operations,
quantity limits, cart merging after login, and cart expiration.

**Focus:** concurrency, idempotent operations, inventory checks, and transaction
boundaries.

## Round 10: Order Management

Build order creation from a cart, order history, status transitions,
cancellation, returns, and an admin order dashboard.

**Focus:** state machines, immutable order snapshots, authorization, and
transactional consistency.

## Round 11: Inventory Reservation System

Reserve stock for a limited time during checkout. Release expired reservations
and prevent overselling when multiple requests arrive concurrently.

**Focus:** database locking, atomic updates, TTL processing, retries, and race
conditions.

## Round 12: Payment and Webhook Handler

Create a mock payment integration with payment intents, success/failure states,
retries, signed webhooks, duplicate-event protection, and reconciliation.

**Focus:** idempotency keys, webhook security, eventual consistency, and audit
records.

## Round 13: Notification Service

Build a service that sends email, SMS, and in-app notifications from a common
API. Add templates, user preferences, retries, and delivery status.

**Focus:** provider abstraction, queues, retry policy, dead-letter handling, and
preference enforcement.

## Round 14: API Rate Limiter

Implement per-IP, per-user, and per-route rate limits with configurable windows.
Return useful rate-limit headers and support a Redis-backed distributed mode.

**Focus:** fixed window, sliding window or token bucket algorithms, atomic Redis
operations, and proxy-aware client identity.

## Round 15: API Key Management

Create APIs to issue, rotate, revoke, and scope API keys. Store only hashes,
show the secret once, and record usage metadata.

**Focus:** secret handling, scopes, key rotation, authentication middleware, and
usage auditing.

## Round 16: Search Autocomplete

Build an autocomplete API for products or users with prefix search, ranking,
popular suggestions, typo tolerance, and a cache.

**Focus:** latency, normalization, cache invalidation, result limits, and
search-index trade-offs.

## Round 17: Appointment Booking

Implement providers, availability schedules, time zones, appointment booking,
rescheduling, cancellation, and prevention of overlapping bookings.

**Focus:** time handling, overlap queries, concurrency, and business-rule
validation.

## Round 18: Event Ticket Booking

Create an event and seat-booking system with temporary seat holds, payment
timeout, confirmation, cancellation, and a waiting list.

**Focus:** high-contention resources, expiration workers, idempotency, and
transactional seat allocation.

## Round 19: Subscription Billing

Build plans, subscriptions, trials, upgrades, downgrades, cancellation,
invoices, and failed-payment handling.

**Focus:** recurring state transitions, proration assumptions, billing history,
and webhook-driven updates.

## Round 20: Multi-Tenant SaaS Backend

Implement organizations, memberships, invitations, tenant isolation, quotas,
and per-tenant settings.

**Focus:** tenant-aware data access, invitation security, authorization, and
avoiding cross-tenant data leaks.

## Round 21: Real-Time Chat Service

Build one-to-one and group chat with WebSockets, message persistence, typing
indicators, read receipts, online presence, and reconnect support.

**Focus:** Socket.IO or `ws`, connection authentication, ordering, fan-out, and
offline synchronization.

## Round 22: Notification Feed

Create a user notification inbox with unread counts, read-all, pagination,
deduplication, and notification preferences.

**Focus:** efficient unread counters, cursor pagination, fan-out strategies,
and eventual consistency.

## Round 23: Collaborative Notes

Build shared notes with collaborators, permissions, version history, optimistic
updates, and conflict-safe saves.

**Focus:** optimistic concurrency, revision numbers, authorization, and
conflict resolution.

## Round 24: Job Queue Dashboard

Implement APIs to submit background jobs, inspect status, retry failures,
cancel pending jobs, and view worker metrics.

**Focus:** BullMQ or a custom Redis queue, worker isolation, retries,
backoff, idempotency, and dead-letter queues.

## Round 25: Image Processing Pipeline

Accept an image, queue thumbnail/resizing jobs, store processing status, and
serve multiple sizes. Handle failed jobs and repeated uploads.

**Focus:** asynchronous workflows, streaming, object-storage abstraction,
checksums, and resource limits.

## Round 26: CSV Import and Export

Create a large CSV import API with progress tracking, row-level validation,
error reports, cancellation, and streamed exports.

**Focus:** Node.js streams, backpressure, background jobs, memory safety, and
partial-failure reporting.

## Round 27: Audit Log Platform

Record who performed what action, on which resource, when, and from which
request context. Provide immutable, filterable admin reports.

**Focus:** structured logging, append-only records, sensitive-field redaction,
pagination, and tamper resistance.

## Round 28: Feature Flag Service

Build flags with environments, targeting rules, percentage rollouts, user or
organization overrides, scheduled activation, and evaluation history.

**Focus:** deterministic bucketing, rule evaluation, caching, safe defaults,
and configuration versioning.

## Round 29: Webhook Delivery Platform

Allow clients to register endpoints and receive signed event deliveries.
Implement retries, exponential backoff, delivery logs, replay, and endpoint
disablement.

**Focus:** HMAC signatures, idempotency, queue workers, timeout handling, and
observability.

## Round 30: Distributed Lock Service

Expose an internal API for acquiring, renewing, and releasing named locks with
lease expiration and safe ownership checks.

**Focus:** Redis `SET NX`, lease tokens, failure scenarios, clock assumptions,
and avoiding unsafe lock release.

## Round 31: API Gateway

Build a small gateway that routes requests to mock services, validates tokens,
applies rate limits, adds correlation IDs, and aggregates selected responses.

**Focus:** proxying, timeouts, retries, circuit breakers, request tracing, and
failure isolation.

## Round 32: GraphQL Backend with Express

Create a GraphQL API for users, products, and orders with authentication,
authorization, pagination, batching, and query complexity limits.

**Focus:** schema design, resolver composition, DataLoader, N+1 prevention,
and abuse protection.

## Round 33: Social Feed

Implement follow/unfollow, post creation, likes, comments, and a paginated home
feed. Support a reasonable strategy for high-follower accounts.

**Focus:** fan-out-on-write versus fan-out-on-read, ranking, caching, and
pagination consistency.

## Round 34: Recommendation API

Build an API that returns personalized product or article recommendations from
user events and configurable ranking rules.

**Focus:** event collection, fallback recommendations, cache strategy, feature
versioning, and measurable response latency.

## Round 35: Ride or Delivery Dispatch

Create APIs for driver availability, location updates, trip requests, matching,
acceptance, cancellation, and trip status.

**Focus:** geospatial queries, real-time updates, state transitions, and
duplicate-request handling.

## Round 36: Distributed Counter and Leaderboard

Implement event counters and a top-N leaderboard with increments, time ranges,
ties, pagination, and reset support.

**Focus:** Redis sorted sets, atomicity, hot keys, ranking semantics, and
retention.

## Round 37: Observability and Health Platform

Add health, readiness, liveness, metrics, request correlation, structured
logging, and graceful shutdown to a service. Expose dependency health without
leaking secrets.

**Focus:** production diagnostics, probes, timeouts, error rates, and graceful
degradation.

## Round 38: Resilient Third-Party Integration

Integrate with a mock external service that is slow, unreliable, and
rate-limited. Add timeouts, retries, circuit breaking, caching, and fallback
responses where valid.

**Focus:** resilience patterns, retry storms, error classification, and
explicitly communicating degraded results.

## Round 39: Secure Document Sharing

Build expiring share links for private documents with password protection,
download limits, revocation, access logs, and permission checks.

**Focus:** unguessable tokens, secure comparison, authorization, expiration,
abuse prevention, and safe file serving.

## Round 40: Mini E-Commerce Platform

Combine authentication, catalog, cart, inventory, checkout, payment webhooks,
orders, notifications, admin APIs, and observability into one production-style
application.

**Focus:** architecture, module boundaries, transactions, asynchronous
processing, security, testing strategy, deployment, and trade-off discussion.

---

## Interview scoring checklist

Score each round from 1 to 5 in these areas:

- Correctness and edge-case handling
- API design and validation
- Code structure and maintainability
- Data modeling and consistency
- Security and authorization
- Error handling and observability
- Test coverage and test quality
- Performance and scalability
- Documentation and setup experience

For a realistic interview simulation, select one round, spend 90 to 120 minutes
on the core implementation, and reserve the final 15 minutes for tests,
trade-offs, and a short system-design explanation.