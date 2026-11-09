# Mini Project 1 — Task Tracker

## Purpose and deliverable

Scope a minimum submission for the Full Stack Development with AI graded assignment, **React Task & Productivity Manager**. The project will demonstrate the React concepts taught in class through a small, read-only task browser.

This document is the scoping deliverable. Building the application is a separate step. Keep all project outputs inside `Mini Project 1 - Task Tracker`.

## Requirements and selected scope

The assignment requires a public-API-driven React app, TanStack Query, at least three React Router routes including a dynamic `:id` route, loading/error/empty/success states, responsive Tailwind styling, and a GitHub repository with a README. The app must be a standalone domain distinct from the eventual capstone.

Use React with Vite and JavaScript, React Router, TanStack Query, Tailwind CSS, and ESLint. Start a fresh project and use the classroom applications as references.

| Route | Planned behavior |
|---|---|
| `/` | Fetch and display tasks with title, task number, and Open/Done status. Each title links to its details. |
| `/tasks/:id` | Read the ID with `useParams`; fetch and display the task title, ID, user ID, and completion status. Include a back link. |
| `/about` | Explain the assignment, technologies, data source, and read-only behavior. |

Use JSONPlaceholder at `https://jsonplaceholder.typicode.com`, with `/todos` for the list and `/todos/:id` for details. Display the supplied user ID; fetching user names is outside the selected minimum scope.

**Excluded:** status/user filters, completion checkboxes, task creation/editing/deletion, Stats, authentication, database, backend, deployment, and AI features inside the app.

The mockup is illustrative. Its checkboxes, user-name badges, filters, charts, sample totals, and exact styling are not all mandatory. Use live response data rather than hard-coded mockup totals.

## Implementation decisions

- Use a shared layout with Tasks and About navigation.
- Create reusable task-list, task-row, status-badge, and request-state components. Pass task data through props.
- Keep fetched data in TanStack Query. Do not duplicate it in component state or add artificial state. Use `useState` for the task-title search string, owned by `TasksPage` and passed to `TaskSearch` through props and a callback.
- Use `['todos']` for the list and `['todo', id]` for individual tasks. Keep detail IDs consistent in query keys.
- Set `staleTime` to 60,000 milliseconds for observable cached navigation, matching the classroom demonstration. This is a freshness window, not a periodic-fetch timer.
- Handle unsuccessful HTTP responses explicitly so failed requests reach the error UI.
- Provide loading, error with retry, empty, and success states on the list. Provide loading, error, missing-task, and success states on details.
- Treat invalid IDs and missing tasks as friendly not-found outcomes. Provide a fallback for unknown routes.
- Demonstrate an empty list through a controlled empty API response during verification. The normal application remains connected to the public API.
- Use a simple responsive layout, readable status labels, semantic links/buttons, visible keyboard focus, and sufficient contrast.

### Build sequence

1. **Scaffold and navigation:** create the Vite React project, configure the required tools, and establish the shared layout and three routes.
2. **API queries and states:** configure the Query provider, list/detail fetching, query keys, freshness window, and request-state handling.
3. **Reusable task components:** render real task data through props and connect list titles to their detail pages.
4. **Responsive styling and accessibility:** apply Tailwind styles and verify mobile layout, keyboard navigation, focus, and status readability.
5. **Verification and README:** complete the acceptance checks, capture screenshots, document setup and state demonstrations, and prepare the GitHub submission.

## Rubric mapping

The points below reflect the Canvas rubric reviewed November 9, 2026, superseding the classroom slide. Evidence describes the planned submission, not completed work.

| Grading area | Points | Planned evidence |
|---|---:|---|
| Components, props, data flow | 15 | Clear component responsibilities; task data passed through props; server data owned by Query |
| `useState` and state ownership | 15 | Search owned by the nearest common ancestor; results derived without duplicating server data |
| Routing, including dynamic ID | 15 | Three routes; task details use `useParams` |
| TanStack Query / server state | 15 | List/detail queries, distinct keys, observable cache reuse |
| Loading / error / empty / success | 10 | Implemented states with reproducible verification steps |
| Responsive Tailwind UI / basic accessibility | 10 | Usable mobile and desktop layouts; keyboard navigation |
| ESLint / code quality | 10 | Passing lint check and readable code |
| README / fresh-clone run | 10 | Setup instructions, screenshots, successful clean installation |
| **Total** | **100** | |

## Acceptance and submission checklist

### Application verification

- [ ] List data comes from the public API and displays the correct completion status.
- [ ] Clicking different tasks displays their corresponding details.
- [ ] Direct detail URLs and browser back/forward navigation work.
- [ ] Returning to recently visited list/detail pages demonstrates cache reuse within the freshness window; verify using the browser Network panel without disabling normal caching behavior.
- [ ] With a cold query cache and throttled requests, loading feedback is visible.
- [ ] A controlled failed request produces error feedback, and retry succeeds after the failure condition is removed.
- [ ] A controlled `[]` list response produces the empty-state UI. Document the temporary test setup and restore normal API behavior afterward.
- [ ] Missing tasks, invalid task IDs, and unknown routes show helpful feedback and navigation.
- [ ] Mobile and desktop layouts are readable without horizontal overflow.
- [ ] Navigation and retry controls work by keyboard, with visible focus.
- [ ] ESLint and the production build pass.
- [ ] A fresh clone installs and runs using the README instructions.

### Submission package

- [ ] Push source code and the dependency lockfile to a GitHub repository.
- [ ] Include a README explaining the project, technologies, routes, API source, and read-only scope.
- [ ] Document prerequisites and exact install, development, lint, build, and preview commands.
- [ ] Include screenshots of the main pages and representative request states, including a mobile view.
- [ ] Explain how to reproduce loading, error, empty, and cache-reuse demonstrations.
- [ ] Confirm the exact deadline time, repository-access requirements, and submission fields in Canvas.
- [ ] Submit the repository link through the required Canvas workflow.

Deployment is not required for this scope. No repository publication or submission has been performed as part of preparing this brief.

## Source evidence and interpretation

Primary transcript: [Live Session 102584 — React.js with Prasanth](../M4B%20React.js%20%E2%80%94%20Building%20Modern%20User%20Interfaces%20%28Part%20B%29/0%20-%20102584%20-%20Live%20Session%20on%20React.js%20-%20Building%20Modern%20User%20Interfaces%20with%20Prasanth%20-%20TRANSCRIPT.txt).

The supplied assignment screenshot establishes the definition of done and 100-point rubric. The supplied mockup illustrates possible screens; the instructor's spoken clarifications distinguish optional features from the core assignment.

| Transcript time | Instructor guidance | Scope consequence |
|---|---|---|
| 01:50:07–01:51:35 | Graded task-tracking app; public API; TanStack Query; at least three routes; Tailwind | Implement list, dynamic detail, and About routes with the required stack |
| 01:51:59–01:52:55 | Checkboxes unnecessary; Stats offered as an adventurous extension | Omit completion toggles and Stats |
| 01:52:56–01:54:08 | Suggests JSONPlaceholder `/todos`; use title and completion data; demonstrate request states | Use the suggested API and implement explicit request feedback |
| 01:54:12–01:54:32 | Search optional; mockup need not be copied; `useQuery` and caching expected | Omit search and filters; retain visible caching behavior |
| 01:55:15–01:55:45 | AI should assist understanding; graders look for taught concepts | Be able to explain routing, query keys, props, state ownership, and request states |
| 01:56:20–01:56:50 | No mini-project starter; build from scratch using examples; use `useQuery` and `useParams` | Create a fresh app and consult class examples |
| 01:57:52–01:58:36 | GitHub required; deployment unnecessary; November 9 deadline stated | Prepare a GitHub submission and verify the exact due time in Canvas |

Reference materials inspected include the Part B `week4_reference_app` structure and package manifest. They provide classroom context rather than a completed task-tracker implementation.

### Assumptions and outstanding administrative check

- The selected scope is the strict minimum, documented in one Markdown brief.
- Route content, user-ID display, component boundaries, and the verification approach are project decisions; they are not presented as verbatim instructor requirements.
- The supplied screenshots and transcript establish the available assignment requirements. The Canvas assignment was inspected November 9, 2026; it explicitly requires appropriate `useState` usage. Title search was added to satisfy that requirement and demonstrate an empty result directly.
- The instructor names **November 9** as the deadline. Confirm the year, exact time, timezone, and any additional submission requirements in Canvas rather than inferring them from the recording.
