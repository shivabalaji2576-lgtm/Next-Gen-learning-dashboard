import { Suspense } from "react";
import { fetchCourses } from "@/lib/supabase";
import { getStreakCount } from "@/lib/utils";
import Sidebar from "@/components/Sidebar";
import MobileNav from "@/components/MobileNav";
import BentoGrid from "@/components/BentoGrid";
import ErrorDisplay from "@/components/ErrorDisplay";
import Loading from "./loading";
import { Bell, Search } from "lucide-react";

// Server component that fetches data then passes to client grid
async function DashboardContent() {
  let courses;

  try {
    courses = await fetchCourses();
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown database error";
    return <ErrorDisplay message={message} />;
  }

  const streakCount = getStreakCount();

  return <BentoGrid courses={courses} streakCount={streakCount} />;
}

export default function DashboardPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-[#080c10]">
      {/* Sidebar — hidden on mobile, shown on lg+ */}
      <Sidebar />

      {/* Main content area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header
          className="flex items-center justify-between px-6 py-4 shrink-0"
          style={{
            borderBottom: "1px solid rgba(30,45,61,0.5)",
            background: "rgba(13,17,23,0.8)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div>
            <p
              className="text-xs font-medium tracking-widest uppercase"
              style={{
                color: "#3d5a70",
                fontFamily: "var(--font-mono)",
              }}
            >
              Student Dashboard
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Search */}
            <button
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-all hover:scale-105"
              style={{
                background: "rgba(30,45,61,0.4)",
                border: "1px solid rgba(30,45,61,0.8)",
                color: "#6b8ba4",
              }}
            >
              <Search size={14} />
              <span
                className="hidden sm:inline text-xs"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                Search...
              </span>
            </button>

            {/* Notifications */}
            <button
              className="relative w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:scale-105"
              style={{
                background: "rgba(30,45,61,0.4)",
                border: "1px solid rgba(30,45,61,0.8)",
                color: "#6b8ba4",
              }}
              aria-label="Notifications"
            >
              <Bell size={16} />
              {/* Red dot */}
              <span
                className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full"
                style={{ background: "#f43f5e" }}
              />
            </button>
          </div>
        </header>

        {/* Scrollable grid area */}
        <section
          className="flex-1 overflow-y-auto p-4 md:p-6 pb-24 lg:pb-6"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,212,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.015) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        >
          <Suspense fallback={<Loading />}>
            <DashboardContent />
          </Suspense>
        </section>
      </main>

      {/* Mobile bottom nav */}
      <MobileNav />
    </div>
  );
}
