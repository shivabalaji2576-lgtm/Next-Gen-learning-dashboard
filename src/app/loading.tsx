import { CourseCardSkeleton, HeroTileSkeleton } from "@/components/Skeletons";

export default function Loading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {/* Hero skeleton spans 2 cols */}
      <div className="xl:col-span-2">
        <HeroTileSkeleton />
      </div>

      {/* Stats skeleton */}
      <div
        className="rounded-2xl p-5 space-y-4"
        style={{ background: "#111820", border: "1px solid rgba(30,45,61,0.6)" }}
      >
        <div className="skeleton h-4 w-24 rounded" />
        <div className="grid grid-cols-2 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="skeleton h-20 rounded-xl" />
          ))}
        </div>
      </div>

      {/* Course card skeletons */}
      {Array.from({ length: 4 }).map((_, i) => (
        <CourseCardSkeleton key={i} />
      ))}

      {/* Activity tile skeleton */}
      <div
        className="xl:col-span-2 rounded-2xl p-5 space-y-3"
        style={{ background: "#111820", border: "1px solid rgba(30,45,61,0.6)" }}
      >
        <div className="skeleton h-4 w-32 rounded" />
        <div className="flex gap-1">
          {Array.from({ length: 15 }).map((_, wi) => (
            <div key={wi} className="flex flex-col gap-1">
              {Array.from({ length: 7 }).map((_, di) => (
                <div key={di} className="skeleton w-3 h-3 rounded-sm" />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
