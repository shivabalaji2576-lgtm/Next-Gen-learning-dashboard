export function CourseCardSkeleton() {
  return (
    <div
      className="relative rounded-2xl overflow-hidden p-5 flex flex-col gap-4"
      style={{
        background: "#111820",
        border: "1px solid rgba(30,45,61,0.6)",
      }}
    >
      {/* Icon + title */}
      <div className="flex items-start gap-3">
        <div className="skeleton w-10 h-10 rounded-xl shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="skeleton h-4 w-3/4 rounded" />
          <div className="skeleton h-3 w-1/2 rounded" />
        </div>
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between">
          <div className="skeleton h-3 w-12 rounded" />
          <div className="skeleton h-3 w-8 rounded" />
        </div>
        <div className="skeleton h-1.5 w-full rounded-full" />
      </div>
    </div>
  );
}

export function HeroTileSkeleton() {
  return (
    <div
      className="relative col-span-2 row-span-1 rounded-2xl overflow-hidden p-6 flex flex-col justify-between"
      style={{
        background: "#111820",
        border: "1px solid rgba(30,45,61,0.6)",
        minHeight: 200,
      }}
    >
      <div className="space-y-3">
        <div className="skeleton h-3 w-24 rounded" />
        <div className="skeleton h-10 w-72 rounded" />
        <div className="skeleton h-3 w-56 rounded" />
      </div>
      <div className="flex items-end justify-between">
        <div className="flex gap-4">
          <div className="skeleton w-24 h-12 rounded-xl" />
          <div className="skeleton w-24 h-12 rounded-xl" />
        </div>
        <div className="skeleton w-28 h-14 rounded-2xl" />
      </div>
    </div>
  );
}
