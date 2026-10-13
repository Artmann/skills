---
name: plan-implementation
description:
  Create an implementation plan for a new feature, view, or flow before writing
  any code. Works UI-first - user flows, views, states, and mutations - then
  derives the data model from the UI, maps out the services and endpoints that
  connect them, and finishes with a review of failure modes, validation, rate
  limiting, and queueing, plus an ordered build checklist. Writes the plan to
  docs/plans/<feature>.md. Use this skill whenever the user wants to plan,
  scope, design, or break down something they are about to build. Triggers on
  phrases like "plan this feature", "create an implementation plan", "how should
  we build X", "plan the new settings view", "break this down before we start",
  or /plan-implementation.
---

# Plan implementation

Produce an implementation plan for a feature by working from the outside in:
what the user sees and does first, then the data that supports it, then the glue
between them, then a review of everything that can go wrong.

The order matters. **The UI drives the data model, not the other way around.**
Planning the schema first tends to produce screens shaped like database tables.
Planning the screens first produces a data model that serves the product.

## How to run

Work autonomously. Explore the codebase, make reasonable calls, and write down
the reasoning behind each one in the plan so the user can push back on it. Only
stop and ask when:

- **Designs are provided** (Figma links, screenshots, mockups, `.pen` files).
  Always ask whether to implement them **pixel-perfect**, or treat them as
  **guidance** and carry the spirit of the design into the existing app's
  components and patterns. This changes the whole UI phase, so don't guess.
- **The request is too vague to plan.** If you can't tell what the user is
  trying to build or who it's for, ask before exploring.
- **There is a real fork with no sensible default** - for example, two equally
  valid places to store the data with different trade-offs. Ask once, with a
  recommendation.

Everything else - naming, component choice, endpoint shape - decide yourself
based on what's already in the codebase, and note it under "Decisions" in the
plan.

Don't write implementation code. The output is the plan.

## Step 0: Understand the app

Before planning anything, learn how the app already works. The plan should
extend existing patterns, not invent parallel ones. Look for:

- **Routing and navigation** - how routes are defined, layouts, nav menus,
  breadcrumbs, how page titles and metadata are set.
- **UI building blocks** - the component library or design system, shared
  components (tables, forms, dialogs, empty states, skeletons, toasts).
- **Data loading** - loaders, server components, query hooks, caching and
  revalidation.
- **Mutations** - form actions, API calls, optimistic updates, how errors get
  back to the form.
- **Persistence** - database and ORM, schema/migration files, or file-based
  storage.
- **Backend structure** - how services, domains, and endpoints are organized,
  and the API style (REST, RPC, intent-based actions).
- **Cross-cutting concerns** - validation library, auth and permissions, rate
  limiting, background jobs and queues, logging.

Find one or two existing features similar to the one being planned and use them
as the reference implementation. Name them in the plan.

## Phase 1: UI and interaction

Start with how the user interacts with the feature.

### Flows

- Who is the user, and what are they trying to get done?
- What views are there? List every one - pages, dialogs, drawers, panels, inline
  editors.
- How does the user move between them? Entry points (nav, links, buttons, deep
  links), the happy path, back/cancel, and where they land after completing an
  action.
- Are there settings or preferences that change behaviour? Where do they live
  and who can change them?
- Permissions: what does each role see, and what's hidden or disabled?

### Designs

If designs are provided, record the answer to the pixel-perfect vs guidance
question. For guidance mode, note where the plan deviates from the design to fit
the existing app, and why.

### UI inventory

Make a complete list of everything that has to be built in the UI:

- **Views** - route/path, page title, metadata (meta description, OG tags if
  public), breadcrumbs.
- **Navigation** - new nav items, links, redirects, URL state (filters, tabs,
  pagination in the query string).
- **Components** - reuse existing ones wherever possible. List new components
  separately and say why an existing one doesn't fit.
- **States, for every view and every async element:**
  - Loading - skeletons, spinners, or streaming. Match what the app does.
  - Empty - first-use empty state vs "no results" for a filter.
  - Error - what the user sees for each failure, and the **actual error message
    text**. Distinguish "you can fix this" (validation, conflicts) from
    "something went wrong" (server errors) and say whether retry is offered.
  - Partial - some data loaded, some failed.
  - Disabled/read-only - for users without permission.

### Mutations

For every action that changes data:

- **How it's submitted** - plain form submission, inline edit, autosave, bulk
  action.
- **Optimistic or not** - prefer optimistic updates whenever possible. Say
  what's shown immediately, and how it rolls back and tells the user if the
  request fails. Only fall back to waiting on the server when the result can't
  be predicted (server-generated values the UI needs, payments, irreversible
  actions).
- **Drafts** - does the entity have a draft state? Is unsaved work kept when the
  user navigates away? Is there a publish step?
- **Intent-based API** - should the action be an intent (`archiveProject`,
  `approveInvoice`) rather than a generic update of fields? Prefer intents when
  the action has its own rules, side effects, or permissions.
- **Confirmation and undo** - destructive actions need a confirm step or an
  undo.
- **Concurrency** - what happens if two people edit the same thing.

Base all of this on how the app already saves data. If the app has an
established mutation pattern, use it and say so.

## Phase 2: Data model

Derive the data model from Phase 1. Every field should trace back to something a
view shows, a flow needs, or a rule enforces.

- **Where data lives today** - database (which tables/collections), files, an
  external service, or client state.
- **Current architecture** - the relevant existing entities and how they relate.
- **What the UI needs** - walk through the UI inventory and list the data each
  view reads and each mutation writes.
- **Changes** - new entities, new fields, changed fields, relations, indexes
  (based on the queries the views will run), constraints, and enums for states
  such as draft/published/archived.
- **Migrations** - how existing data is migrated or backfilled, and whether the
  change is safe to deploy while old code is still running.
- **What not to store** - values that should be derived rather than saved.

If something in the data model pushes back on the UI (too expensive to query, a
consistency problem), note it and adjust the UI plan rather than silently
reshaping the UI to fit the data.

## Phase 3: The glue

Map out what connects the UI to the data: services, endpoints, and the work in
between.

Principles:

- **Domain-driven.** Organize around bounded contexts. Each service owns one
  domain concept and its rules. Don't reach into another domain's tables - call
  its service.
- **Ubiquitous language.** Use the same terms in the UI, the API, the code, and
  the database. If the product says "workspace", the code doesn't say "org". Add
  a short glossary to the plan when new terms are introduced.
- **Flat APIs.** Avoid deep nesting like `/projects/:id/tasks/:id/comments`.
  Prefer `/comments?taskId=...` or `/tasks/:id`. Resources are addressed by
  their own ID.
- **Intents over generic updates** where Phase 1 identified them.
- **Follow the existing structure.** If the app uses server actions, route
  handlers, tRPC, or a services folder, plan in those terms.

List:

- **Services/modules** - name, the domain it belongs to, its responsibilities,
  and the functions it exposes. Mark each one as new or an extension of an
  existing one.
- **Endpoints/actions** - method and path (or action name), input, output,
  auth/permission check, and which service function it calls. One per mutation
  and per data load from Phase 1.
- **Side effects** - emails, notifications, webhooks, audit log entries, cache
  invalidation, search indexing.
- **Client wiring** - which loader/hook/action each view uses.

## Phase 4: Review

Go through the plan looking for where things can fail and where users can do bad
things. For each finding, write the risk and how the plan handles it - and
update the earlier phases if the review changes something.

- **Where can this fail?** Network errors, timeouts, partial writes, third-party
  outages, race conditions, stale data, double submits, migrations running
  against live data. Does each failure have a matching error state in Phase 1?
- **What can the user do?** Unexpected input, very large input, rapid repeated
  actions, opening the same thing in two tabs, navigating away mid-save, going
  back after completing a flow, tampering with IDs in URLs or request bodies.
- **Validation** - which rules apply to each input, and where they run. Validate
  on the server always; on the client too for fast feedback, sharing the schema
  where the app allows it.
- **Authorization** - every endpoint checks that the user may act on the
  specific resource, not just that they're logged in.
- **Rate limiting** - which endpoints need it (anything expensive, anything that
  sends email or messages, anything that can be scraped or brute-forced) and at
  what limits.
- **Queues** - what should run in the background instead of in the request: slow
  work, calls to third parties, bulk operations, anything that must be retried.
  Say how the UI shows progress and what happens when a job fails.
- **Idempotency** - which mutations need to be safe to retry.

## Build order

Finish with an ordered checklist the user (or an agent) can work through.
Default order, adjusted to the feature:

1. Routes, views, and components with mock data, including loading, empty, and
   error states.
2. Schema changes and migrations.
3. Services and their domain rules.
4. Endpoints/actions, with validation and authorization.
5. Wire the UI to real data, including optimistic updates.
6. Side effects, background jobs, and rate limiting.
7. Review fixes and tests for the failure cases from Phase 4.

Each item should be small enough to finish and verify on its own.

## Writing the plan

Write the plan to `docs/plans/<feature-slug>.md`. If the repo already keeps
plans or specs somewhere else, use that location instead. If a plan with the
same name exists, read it and ask whether to update it or write a new one.

Use this structure:

```markdown
# <Feature name>

<Two or three short sentences: what we're building, for whom, and why.>

## Context

- Reference features: <existing features this follows>
- Designs: <links> - <pixel-perfect | guidance>

## Decisions

- **<Decision in a few words>.** <Why, in one or two sentences.>

## Phase 1: UI and interaction

### Flows

### Views

### Components

### States and error messages

### Mutations

## Phase 2: Data model

### Current

### Changes

### Migrations

## Phase 3: Services and endpoints

### Glossary

### Services

### Endpoints

### Side effects

## Phase 4: Review

| Risk | Handling |
| ---- | -------- |

### Validation

### Rate limiting

### Queues

## Open questions

## Build order

- [ ] ...
```

Leave a section out if it doesn't apply rather than filling it with
placeholders. Put anything you couldn't decide under "Open questions".

## Writing style

The plan is read by people deciding whether the approach is right, and later by
whoever builds it. It should be quick to skim and easy to read. Thorough content
is no use if it's tiring to get through.

- **Plain words, short sentences.** One idea per sentence. If a sentence has a
  semicolon, a colon followed by a list, or more than one "and", split it.
- **One idea per bullet.** A bullet is one or two sentences. If it needs more,
  it's either several bullets or a sub-list.
- **Say what happens before naming the code.** Describe the behaviour in words
  first, then point to the file or function. Don't pack several identifiers into
  one sentence.
- **Keep code names out of prose where you can.** Put file paths and function
  names in a "Where" column of a table, or at the end of a bullet, rather than
  in the middle of a sentence.
- **Avoid parentheses.** If an aside matters, give it its own sentence. If it
  doesn't, cut it.
- **Lead with the point.** Start each section and bullet with the conclusion,
  then the reason.
- **Use tables for lists of similar things.** Views, components, endpoints,
  error messages, and risks usually read better as tables than as bullets.
- **Short paragraphs.** Three sentences at most. Prefer lists over paragraphs.
- **Cut filler.** Drop phrases like "as in the prototype", "note that", and
  "this means that" unless they carry information.
- **Explain domain terms once.** Use the product's terms, and add new ones to
  the glossary rather than explaining them inline every time.

Before:

> **The chart belongs to the summary**, as `summary.chart`, not as a sibling of
> it. A chart only ever plots a summary: clearing the summary clears the chart,
> and nothing can describe a chart for a view without one. This also means the
> existing unsaved-changes comparison (`summaryEntry`) and saving (`toProposal`)
> pick the chart up without new plumbing.

After:

> **The chart is part of the summary.** A chart always plots a summary, so
> removing the summary removes the chart. Saving and unsaved-changes tracking
> already handle the summary, so they handle the chart for free. Stored as
> `summary.chart`.

Before finishing, reread the plan and rewrite any sentence you had to read
twice.

When done, tell the user where the plan was written, give a short summary of the
main decisions, and list the open questions.
