import type { ForumRepository } from "./forum-repository";
import { MockForumRepository } from "./mock-forum-repository";

let instance: ForumRepository | null = null;

/**
 * Single access point for forum data in the app. Replace the implementation
 * when wiring Payload / Prisma / external APIs — callers stay unchanged.
 */
export function getForumRepository(): ForumRepository {
  instance ??= new MockForumRepository();
  return instance;
}
