/**
 * Forum-specific code safe to import from client or server bundles.
 *
 * Server-only helpers (cookies, etc.) live in `./access-server` — import that
 * path directly from Server Components / Route Handlers, not from this barrel.
 */
export * from "./entitlements";
export * from "./course-landing-url";
export * from "./mock-data";
