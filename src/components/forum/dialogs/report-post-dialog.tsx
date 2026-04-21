"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

const REPORT_REASONS = [
  "Spam",
  "Harassment or abuse",
  "Copyright / IP",
  "Misinformation",
  "Other",
] as const;

type Props = {
  postId: string;
  communitySlug: string;
  children: React.ReactNode;
};

export function ReportPostDialog({ postId, communitySlug, children }: Props) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [details, setDetails] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const reset = () => {
    setReason("");
    setDetails("");
    setSubmitted(false);
  };

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (!next) reset();
  };

  const submit = () => {
    if (!reason) return;
    if (process.env.NODE_ENV === "development") {
      console.info("[report]", { postId, communitySlug, reason, details });
    }
    setSubmitted(true);
  };

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-[101] w-[min(100vw-2rem,420px)] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/40 bg-white p-6 shadow-2xl outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
          <Dialog.Close
            className="absolute right-4 top-4 rounded-lg bg-slate-900 p-2 text-white transition hover:bg-slate-800"
            aria-label="Close"
          >
            <X className="size-4" />
          </Dialog.Close>

          {submitted ? (
            <div className="pr-10">
              <Dialog.Title className="font-heading text-xl font-semibold text-[var(--navy)]">
                Thank you
              </Dialog.Title>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Thank you for your feedback — we&apos;ll look into it.
              </p>
              <button
                type="button"
                onClick={() => handleOpenChange(false)}
                className="mt-8 w-full rounded-full bg-[var(--navy)] py-3 text-sm font-semibold text-white transition hover:brightness-110"
              >
                Done
              </button>
            </div>
          ) : (
            <div className="pr-10">
              <Dialog.Title className="font-heading text-xl font-semibold text-[var(--navy)]">
                Report post
              </Dialog.Title>
              <Dialog.Description className="mt-1 text-sm text-slate-500">
                Tell us what&apos;s wrong. Reports are reviewed by moderators.
              </Dialog.Description>

              <div className="mt-6 space-y-4">
                <div>
                  <label htmlFor="report-reason" className="text-sm font-medium text-slate-700">
                    Reason <span className="text-[var(--sky)]">*</span>
                  </label>
                  <select
                    id="report-reason"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-[var(--sky)]/60 focus:ring-2 focus:ring-[var(--sky)]/25"
                  >
                    <option value="">Select a reason</option>
                    {REPORT_REASONS.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="report-details" className="text-sm font-medium text-slate-700">
                    Details <span className="font-normal text-slate-400">(optional)</span>
                  </label>
                  <textarea
                    id="report-details"
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    rows={3}
                    className="mt-1.5 w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-[var(--sky)]/60 focus:ring-2 focus:ring-[var(--sky)]/25"
                    placeholder="Add context if helpful"
                  />
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  disabled={!reason}
                  onClick={submit}
                  className="rounded-full bg-[var(--navy)] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Submit
                </button>
                <Dialog.Close asChild>
                  <button
                    type="button"
                    className="rounded-full border border-slate-200 px-6 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                </Dialog.Close>
              </div>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
