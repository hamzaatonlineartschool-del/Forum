import { Suspense } from "react";
import { ExploreCommunitiesContent } from "./explore-communities-content";

export default function ExplorePage() {
  return (
    <Suspense
      fallback={
        <div className="py-16 text-center text-sm text-slate-500">Loading explore…</div>
      }
    >
      <ExploreCommunitiesContent />
    </Suspense>
  );
}
