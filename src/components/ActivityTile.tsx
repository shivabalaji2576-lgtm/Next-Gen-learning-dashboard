"use client";

import { motion } from "framer-motion";
import { Activity } from "lucide-react";
import { generateActivityData } from "@/lib/utils";

const activityData = generateActivityData();

function getColor(count: number): string {
  if (count === 0) return "rgba(30,45,61,0.5)";
  if (count === 1) return "rgba(0,212,255,0.2)";
  if (count === 2) return "rgba(0,212,255,0.4)";
  if (count === 3) return "rgba(0,212,255,0.6)";
  return "rgba(0,212,255,0.9)";
}

// Split flat days into weeks (columns of 7)
function chunkIntoWeeks(days: { date: string; count: number }[]) {
  const weeks: (typeof days)[] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }
  return weeks;
}

export default function ActivityTile() {
  const weeks = chunkIntoWeeks(activityData);
  const totalSessions = activityData.filter((d) => d.count > 0).length;

  return (
    <article
      className="relative rounded-2xl overflow-hidden p-5 flex flex-col gap-4 grain"
      style={{
        background: "linear-gradient(135deg, #0f1923 0%, #111820 100%)",
        border: "1px solid rgba(30,45,61,0.8)",
      }}
    >
      {/* Ambient */}
      <div
        className="absolute bottom-0 right-0 w-40 h-40 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(16,185,129,0.05) 0%, transparent 70%)",
        }}
      />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity size={16} style={{ color: "#10b981" }} />
          <h2
            className="text-sm font-semibold text-[#e8f4fd]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Learning Activity
          </h2>
        </div>
        <span
          className="text-xs px-2 py-1 rounded-lg"
          style={{
            background: "rgba(16,185,129,0.08)",
            color: "#10b981",
            border: "1px solid rgba(16,185,129,0.15)",
            fontFamily: "var(--font-mono)",
          }}
        >
          {totalSessions} active days
        </span>
      </header>

      {/* Contribution grid */}
      <div className="relative z-10 flex gap-1 overflow-x-auto pb-1">
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-1">
            {week.map((day, di) => (
              <motion.div
                key={day.date}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: (wi * 7 + di) * 0.003,
                  duration: 0.3,
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                title={`${day.date}: ${day.count} session${day.count !== 1 ? "s" : ""}`}
                className="w-3 h-3 rounded-sm cursor-pointer transition-transform hover:scale-125"
                style={{
                  background: getColor(day.count),
                  boxShadow:
                    day.count >= 3
                      ? `0 0 4px rgba(0,212,255,0.4)`
                      : undefined,
                }}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="relative z-10 flex items-center gap-2">
        <span className="text-xs" style={{ color: "#3d5a70" }}>
          Less
        </span>
        {[0, 1, 2, 3, 4].map((level) => (
          <div
            key={level}
            className="w-3 h-3 rounded-sm"
            style={{ background: getColor(level) }}
          />
        ))}
        <span className="text-xs" style={{ color: "#3d5a70" }}>
          More
        </span>
      </div>
    </article>
  );
}
