"use client";

import { motion } from "framer-motion";
import { TrendingUp, BookOpen, Target, Clock } from "lucide-react";

const stats = [
  {
    label: "Completed",
    value: "12",
    unit: "courses",
    icon: BookOpen,
    color: "#00d4ff",
  },
  {
    label: "This Week",
    value: "8.4",
    unit: "hrs",
    icon: Clock,
    color: "#8b5cf6",
  },
  {
    label: "Avg Score",
    value: "87",
    unit: "%",
    icon: Target,
    color: "#10b981",
  },
  {
    label: "Progress",
    value: "+12",
    unit: "%",
    icon: TrendingUp,
    color: "#f59e0b",
  },
];

export default function StatsTile() {
  return (
    <article
      className="relative rounded-2xl overflow-hidden p-5 flex flex-col gap-4 grain"
      style={{
        background: "linear-gradient(135deg, #0d1117 0%, #111820 100%)",
        border: "1px solid rgba(30,45,61,0.8)",
      }}
    >
      <header className="flex items-center gap-2">
        <TrendingUp size={16} style={{ color: "#8b5cf6" }} />
        <h2
          className="text-sm font-semibold text-[#e8f4fd]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Quick Stats
        </h2>
      </header>

      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              whileHover={{
                scale: 1.03,
                transition: { type: "spring", stiffness: 300, damping: 20 },
              }}
              className="flex flex-col gap-1 p-3 rounded-xl cursor-default"
              style={{
                background: `rgba(30,45,61,0.3)`,
                border: `1px solid rgba(30,45,61,0.6)`,
              }}
            >
              <Icon size={14} style={{ color: stat.color }} />
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="text-xl font-bold leading-none"
                style={{
                  color: stat.color,
                  fontFamily: "var(--font-display)",
                }}
              >
                {stat.value}
                <span className="text-xs font-normal ml-0.5 opacity-60">
                  {stat.unit}
                </span>
              </motion.p>
              <p className="text-xs" style={{ color: "#6b8ba4" }}>
                {stat.label}
              </p>
            </motion.div>
          );
        })}
      </div>
    </article>
  );
}
