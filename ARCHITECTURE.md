# Forum app architecture

This document describes how backend-oriented concerns are organized in the Next.js codebase. The goal is a **clear boundary** between UI, domain rules, and data access so implementations can be swapped (e.g. in-memory mock today, Payload CMS or a REST API tomorrow) without rewriting screens.

## Layers

| Layer | Path | Responsibility |
|--------|------|----------------|
| **Domain** | `src/domain/forum/` | Business vocabulary and pure helpers: explore taxonomy (`EXPLORE_CATEGORIES`), display rules (`formatCommunityDisplayName`). No I/O. |
| **Contracts** | `src/types/forum.ts` | Serializable DTOs shared across UI and data (communities, posts, comments, Lexical bodies). |
| **Data access** | `src/data/forum/` | **Repository pattern**: `ForumRepository` interface, `MockForumRepository` implementation, `getForumRepository()` registry. |
| **Seed / fixtures** | `src/lib/forum/mock-data.ts` | Demo content only. Imported by `MockForumRepository`, not by routes or components directly. |
| **Infrastructure** | `src/lib/media/unsplash-url.ts` | Small shared utilities (URL builders) with no domain knowledge. |

## Dependency rule

```
app/ + components/  →  @/data/forum (getForumRepository)
                   →  @/domain/forum (pure helpers & constants)
                   →  @/types/forum (DTOs)

@/data/forum       →  `@/lib/forum` seed bundle (only inside `MockForumRepository`)
                   →  @/types/forum
                   →  @/domain/forum

@/domain/forum     →  @/types/forum (types only)
@/lib/forum/mock-data | lexical-from-plain →  @/domain, @/types, @/lib/media
```

Routes and React components **do not** import `@/lib/forum/mock-data` directly; they call `getForumRepository()` so a future `PayloadForumRepository` can be registered in one place (`registry.ts`).

## Extending to a real backend

1. Implement `ForumRepository` against Payload, Prisma, or HTTP.
2. In `src/data/forum/registry.ts`, choose the implementation (e.g. via `process.env.FORUM_DATA_SOURCE`).
3. Keep seed data in `src/lib/forum/mock-data.ts` for tests and Storybook, or move seeds into fixtures.

## Conventions

- **Read-only repository** for now; mutations can later become explicit methods or server actions that return updated DTOs.
- **Baseline comments** are exposed as `getBaselineCommentsForPost`; the client provider merges them with persisted user comments.
- **Explore categories** live in `domain/forum/explore-categories.ts` so filters and CMS categories stay aligned.
