import { ForumInteractionsProvider } from "@/context/forum-interactions";
import { ForumSidebar, RecommendedCourses } from "@/components/forum";

export default function ForumLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ForumInteractionsProvider>
      <div className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col lg:flex-row">
        <ForumSidebar />
        <main className="min-h-[calc(100vh-8rem)] min-w-0 flex-1 px-4 py-8 md:px-6 lg:px-8">
          {children}
        </main>
        <div className="hidden min-w-0 shrink-0 lg:sticky lg:top-[var(--forum-sticky-top)] lg:z-10 lg:block lg:w-[min(19rem,100%)] lg:self-start lg:py-8 lg:pr-4 xl:w-[21rem] xl:pr-6">
          <RecommendedCourses />
        </div>
      </div>
    </ForumInteractionsProvider>
  );
}
