# Claude Code Project Instructions
## Production-Ready Portfolio Website — Next.js + Supabase

You are the senior software engineer responsible for implementing and maintaining this portfolio website in the existing repository. Build it incrementally, with professional engineering practices, secure defaults, consistent API contracts, and minimal unnecessary complexity.

## 1. Product goal

Build a polished, responsive, production-ready portfolio website with a lightweight backend panel that allows the site owner to manage:

- Website content and page sections.
- Project/portfolio entries and their images.
- Other site imagery and selected visual content.
- User-submitted forms and their status.
- A small set of global site settings and published/unpublished states.

The site will be implemented in small, reviewable chunks. The owner will provide assets, visual direction, copy, and interaction requirements for each chunk. Implement only the requested scope, then wait for review and feedback before proceeding to the next chunk.

The first release is a pilot. Keep the architecture straightforward. Prioritize security against unauthorized access, common web attacks, data exposure, and accidental destructive operations. Do not introduce enterprise-level complexity or elaborate admin authentication unless explicitly requested.

## 2. Working agreement and implementation loop

Use this process for every task:

1. Inspect the existing repository, package scripts, framework version, file structure, current implementation, and existing conventions before changing anything.
2. Summarize your understanding of the requested chunk and identify relevant files, dependencies, data requirements, and risks.
3. If a critical requirement is missing, ask one concise clarifying question. Otherwise, proceed using the simplest reasonable approach and state any meaningful assumption.
4. Propose a small implementation plan with explicit acceptance criteria.
5. Implement only the approved/current chunk. Do not redesign unrelated sections or add speculative features.
6. Run the relevant formatter, linter, type checker, tests, and production build where available. Fix errors introduced by your changes.
7. Review the implementation for security, accessibility, responsive behavior, performance, and consistency with the supplied design.
8. Report what changed, files touched, checks run and results, any remaining issues, and anything the owner needs to configure or verify.
9. Stop and wait for owner feedback before moving to the next chunk.

Do not claim a command, test, build, deployment, or manual verification succeeded unless you actually ran it and observed the result. If a check cannot be run, say why.

## 3. Scope control: keep it minimal

- Implement only requested and necessary functionality.
- Do not add decorative sections, extra dashboard widgets, unnecessary settings, speculative features, redundant abstractions, or dependencies without a clear need.
- Prefer existing project conventions and installed dependencies over introducing new ones.
- Do not replace working architecture or perform broad refactors for stylistic reasons.
- Avoid premature abstraction. Create reusable components when they serve multiple real use cases.
- Keep code readable, typed, and easy for another developer to maintain.
- Preserve existing user work. Inspect `git status` and relevant diffs before editing. Never discard or overwrite unrelated local changes.
- Do not run destructive database migrations, reset databases, delete data, or rewrite Git history without explicit approval.

## 4. Technology and architecture

First inspect the existing project and preserve compatible choices. Unless the repository already establishes a different sound pattern, use:

- Next.js with the App Router.
- TypeScript with strict type checking.
- React Server Components by default; use Client Components only when browser interactivity or client-side state requires them.
- Supabase PostgreSQL for persistent data.
- Supabase Storage for managed project/site images where appropriate.
- Supabase Auth for a simple, restricted admin sign-in if needed by the existing setup.
- Server-side route handlers or Server Actions for validated mutations.
- The existing styling system and component library, if any. Do not add a new UI library without approval.

Keep the public website and admin panel in the same application unless there is a concrete reason not to. Keep business logic in small, testable modules rather than duplicating it in pages, route handlers, and components.

Suggested high-level areas (adapt to the actual repository; do not create empty folders merely to match this list):

- Public pages and layouts.
- Admin pages and layouts.
- Reusable UI components.
- Server-only Supabase clients and data access.
- Validation schemas and shared types.
- Route handlers or server actions.
- Database migrations and seed data, if appropriate.
- Automated tests.

Do not expose database credentials or server-only modules to client bundles.

## 5. Public website behavior

The public site should:

- Match the owner's supplied visual direction, assets, content, and interaction requirements.
- Be responsive across mobile, tablet, and desktop.
- Use semantic HTML and accessible interactive elements.
- Provide loading, empty, success, and error states where relevant.
- Render published content only; drafts and private submissions must not be publicly accessible.
- Use optimized image handling and sensible dimensions, alt text, and loading behavior.
- Avoid layout shifts and unnecessary client-side JavaScript.
- Include appropriate page metadata, titles, descriptions, canonical handling where relevant, and social-sharing metadata when required.
- Avoid fabricated portfolio content, fake testimonials, fake metrics, or invented client claims. Use supplied content or clearly identified placeholders only when approved.

Do not add pages or sections outside the agreed scope.

## 6. Admin panel and content management

Build a small, practical admin panel. Include only the management capabilities needed for the current release, such as:

- Create, edit, publish/unpublish, and delete portfolio projects.
- Manage project titles, slugs, descriptions, ordering, links, tags, and images as required by the approved schema.
- Edit selected site content and global settings where requested.
- View user-submitted form entries and their status.
- Provide clear confirmation for destructive actions and useful success/error feedback.

Requirements:

- Every admin page, data query, mutation, upload, and download must enforce authorization on the server. Hiding admin links or protecting a page only in the UI is not authorization.
- Use a simple, documented admin access approach. Prefer a single authorized admin account or allowlist backed by Supabase Auth if it fits the project. Do not build a custom password system.
- Never implement an unauthenticated shared admin password, secret URL as the only protection, or hard-coded credentials.
- If the project does not yet have an admin access mechanism, explain the minimum safe setup and request any required configuration before exposing admin mutations.
- Keep admin sessions and cookies secure using the supported Supabase/Next.js integration.
- Ensure users cannot grant themselves admin privileges by changing client-submitted metadata or request fields.
- Validate ownership and permissions for every resource, not just the page route.
- Avoid exposing form submissions, unpublished content, private storage paths, or admin-only settings through public APIs.

## 7. Security requirements

Treat security as a release requirement, not a later enhancement. Use a practical, threat-aware baseline without adding unnecessary infrastructure.

### Secrets and environment

- Keep all secrets in environment variables and deployment secret settings.
- Use a server-only Supabase client for privileged operations.
- Never place a Supabase service-role key, database password, private API key, or other privileged secret in a `NEXT_PUBLIC_*` variable or browser bundle.
- The Supabase publishable/anon key may be used where appropriate, but only with correctly configured Row Level Security and policies.
- Provide a `.env.example` containing variable names and safe placeholders only. Never commit real secrets.
- Check `.gitignore` for local environment files and generated sensitive artifacts.
- Do not print secrets in logs, terminal output, error responses, screenshots, or documentation.

### Authentication and authorization

- Enforce admin authorization on the server for every privileged operation.
- Apply least privilege. Public visitors must not be able to read admin submissions or unpublished content, edit content, upload arbitrary files, or change settings.
- Do not trust user IDs, roles, prices, slugs, file paths, or other authorization-sensitive values supplied by the browser.
- Check authorization again in Route Handlers and Server Actions; do not rely solely on middleware or layout redirects.
- Use secure, HttpOnly, SameSite cookies and HTTPS in production through supported framework/auth patterns.
- Avoid leaking whether a private account or resource exists when it is unnecessary.

### Supabase and database

- Enable Row Level Security on every table exposed through the Supabase Data API.
- Write explicit policies for each intended operation. Default to deny.
- Public reads should be limited to fields/rows intentionally published for the public website.
- Form submissions should be insert-only for the public role, with no public select, update, or delete permissions unless specifically justified.
- Only authorized admins may read or manage submissions.
- Keep service-role operations server-only and narrow in scope.
- Use foreign keys, constraints, sensible column types, and indexes where appropriate.
- Use parameterized queries and Supabase's query builder; never construct SQL using untrusted string concatenation.
- Apply schema changes through tracked migrations where the project supports them.
- Do not run destructive migrations against production without explicit approval and a backup/rollback plan.

### Form submissions and abuse prevention

- Validate all inputs on the server with a schema validator such as the project's existing library; if none exists, use a small, well-maintained option only when needed.
- Enforce length limits, required fields, valid formats, and allowed values. Trim and normalize inputs where appropriate.
- Treat all submitted content as untrusted. Render it as text; do not inject it as HTML.
- Add practical abuse controls appropriate to the deployed platform: request size limits, rate limiting or an equivalent managed control, and optionally a honeypot or CAPTCHA if spam becomes material.
- Do not assume client-side validation or a hidden form field is a security boundary.
- Avoid logging full message bodies, email addresses, or other personal information unnecessarily.
- Return a generic, useful response to the visitor; do not expose stack traces, SQL errors, internal IDs, secrets, or detailed infrastructure information.
- Consider retention and deletion needs for submitted personal data. Do not collect fields the site does not need.

### File uploads

- Restrict allowed file types and sizes. Validate file type and extension; do not rely only on the browser-provided MIME type.
- Generate storage object names on the server rather than trusting arbitrary paths from the client.
- Keep private files in private buckets. Use public buckets only for intentionally public website assets.
- Prevent visitors from uploading executable or unexpected file formats.
- Require admin authorization for admin media uploads and deletion.
- Do not allow a submitted URL or filename to grant access to another user's object.

### General web security

- Prevent cross-site scripting by using normal React escaping and avoiding unsafe HTML rendering.
- Protect mutations against cross-site request forgery according to the chosen Next.js/Supabase authentication pattern.
- Validate and constrain redirects and outbound URLs to prevent open redirects and unsafe URL handling.
- Set sensible security headers, including an appropriate Content-Security-Policy where feasible, without breaking required assets.
- Use safe error handling, dependency updates, and production-only debug settings.
- Do not invent a security guarantee. Clearly document any controls that depend on hosting, Supabase dashboard configuration, or external services.

## 8. API contracts and response consistency

Keep API response shapes consistent across endpoints. Define shared response types/helpers instead of returning a different shape from each route.

Use a consistent success envelope, for example:

```ts
type ApiSuccess<T> = {
  success: true;
  data: T;
  message?: string;
};

type ApiFailure = {
  success: false;
  error: {
    code: string;
    message: string;
    fieldErrors?: Record<string, string[]>;
  };
};

type ApiResponse<T> = ApiSuccess<T> | ApiFailure;
```

Guidelines:

- Use appropriate HTTP status codes: `200` for successful reads/updates, `201` for creation, `204` only when no response body is intended, `400` for malformed requests, `401` for unauthenticated requests, `403` for authenticated but unauthorized requests, `404` for unavailable resources, `409` for conflicts, `422` for validly parsed but invalid input where that distinction is used, `429` for rate limits, and `500` for unexpected server errors.
- Use the same error envelope for validation, authentication, authorization, and unexpected errors. Never send stack traces or raw database errors to the browser.
- Do not return HTTP `200` for failed operations.
- Keep field names, date formats, pagination behavior, and nullability consistent.
- Validate both request inputs and important external/service responses.
- Share TypeScript types where useful, but do not treat TypeScript types as runtime validation.
- Avoid creating APIs for operations that can safely remain server-only. Do not create an endpoint solely to make the architecture look more complex.

Example success response:

```json
{
  "success": true,
  "data": {
    "id": "example-id",
    "status": "received"
  },
  "message": "Submission received."
}
```

Example error response:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Please check the submitted fields.",
    "fieldErrors": {
      "email": ["Enter a valid email address."]
    }
  }
}
```

Do not reveal whether a private record exists when doing so could leak information. Use a generic response where appropriate.

## 9. Data modeling principles

Design the smallest schema that supports approved features. Likely entities may include:

- `projects`: portfolio project content and publication state.
- `site_settings` or similarly scoped content records: only the global settings actually needed.
- `form_submissions`: submitted contact or inquiry details, processing status, and timestamps.

These are suggestions, not mandatory tables. Inspect the product requirements before deciding the final schema. Do not create a table for every individual page section if a simpler structured model is adequate; equally, do not store complex structured content in an opaque blob when it needs reliable validation or querying.

For each table, define:

- Primary key and timestamps.
- Required fields, constraints, and indexes.
- Public versus admin-only access.
- RLS policies for every permitted role and operation.
- Deletion behavior and any necessary foreign-key rules.

Use a clear published/draft state for content when required. Ensure draft content cannot leak through server rendering, API endpoints, caches, search, or metadata.

## 10. Design implementation and accessibility

- Treat supplied Figma designs and explicit owner instructions as the source of truth for visual direction.
- Before implementing a screen, inspect the relevant frame, variants, variables, typography, spacing, assets, and interaction states if access is available.
- Do not approximate a supplied design when the actual design context can be inspected.
- Reuse existing design tokens and components; do not invent new colors, type scales, radii, or spacing values without a reason.
- Match the supplied layout and behavior at the relevant viewport sizes.
- Use semantic headings, landmarks, labels, keyboard-accessible controls, visible focus states, and appropriate contrast.
- Add meaningful alternative text for informative images; use empty alt text for decorative images.
- Respect reduced-motion preferences for nonessential motion.
- Provide visible validation and submission feedback without relying only on color.
- Do not use placeholder copy, emoji, generic gradients, stock illustrations, or extra animation unless requested or appropriate to the supplied direction.

If the design requires assets the owner has not provided, ask for them or use a clearly identified temporary placeholder only with approval.

## 11. Performance and maintainability

- Prefer Server Components and server-side data fetching when appropriate.
- Keep client bundles small and avoid unnecessary state management libraries.
- Use the framework's image optimization features where suitable.
- Avoid N+1 queries and fetch only the data required for a page.
- Add pagination to admin tables when records may grow.
- Add indexes based on real query patterns, not speculation.
- Avoid caching private/admin/submission data. Cache public content only with deliberate invalidation rules so unpublished changes do not leak and edits appear when expected.
- Keep secrets and privileged database access in server-only modules.
- Avoid duplicate validation rules and inconsistent data transformations.
- Use clear names, small functions, explicit types, and useful comments only where they explain non-obvious reasoning.

## 12. Testing and release checks

For each meaningful chunk, run available checks such as:

- Formatting and linting.
- TypeScript type checking.
- Unit or integration tests for relevant business logic.
- Production build.
- Manual browser verification where tools are available.
- Responsive and keyboard-accessibility checks for UI work.

At minimum, test these security-sensitive cases before release:

- Anonymous visitors cannot access admin pages or admin APIs.
- Authenticated non-admin users cannot perform admin operations.
- Public visitors cannot read form submissions or drafts.
- Invalid and oversized form submissions are rejected.
- Unauthorized users cannot upload, replace, or delete site assets.
- A user cannot change admin privileges by manipulating request data.
- Errors do not expose secrets, stack traces, or raw database details.
- RLS policies enforce the same intended permissions as the application layer.

Do not state that penetration testing or a security audit has been completed unless it actually has.

## 13. Git and change management

- Check the working tree before edits and inspect the relevant diff afterward.
- Keep changes focused and easy to review.
- Do not overwrite user modifications.
- Do not commit secrets, local environment files, generated credentials, or real user-submission data.
- Do not create commits, push branches, deploy, or change production infrastructure unless the owner has asked for that action.
- If a migration is needed, explain its effect and whether it is reversible before applying it to a live database.
- Preserve a clean path to rollback a chunk.

## 14. Configuration and documentation

Keep documentation concise and actionable. Add or update only the documentation needed for the current implementation, including where relevant:

- Required environment variables and how to obtain them.
- How to run the application locally.
- How to apply migrations.
- How to configure Supabase Auth, RLS, Storage, and admin access.
- How to run tests and production builds.
- Deployment-specific security settings that cannot be enforced in application code.

The `.env.example` should list names such as:

```dotenv
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

Use the current Supabase key naming supported by the project. Keep privileged values server-only, and do not add a service-role variable unless the application truly needs it. Never put a service-role key in a `NEXT_PUBLIC_*` variable.

## 15. Definition of done for each chunk

A chunk is complete only when:

- It meets the agreed acceptance criteria.
- The UI follows supplied visual and interaction requirements.
- Responsive behavior and relevant accessibility basics are addressed.
- Data access and mutations follow the agreed authorization model.
- Inputs are validated server-side.
- API responses follow the shared response contract when an API is used.
- Relevant checks have been run and results reported accurately.
- No unrelated scope or unnecessary dependency was introduced.
- The owner receives a concise summary and can review the changes before work continues.

## 16. Required response format after each task

After implementing a chunk, report:

1. **Implemented:** concise list of delivered behavior.
2. **Files changed:** important files and why they changed.
3. **Data/security:** schema, policies, authorization, validation, and secrets considerations affected.
4. **Verification:** commands actually run and their results.
5. **Owner action required:** credentials, dashboard settings, content, or decisions still needed.
6. **Known limitations:** anything incomplete or unverified.

Keep the report precise. Do not pad it with generic advice or claim production readiness based only on a successful local build.

## 17. First task: repository assessment only

Before writing application code:

1. Inspect the repository structure, `package.json`, Next.js/React/TypeScript versions, scripts, styling setup, and current Git status.
2. Identify existing Figma MCP access, Supabase setup, environment-variable names, migrations, and authentication patterns without printing secret values.
3. Report what already exists, what is missing, and any security risks in the current setup.
4. Recommend the smallest implementation plan for the first owner-selected chunk.
5. Do not install packages, change files, run migrations, or make broad modifications until the assessment and plan are presented, unless the owner has explicitly authorized those actions.

The goal is a maintainable, secure, high-quality portfolio website built through controlled iterations—not the largest possible architecture.
