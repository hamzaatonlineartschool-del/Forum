import { appendFile, mkdir } from "fs/promises";
import { dirname, join } from "path";

export function getDebugAgentLogFilePath(): string {
  return join(process.cwd(), ".cursor", "debug-e53ead.log");
}

async function appendToDebugLog(chunk: string): Promise<void> {
  const p = getDebugAgentLogFilePath();
  try {
    await mkdir(dirname(p), { recursive: true });
    await appendFile(p, chunk, "utf8");
  } catch {
    /* ignore */
  }
}

/** Appends one NDJSON line (adds trailing newline if missing). */
export async function appendDebugAgentLogNdjson(line: string): Promise<void> {
  const normalized = line.endsWith("\n") ? line : `${line}\n`;
  await appendToDebugLog(normalized);
}

/** Appends raw POST body (e.g. client JSON line); ensures trailing newline. */
export async function appendDebugAgentLogRawBody(body: string): Promise<void> {
  const chunk = body.endsWith("\n") ? body : `${body}\n`;
  await appendToDebugLog(chunk);
}

/** Writes one NDJSON line for debug mode (session e53ead). */
export async function debugAgentLogServer(
  entry: Record<string, unknown>,
): Promise<void> {
  const line = JSON.stringify({
    ...entry,
    timestamp: Date.now(),
    sessionId: "e53ead",
  });
  await appendDebugAgentLogNdjson(line);
}
