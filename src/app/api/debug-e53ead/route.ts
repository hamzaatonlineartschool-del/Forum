import { appendDebugAgentLogRawBody } from "@/lib/debug-agent-log-server";

/** Client-side debug logs → workspace NDJSON (debug mode session e53ead). */
export async function POST(req: Request) {
  await appendDebugAgentLogRawBody(await req.text());
  return Response.json({ ok: true });
}
