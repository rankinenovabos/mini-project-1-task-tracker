# Verification

Verified on November 7, 2026 (Asia/Manila).

- ESLint, production build, and 12 integration tests pass.
- A separate clean Git clone passed `npm ci`, built successfully, started its development server, and displayed 200 live tasks in the browser.
- Browser loaded 200 tasks from the live JSONPlaceholder API.
- Verified task-link navigation, direct `/tasks/2` loading, About, and browser back/forward navigation.
- Tested desktop (1280 × 900) and mobile (390 × 844) viewports. Document scroll width equaled client width in both; no horizontal overflow.
- Keyboard Tab reached the visible skip link with a solid focus outline.
- Captured live-data screenshots for list, detail, About, and mobile views.
- Captured loading, empty, and error screenshots using a temporary, excluded fixture harness that rendered the real app with controlled fetch responses. Normal app requests are unchanged.
- Integration tests verify status labels, separate detail cache records, fresh cache reuse, loading, empty results, error/retry recovery, retained content after refresh failure, invalid IDs, missing tasks, and unknown routes.

## Dependency audit

The initial critical test-tool advisories were resolved by updating Vitest and related tooling. The final audit reports four moderate development-only findings in the ESLint/minimatch dependency chain; no production dependency findings. Avoided forcing an unsupported transitive major-version override. Recheck with `npm audit` when updating dependencies.

## Submission checks still owned by the learner

Confirm Canvas deadline and required repository visibility or grader invitations. No deployment or Canvas submission was performed.
