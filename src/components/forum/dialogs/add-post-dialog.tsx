"use client";

import { useMemo, useState, type ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import type { SerializedEditorState } from "lexical";
import { RichTextEditor } from "@/components/editor/rich-text-editor";
import { getForumRepository } from "@/data/forum";
import { formatCommunityDisplayName } from "@/domain/forum";
import { X } from "lucide-react";

const inputClassName =
  "mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none ring-0 focus:border-[var(--sky)]/60 focus:ring-2 focus:ring-[var(--sky)]/25";

type Props = {
  /** Styles for the Radix trigger button (avoid `asChild` + RSC children → hydration mismatch). */
  triggerClassName: string;
  triggerLabel: ReactNode;
  /** When opening from a community page, pre-select that community in the form. */
  defaultCommunitySlug?: string;
};

export function AddPostDialog({
  triggerClassName,
  triggerLabel,
  defaultCommunitySlug,
}: Props) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [communitySlug, setCommunitySlug] = useState("");
  const [serialized, setSerialized] = useState<SerializedEditorState | null>(null);

  const communities = useMemo(
    () =>
      [...getForumRepository().listCommunities()].sort((a, b) =>
        formatCommunityDisplayName(a).localeCompare(formatCommunityDisplayName(b)),
      ),
    [],
  );

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (next && communities.length > 0) {
      const initial =
        defaultCommunitySlug &&
        communities.some((c) => c.slug === defaultCommunitySlug)
          ? defaultCommunitySlug
          : communities[0].slug;
      setCommunitySlug(initial);
    }
  };

  const submitPost = () => {
    if (!title.trim() || !communitySlug || !serialized) return;
    // Handoff: POST to Payload with title + community + serialized Lexical JSON
    console.log("Payload draft:", {
      title: title.trim(),
      communitySlug,
      richText: serialized,
    });
    setOpen(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Trigger type="button" className={triggerClassName}>
        {triggerLabel}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-[101] max-h-[90vh] w-[min(100vw-2rem,640px)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl border border-white/40 bg-white p-6 shadow-2xl outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
          <Dialog.Close
            className="absolute right-4 top-4 z-10 rounded-lg bg-slate-900 p-2 text-white transition hover:bg-slate-800"
            aria-label="Close"
          >
            <X className="size-4" />
          </Dialog.Close>

          <div className="relative pr-10">
            <Dialog.Title className="font-heading text-2xl font-semibold text-[var(--navy)]">
              Create Post
            </Dialog.Title>
            <Dialog.Description className="mt-1 text-sm leading-relaxed text-slate-500">
              Share your thoughts with your class community.
            </Dialog.Description>

            <div className="mt-6 space-y-5">
              <div>
                <label htmlFor="post-title" className="text-sm font-medium text-slate-700">
                  Title <span className="text-[var(--sky)]">*</span>
                </label>
                <input
                  id="post-title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className={inputClassName}
                  placeholder="Give your post a title"
                />
              </div>
              <div>
                <label htmlFor="post-community" className="text-sm font-medium text-slate-700">
                  Community <span className="text-[var(--sky)]">*</span>
                </label>
                <select
                  id="post-community"
                  value={communitySlug}
                  onChange={(e) => setCommunitySlug(e.target.value)}
                  className={`${inputClassName} forum-community-select-chevron cursor-pointer appearance-none pr-10`}
                >
                  {communities.map((c) => (
                    <option key={c.id} value={c.slug}>
                      {formatCommunityDisplayName(c)}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <span className="text-sm font-medium text-slate-700">
                  Content <span className="text-[var(--sky)]">*</span>
                </span>
                <div className="mt-1.5">
                  <RichTextEditor onChange={setSerialized} />
                </div>
              </div>
              <div>
                <span className="text-sm font-medium text-slate-700">Image (optional)</span>
                <div className="mt-2 flex flex-col gap-2 rounded-xl border border-dashed border-slate-200 bg-slate-50/80 p-4">
                  <div className="h-24 rounded-lg bg-slate-200/80" />
                  <label className="inline-flex w-fit cursor-pointer items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700">
                    <input type="file" accept="image/*" className="hidden" />
                    Choose file
                  </label>
                  <p className="text-xs text-slate-500">Maximum file size: 10 MB</p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                type="button"
                className="rounded-full bg-[var(--accent)] px-8 py-3 text-sm font-semibold text-[var(--navy)] shadow-sm transition hover:brightness-95"
                onClick={submitPost}
              >
                Add Post
              </button>
              <Dialog.Close
                type="button"
                className="text-sm font-medium text-slate-500 hover:text-slate-800"
              >
                Cancel
              </Dialog.Close>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
